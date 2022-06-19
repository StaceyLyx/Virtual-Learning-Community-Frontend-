import { Component, OnInit} from '@angular/core';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import {Object3D, Raycaster, Scene, Vector2, Vector3, WebGLRenderer} from "three";
import { Router } from "@angular/router";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CommunityWSService} from "../../services/CommunityWS.service";
import axios from "axios";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-community-scene',
  templateUrl: './community-scene.component.html',
  styleUrls: ['./community-scene.component.css']
})
export class CommunitySceneComponent implements OnInit {

  private scene = new Scene();
  private camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new WebGLRenderer();

  private Light = new THREE.PointLight(0xFFFAFA, 0.8);
  private ambient = new THREE.AmbientLight(0xFFEBCD, 0.5);
  private planeGeometry = new THREE.BoxGeometry(1000, 1000);
  private planeMaterial = new THREE.MeshLambertMaterial({ color: 0xfffbf0, side: THREE.DoubleSide });
  private plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  show: Boolean = true;

  isVisibleClass = false;
  isVisibleUser = false;

  classes: any = [];
  user: any;
  clickUser: any;

  onlineDraw = false;

  isVisibleStatus = true;

  status: string = "";

  constructor(private router: Router,
              private notification: NzNotificationService,
              private socketService: CommunityWSService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.notification.blank(
      "欢迎来到虚拟学习社区",
      "在这里你可以与伙伴们一同选择喜欢的课堂进行学习，点击你面前的教学楼，查看当前的课堂吧！",
      { nzDuration: 0 }
    );

    this.init();
    this.initSky();
    this.initModel();
    this.initControls();
    this.animate();

    // 发送登录信息
    this.socketService.socketSend( parseInt(<string>sessionStorage.getItem("userId")) * 7
      , 80 + parseInt(<string>sessionStorage.getItem("userId"))).subscribe(
      raw => {
        let data = JSON.parse(raw);
        console.log(data);

        // 登录初次绘制
        if(!this.onlineDraw){
          let onlines = data['onLineIds'];
          for(let i = 0; i < onlines.length; ++i){
            this.drawStudentById(onlines[i]);
          }
          this.onlineDraw = true;
        }else{
          if(data["sid"] !== sessionStorage.getItem("userId") && data["message"] === "online"){     // id不等于当前登录用户id则绘制形象

            // 根据性别加载用户形象
            this.drawStudentById(data['sid']);
          }else if(data["sid"] !== sessionStorage.getItem("userId") && data["status"] === "offline"){
            // 用户下线，移除形象
            let children = this.scene.children;
            for(let i = 0; i < children.length; ++i){
              if(children[i].name === ("student" + data["sid"])){
                this.scene.remove(children[i]);
                break;
              }
            }
          }
        }
      }
    );

    window.addEventListener("mousedown", (event) => {
      event.preventDefault();  // 阻止默认
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.offsetY / window.innerHeight) * 2 + 1;

      const pointer = new Vector2(x, y);
      const rayCaster = new Raycaster();
      rayCaster.setFromCamera(pointer,  this.camera);
      let intersects = rayCaster.intersectObjects( this.scene.children, true);

      // 点击跳转到课堂
      const intersectClass = intersects.filter(intersect => CommunitySceneComponent.getClassroom(intersect.object))[0];
      if (intersectClass != undefined) {
        this.isVisibleClass = true;
      }

      // 点击查看用户信息
      const intersectStudent = intersects.filter(intersect => this.getStudent(intersect.object))[0];
      if (intersectStudent != undefined) {
        axios.get("retrieveUserInfo", {
          params: {
            userId: parseInt(this.clickUser),
          }
        }).then(response => {
          console.log("response: ", response);
          if(response.status === 200){
            this.user = response.data;
            this.isVisibleUser = true;
          }
        }).catch(error => {
          console.log("error: ", error);
        })
      }
    })

    // 获取课堂列表
    axios.get('retrieveClasses', {}).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.classes = response.data.result;
      }
    }).catch(error => {
      console.log("error: ", error);
    })
  }

  routeToClassroom(id: number, name: string){

    //关于携带参数的问题
    this.router.navigate(["class"], {
      queryParams: {
        classId: id,
        className: name,
      }
    }).then(r => {
      if (r) {
        console.log("navigate to class")
        // 跳转成功后通过移除挂载dom节点删除
        const div = document.getElementsByTagName('canvas')[0];
        document.body.removeChild(div);
      } else {
        console.log("navigate failed")
      }
    })
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  initSky(){
    const skyBox = new THREE.BoxGeometry(1000, 1000, 1000);
    const textureLoader = new THREE.TextureLoader();
    const skyBoxMaterial = [
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/px.jpg'), side: THREE.BackSide}),  // right
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/nx.jpg'), side: THREE.BackSide}), // left
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/py.jpg'), side: THREE.BackSide}), // top
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/ny.jpg'), side: THREE.BackSide}), // bottom
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/pz.jpg'), side: THREE.BackSide}), // back
      new THREE.MeshBasicMaterial({map:
          textureLoader.load('assets/img/nz.jpg'), side: THREE.BackSide}) // front
    ]

    const sky = new THREE.Mesh(skyBox, skyBoxMaterial);
    this.scene.add(sky);
  }

  initControls() {
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 300;
    this.controls.maxPolarAngle = Math.PI / 2.2;
    this.controls.addEventListener('change', () => {
      this.renderer.render( this.scene,  this.camera);
    })
  }

  init() {
    this.camera.position.set(0, 70, 300);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.Light.position.set(50, 150, 0);
    this.Light.castShadow = true;
    this.scene.add(this.Light);
    this.scene.add(this.ambient);

    this.plane.position.set(0, 0, 0);
    this.plane.receiveShadow = true;
    this.plane.rotateX(-0.5 * Math.PI);
    this.scene.add( this.plane );
  }

  initModel() {
    this.loadModel("classroom", 'assets/model/classroom/scene.gltf', [20, 20, 20], [50, 0, -150], 0);
  }

  loadModel(name: string, path: string, scale: Array<number>, position: Array<number>,
    rotate: number) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      gltf.scene.traverse((child) => {
        gltf.scene.name = name;

        gltf.scene.scale.set(scale[0], scale[1], scale[2]);
        gltf.scene.position.set(position[0], position[1], position[2]);
        gltf.scene.rotateY(rotate);
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
        this.scene.add(gltf.scene);
        this.render();
      })
    })
  }

  private static getClassroom(object: Object3D): any {
    do {
      if (object.name === "classroom") {
        return true;
      }
      if (object.parent) {
        object = object.parent;
      } else {
        break;
      }
    } while (true);
    return false;
  }

  private getStudent(object: Object3D): any {
    do {
      if (object.name.includes("student")){
        this.clickUser = object.name.substring(7, object.name.length);
        return true;
      }
      if (object.parent) {
        object = object.parent;
      } else {
        break;
      }
    } while (true);
    return false;
  }

  drawStudentById(userId: number){
    axios.get("retrieveUserInfo", {
      params: {
        userId: userId,
      }
    }).then(response => {
      console.log("response: ", response);
      if(response.status === 200){
        if(response.data.gender === "man"){
          this.loadModel("student" + userId,
            'assets/model/student/scene.gltf', [20, 20, 20], [userId * 7, 0, 80 + userId], 0);
        }else{
          this.loadModel("student" + userId,
            'assets/model/student2/scene.gltf', [20, 20, 20], [userId * 7, 0, 80 + userId], 0);
        }
      }
    }).catch(error => {
      console.log("error: ", error);
    })
  }

  render() {
    this.renderer.render( this.scene,  this.camera);
  }

  handleOk(): void {
    this.isVisibleClass = false;
  }

  handleCancel(): void {
    this.isVisibleClass = false;
  }

  Ok(): void {
    this.isVisibleUser = false;
  }

  Cancel(): void {
    this.isVisibleUser = false;
  }

  routerTo(path: string){
    // 通过移除挂载dom节点删除
    const div = document.getElementsByTagName('canvas')[0];
    document.body.removeChild(div);

    if(path === "logout"){
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      path = '';
      this.message.info("登出成功");
    }
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("local index")
      }
    })
  }
}

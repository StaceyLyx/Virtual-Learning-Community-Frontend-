import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {animate} from "@angular/animations";
import * as THREE from 'three';
import {Object3D, Raycaster, Scene, Vector2, WebGLRenderer} from "three";
import {ActivatedRoute, Router} from "@angular/router";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {ClassWSService} from "../../services/class-ws.service";
import axios from "axios";

@Component({
  selector: 'app-scene',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  @ViewChild('canvasFrame') canvasContainer: ElementRef | undefined;

  private SCENE = new Scene();
  private CAMERA = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
  private RENDERER = new WebGLRenderer();
  private Light = new THREE.PointLight(0xFFFAFA, 0.8);
  private ambient = new THREE.AmbientLight(0xFFEBCD, 0.5);
  private planeGeometry = new THREE.BoxGeometry(400, 400);
  private planeMaterial = new THREE.MeshLambertMaterial( {color: 0xCDAA7D} );
  private plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
  private CONTROLS = new OrbitControls(this.CAMERA, this.RENDERER.domElement);

  user: any;
  isVisibleUser = false;

  onlineDraw = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NzNotificationService,
              private message: NzMessageService,
              private classService: ClassWSService) { }

  ngOnInit(): void {
    let classId = 0;
    let className = '';

    // 获取课堂信息
    this.activatedRoute.queryParams.subscribe(queryParams => {
      classId = queryParams['classId'];
      className = queryParams['className'];
    })

    this.notification.blank(
        '欢迎来到 ' + className + ' 课堂',
        '点击白板来查看该课堂的任务吧！点击教室门也可以回到社区哦',
      { nzDuration: 0 }
      );

    // 发送进入房间信息
    this.classService.socketSend(classId
      , 100 + parseInt(<string>sessionStorage.getItem("userId")) * 2
      , 80 + parseInt(<string>sessionStorage.getItem("userId"))).subscribe(
      raw => {

        let data = JSON.parse(raw);
        console.log(data);
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
            let children = this.SCENE.children;
            for(let i = 0; i < children.length; ++i){
              if(children[i].name === ("student" + data["sid"])){
                this.SCENE.remove(children[i]);
                break;
              }
            }
          }
        }
      }
    );

    this.canvasContainer?.nativeElement.append(this.RENDERER.domElement);
    this.init();
    this.initModel();
    this.animate();

    window.addEventListener("mousedown", (event) =>{
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.offsetY / window.innerHeight) * 2 + 1;
      const pointer = new Vector2(x, y);
      const rayCaster = new Raycaster();
      rayCaster.setFromCamera(pointer, this.CAMERA);
      let intersects = rayCaster.intersectObjects(this.SCENE.children, true);

      // 点击前往课堂任务
      const intersect = intersects.filter(intersect => ClassComponent.task(intersect.object))[0];
      if(intersect != undefined){
        // 需要先移除three.js渲染的canvas标签
        const div = document.getElementsByTagName('canvas')[0]
        document.body.removeChild(div);

        this.router.navigate(["class/tasks"], {
          queryParams: {
            classId: classId,
            className: className,
          }
        }).then(r => {
          if (r) {
            console.log("navigate to tasks of class");
          } else {
            this.message.warning('跳转失败');
            console.log("navigate failed");
          }
        })
      }

      // 点击回到社区
      const intersectDoor = intersects.filter(intersect => ClassComponent.door(intersect.object))[0];
      if(intersectDoor != undefined){
        // 需要先移除three.js渲染的canvas标签
        const div = document.getElementsByTagName('canvas')[0]
        document.body.removeChild(div);

        this.router.navigate(["communityScene"], {
        }).then(r => {
          if (r) {
            console.log("navigate to community");
          } else {
            this.message.warning('跳转失败');
            console.log("navigate failed");
          }
        })
      }

      // 点击查看用户信息
      const intersectStudent = intersects.filter(intersect => ClassComponent.student(intersect.object))[0];
      if (intersectStudent != undefined) {
        axios.get("retrieveUserInfo", {
          params: {
            userId: parseInt(<string>sessionStorage.getItem("userId")),
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

    });
  }

  // 场景初始化
  init(){
    this.CAMERA.position.set(-100, 80, -100);
    this.CAMERA.lookAt(this.SCENE.position);
    this.SCENE.add(this.CAMERA);

    this.RENDERER.setSize(window.innerWidth, window.innerHeight);
    this.RENDERER.shadowMap.enabled = true;
    document.body.appendChild(this.RENDERER.domElement);

    this.Light.position.set(0, 100, 0);
    this.Light.castShadow = true;
    this.SCENE.add(this.Light);

    this.SCENE.add(this.ambient);

    this.plane.name = "ground";
    this.plane.position.set(0, 0, 0);
    this.plane.castShadow = true;
    this.plane.receiveShadow = true;
    this.plane.rotateX(-0.5 * Math.PI);
    this.SCENE.add( this.plane );

    for(let i = 0; i < 4; ++i){
      let wallGeometry = new THREE.BoxGeometry(400, 400, 400);
      let wallMaterial = new THREE.MeshLambertMaterial({color: 0xFFFAF0} );
      let wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.name = "wall";
      if(i < 2){
        wall.position.set(400 * Math.pow(-1, i), 0, 0);
      }else{
        wall.position.set(0, 0, 400 * Math.pow(-1, i));
      }
      this.plane.castShadow = true;
      this.plane.receiveShadow = true;
      this.SCENE.add(wall);
    }

    this.CONTROLS.enableDamping = true;
    this.CONTROLS.dampingFactor = 0.05;
    this.CONTROLS.minDistance = 100;
    this.CONTROLS.maxDistance = 200;
    this.CONTROLS.maxPolarAngle = Math.PI / 2.2;

    this.CONTROLS.addEventListener('change', () =>{
      this.RENDERER.render(this.SCENE, this.CAMERA);
    })
  }

  // 动画变换
  animate(){
    requestAnimationFrame(animate);
    this.CONTROLS.update();
    this.render();
  }

  initModel(){
    // 教室白板
    this.loadModel("whiteboard", 'assets/model/whiteboard/scene.gltf', [5, 5, 5], [50, 0, 130], 180);
    // 教室门
    this.loadModel("door", 'assets/model/door/scene.gltf', [50, 50, 50], [-200, 0, 150], 0.5 * Math.PI);
    // 窗子
    this.loadModel("window", 'assets/model/window/scene.gltf', [1, 1, 1], [130, 50, -30], 0.5 * Math.PI);
    this.loadModel("window", 'assets/model/window/scene.gltf', [1, 1, 1], [130, 50, 130], 0.5 * Math.PI);
  }

  // 加载模型
  loadModel(name: string, path: string, scale: Array<number>, position: Array<number>,
            rotate: number){
    const loader = new GLTFLoader();
    // 教室椅子
    loader.load(path, (gltf) => {
      gltf.scene.traverse((child) =>{
        gltf.scene.name = name;
        gltf.scene.scale.set(scale[0], scale[1], scale[2]);
        gltf.scene.position.set(position[0], position[1], position[2]);
        gltf.scene.rotateY(rotate);
        if(child instanceof THREE.Mesh){
          child.castShadow = true;
        }
        this.SCENE.add(gltf.scene);
        this.render();
      })
    })
  }

  private static task(object: Object3D): any{
    do{
      if(object.name == "whiteboard"){
        return true;
      }
      if(object.parent){
        object = object.parent;
      }else{
        break;
      }
    }while(true);
    return false;
  }

  private static student(object: Object3D): any {
    do {
      if (object.name.includes("student")){
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

  private static door(object: Object3D): any {
    do {
      if (object.name === "door"){
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
            'assets/model/student/scene.gltf', [30, 30, 30], [userId * 7, 0, userId * 5], Math.PI);
        }else{
          this.loadModel("student" + userId,
            'assets/model/student2/scene.gltf', [30, 30, 30], [userId * 7, 0, userId * 5], Math.PI);
        }
      }
    }).catch(error => {
      console.log("error: ", error);
    })
  }

  // 渲染
  render(){
    this.RENDERER.render(this.SCENE, this.CAMERA);
  }

  Ok(): void {
    this.isVisibleUser = false;
  }

  Cancel(): void {
    this.isVisibleUser = false;
  }
}

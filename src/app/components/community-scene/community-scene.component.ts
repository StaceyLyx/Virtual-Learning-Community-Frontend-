import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import { Router } from "@angular/router";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {NzNotificationService} from "ng-zorro-antd/notification";
import io from 'socket.io-client';
import {Observable} from "rxjs";
import {SocketServiceService} from "../../services/socket-service.service";

@Component({
  selector: 'app-community-scene',
  templateUrl: './community-scene.component.html',
  styleUrls: ['./community-scene.component.css']
})
export class CommunitySceneComponent implements OnInit {

  @ViewChild('canvasFrame', { static: true }) canvasContainer: ElementRef | undefined;
  private scene = new Scene();
  private camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new WebGLRenderer();
  // 辅助（后期删去）坐标系

  private Light = new THREE.PointLight(0xFFFAFA, 0.8);
  private ambient = new THREE.AmbientLight(0xFFEBCD, 0.5);
  private planeGeometry = new THREE.BoxGeometry(1000, 1000);
  private planeMaterial = new THREE.MeshLambertMaterial({ color: 0xfffbf0, side: THREE.DoubleSide });
  private plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  show: Boolean = true;

  private connection: any;
  constructor(private router: Router,
              private notification: NzNotificationService,
              private socketService: SocketServiceService) { }

  ngOnInit(): void {
    this.init();
    this.initSky();
    this.initModel();
    this.initControls();
    this.animate();

    // 发送登录信息
    this.socketService.socketSend(1);

    // 接受登录消息
    this.connection = this.socketService.socketGet(1).subscribe(data =>{
      console.log(data);
    })

    window.addEventListener("mousedown", (event) => {
      event.preventDefault();//阻止默认
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.offsetY / window.innerHeight) * 2 + 1;
      const pointer = new Vector2(x, y);
      const rayCaster = new Raycaster();
      rayCaster.setFromCamera(pointer,  this.camera);
      let intersects = rayCaster.intersectObjects( this.scene.children, true);

      // 点击跳转到课堂
      this.connection.unsubscribe();
      const intersectClass = intersects.filter(intersect => CommunitySceneComponent.getClassroom(intersect.object))[0];
      if (intersectClass != undefined) {
        // 通过移除挂载dom节点删除
        const div = document.getElementsByTagName('canvas')[0];
        document.body.removeChild(div);

        //关于携带参数的问题
        this.router.navigate(["class"], { queryParams: {} }).then(r => {
          if (r) {
            console.log("navigate to class")
          } else {
            console.log("navigate failed")
          }
        })
      }

      // 点击查看用户信息
      const intersectStudent = intersects.filter(intersect => CommunitySceneComponent.getStudent(intersect.object))[0];
      if (intersectStudent != undefined) {
        this.notification.blank("用户信息", "student");
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
    this.controls.maxDistance = 200;
    this.controls.maxPolarAngle = Math.PI / 2.2;
    this.controls.addEventListener('change', () => {
      this.renderer.render( this.scene,  this.camera);
    })
  }

  init() {
    this.camera.position.set(0, 70, 200);
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
    this.loadModel("student", 'assets/model/student/scene.gltf', [20, 20, 20], [20, 0, 100], 0);
    // this.loadModel("student", 'assets/model/student2/scene.gltf', [15, 15, 15], [50, 0, -20], 135);
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
      if (object.name == "classroom") {
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

  private static getStudent(object: Object3D): any {
    do {
      if (object.name == "student") {
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

  get(object: any): any {
    return object.id
  }

  render() {
    this.renderer.render( this.scene,  this.camera);
  }
}

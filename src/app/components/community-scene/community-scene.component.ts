import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { ElMessageService } from "element-angular";
import { Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import { Router } from "@angular/router";
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
  private directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  private ambient = new THREE.AmbientLight(0xFFEBCD, 0.5);
  private planeGeometry = new THREE.BoxGeometry(1000, 1000);
  private planeMaterial = new THREE.MeshLambertMaterial({ color: 0xfffbf0, side: THREE.DoubleSide });
  private plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  show: Boolean = true;
  constructor(private router: Router,
    private message: ElMessageService) { }

  ngOnInit(): void {
    this.init();
    this.initModel();
    this.initControls();
    this.onWindowResize();
    this.animate();

    window.addEventListener("mousedown", (event) => {
      event.preventDefault();//阻止默认
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.offsetY / window.innerHeight) * 2 + 1;
      const pointer = new Vector2(x, y);
      const rayCaster = new Raycaster();
      rayCaster.setFromCamera(pointer,  this.camera);
      let intersects = rayCaster.intersectObjects( this.scene.children, true);
      //(item)=>item.object.name == 'classroom'
      const intersect = intersects.filter(intersect => CommunitySceneComponent.getClassroom(intersect.object))[0];
      if (intersect != undefined) {
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0]);
        }
        // renderer.setClearColor(0xFFFFFF, 1.0);
        //关于携带参数的问题
        this.router.navigate(["scene"], { queryParams: {} }).then(r => {
          if (r) {
            console.log("navigate to scene")

          } else {
            this.message.setOptions({ showClose: true })
            this.message.warning('跳转失败')
            console.log("navigate failed")
          }
        })
      }
      const intersect2 = intersects.filter(intersect => CommunitySceneComponent.getBoard(intersect.object))[0];
      if (intersect2 != undefined) {
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0]);
        }
        // renderer.setClearColor(0xFFFFFF, 1.0);
        this.router.navigateByUrl("community").then(r => {
          if (r) {
            console.log("navigate to scene")
          } else {
            this.message.setOptions({ showClose: true })
            this.message.warning('跳转失败')
            console.log("navigate failed")
          }
        })
      }
    })
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    window.addEventListener("resize", this.onWindowResize);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
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
    /*
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    //Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcfcfcf);
    //Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 50, -200);
    controls.update();

    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.1);
    ambient.position.set(-5, 10, 1);
    scene.add(ambient);
    */
    this.camera.position.set(-100, 80, -100);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);


    this.Light.position.set(0, 100, 0);
    this.Light.castShadow = true;
    this.scene.add(this.Light);
    this.scene.add(this.ambient);

    this.plane.name = "ground";
    this.plane.position.set(0, 0, 0);
    this.plane.castShadow = true;
    this.plane.receiveShadow = true;
    this.plane.rotateX(-0.5 * Math.PI);
    this.scene.add( this.plane );

    //this.directionalLight.position.set(0, 1, 0);
   // this.directionalLight.castShadow = true;
    //this.scene.add(this.directionalLight);
    
   /* 
       const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
       spotLight.position.set(150, 150, 150)
       spotLight.castShadow = true
       scene.add(spotLight)
     */

    /* export const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 20, 10);
    scene.add(light);
   */
/*

    var planeGeometry = new THREE.PlaneGeometry(300, 300);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 1);
    light.position.set(0, 300, 500);
    scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 1);
    light2.position.set(500, 100, 0);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 1);
    light3.position.set(0, 100, -500);
    scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 1);
    light4.position.set(-500, 300, 500);
    scene.add(light4);


    */




  }

  initModel() {
    this.loadModel("classroom", 'assets/model/room/scene.gltf', [5, 5, 5], [100, 0, 50], 0);
    this.loadModel("classroom", 'assets/model/artschool/scene.gltf', [1.2, 1.2, 1.2], [-90, 0, 20], 0);
    this.loadModel("classroom", 'assets/model/animalschool/scene.gltf', [0.3, 0.3, 0.3], [-20, 0, 100], 0);
    this.loadModel("classroom", 'assets/model/classroom/scene.gltf', [4, 4, 4], [50, 0, -100], 0);
    this.loadModel("student", 'assets/model/student/scene.gltf', [20, 20, 20], [20, 0, 20], 0);
    this.loadModel("student", 'assets/model/student2/scene.gltf', [15, 15, 15], [50, 0, -20], 135);
    this.loadModel("board", 'assets/model/board/scene.gltf', [15, 15, 15], [-120, 0, -100], 0);
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
  get(object: any): any {
    return object.id

  }

  private static getBoard(object: Object3D): any {
    do {
      if (object.name == "board") {
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


  render() {
    this.renderer.render( this.scene,  this.camera);
  }



}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {loader,renderer,scene,ambient,camera,controls, animate,onWindowResize,initControls} from './application';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';import {ElMessageService} from "element-angular";
import {Object3D, Raycaster, Scene, Vector2, WebGLRenderer} from "three";
import {Router} from "@angular/router";
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-community-scene',
  templateUrl: './community-scene.component.html',
  styleUrls: ['./community-scene.component.css']
})
export class CommunitySceneComponent implements OnInit {
  @ViewChild('canvasFrame', {static: true}) canvasContainer: ElementRef | undefined;
  constructor(private router: Router,
    private message: ElMessageService) { }

  ngOnInit(): void {
    this.initModel();
    initControls();
    onWindowResize();
    animate();
    
    window.addEventListener("mousedown", (event) =>{
      event.preventDefault();//阻止默认
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.offsetY / window.innerHeight) * 2 + 1;
      const pointer = new Vector2(x, y); 
      const rayCaster = new Raycaster();
      rayCaster.setFromCamera(pointer, camera);
      let intersects = rayCaster.intersectObjects(scene.children, true);
      //(item)=>item.object.name == 'classroom'
      const intersect = intersects.filter(intersect => CommunitySceneComponent.getClassroom(intersect.object))[0];
      if(intersect != undefined){
        while(scene.children.length > 0){
         scene.remove(scene.children[0]);
        }
      // renderer.setClearColor(0xFFFFFF, 1.0);
      //关于携带参数的问题
        this.router.navigate(["scene"], { queryParams:{}}).then(r => {
          if (r) {
            console.log("navigate to scene")
            
          } else {
            this.message.setOptions({showClose: true})
            this.message.warning('跳转失败')
            console.log("navigate failed")
          }
        })
      }
      const intersect2 = intersects.filter(intersect => CommunitySceneComponent.getBoard(intersect.object))[0];
      if(intersect2 != undefined){
        while(scene.children.length > 0){
         scene.remove(scene.children[0]);
        }
      // renderer.setClearColor(0xFFFFFF, 1.0);
        this.router.navigateByUrl("community").then(r => {
          if (r) {
            console.log("navigate to scene")
          } else {
            this.message.setOptions({showClose: true})
            this.message.warning('跳转失败')
            console.log("navigate failed")
          }
        })
      }
    })
    } 
   
   initModel(){
    this.loadModel("classroom",'assets/model/room/scene.gltf', [5, 5, 5], [100, 0, 50], 0);
    this.loadModel("classroom",'assets/model/artschool/scene.gltf', [1.2, 1.2, 1.2], [-90, 0, 20], 0);
    this.loadModel("classroom",'assets/model/animalschool/scene.gltf', [0.3, 0.3, 0.3], [-20, 0, 100], 0);
    this.loadModel("classroom",'assets/model/classroom/scene.gltf', [4, 4, 4], [50, 0, -100], 0);
    this.loadModel("student",'assets/model/student/scene.gltf', [20, 20, 20], [20, 0, 20], 0);
    this.loadModel("student",'assets/model/student2/scene.gltf', [15, 15, 15], [50, 0, -20], 135);
    this.loadModel("board",'assets/model/board/scene.gltf', [15, 15, 15], [-120, 0, -100], 0);
  }

  loadModel(name: string,path: string, scale: Array<number>, position: Array<number>,
            rotate: number){
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      gltf.scene.traverse((child) =>{
        gltf.scene.name = name;
      
        gltf.scene.scale.set(scale[0], scale[1], scale[2]);
        gltf.scene.position.set(position[0], position[1], position[2]);
        gltf.scene.rotateY(rotate);
        if(child instanceof THREE.Mesh){
          child.castShadow = true;
        }
        scene.add(gltf.scene);
        this.render();
      })
    })
  }
  
  private static getClassroom(object: Object3D): any{
    do{
      if(object.name == "classroom"){
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
   get(object: any): any{
        return object.id
  
}

  private static getBoard(object: Object3D): any{
    do{
      if(object.name == "board"){
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


  render(){
    renderer.render(scene, camera);
  }
   


}
  
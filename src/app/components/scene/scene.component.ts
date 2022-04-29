import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  initCamera, initControls,
  RENDERER, CAMERA, SCENE, CONTROLS
} from '../base';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {animate} from "@angular/animations";
import * as THREE from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @ViewChild('canvasFrame', {static: true}) canvasContainer: ElementRef | undefined;
  constructor() { }

  ngOnInit(): void {
    this.init();
    this.initModel();
    this.animate();
  }

  // 场景初始化
  init(){
    initCamera();
    initControls();
  }

  // 动画变换
  animate(){
    requestAnimationFrame(animate);
    CONTROLS.update();
    this.render();
  }

  initModel(){
    // 教室椅子
    this.loadModel('assets/model/plastic_chair_1/scene.gltf', [40, 40, 40], [80, 0, 0], 0.5 * Math.PI);
    this.loadModel('assets/model/plastic_chair_1/scene.gltf', [40, 40, 40], [-90, 0, 20], -0.5 * Math.PI);
    this.loadModel('assets/model/white_chair/scene.gltf', [50, 50, 50], [-90, 0, -50], Math.PI);
    this.loadModel('assets/model/white_chair/scene.gltf', [50, 50, 50], [0, 0, 100], 0.5 * Math.PI);
    // 教室白板
    this.loadModel('assets/model/whiteboard/scene.gltf', [5, 5, 5], [50, 0, 130], 180);
    // 教室门
    this.loadModel('assets/model/door/scene.gltf', [50, 50, 50], [-200, 0, 150], 0.5 * Math.PI);
    // 教室桌子
    this.loadModel('assets/model/table/scene.gltf', [120, 100, 120], [0, 0, 0], 0);
    // 窗子
    this.loadModel('assets/model/window/scene.gltf', [1, 1, 1], [130, 50, -30], 0.5 * Math.PI);
    this.loadModel('assets/model/window/scene.gltf', [1, 1, 1], [130, 50, 130], 0.5 * Math.PI);
  }

  // 加载模型
  loadModel(path: string, scale: Array<number>, position: Array<number>,
            rotate: number){
    const loader = new GLTFLoader();
    // 教室椅子
    loader.load(path, (gltf) => {
      gltf.scene.traverse((child) =>{
        gltf.scene.scale.set(scale[0], scale[1], scale[2]);
        gltf.scene.position.set(position[0], position[1], position[2]);
        gltf.scene.rotateY(rotate);
        if(child instanceof THREE.Mesh){
          child.castShadow = true;
        }
        SCENE.add(gltf.scene);
        this.render();
      })
    })
  }

  // 渲染
  render(){
    RENDERER.render(SCENE, CAMERA);
  }

}

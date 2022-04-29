import * as THREE from 'three';
import {Scene, WebGLRenderer} from 'three';

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 场景
export const SCENE = new Scene();

// 相机
export let CAMERA = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000);
export function initCamera(){
  CAMERA.position.set(-100, 80, -100);
  CAMERA.lookAt(SCENE.position);
  SCENE.add(CAMERA);
}

// 渲染器
export const RENDERER = new WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.shadowMap.enabled = true;
document.body.appendChild(RENDERER.domElement);

// 辅助（后期删去）坐标系
// const axes = new THREE.AxesHelper(300);
// axes.position.set(0, 10, 0);
// SCENE.add(axes);

// 灯光
const Light = new THREE.PointLight(0xFFFAFA, 0.8);
Light.position.set(0, 100, 0);
Light.castShadow = true;
SCENE.add(Light);

const ambient = new THREE.AmbientLight(0xFFEBCD, 0.5);
SCENE.add(ambient);

// 地面
const planeGeometry = new THREE.BoxGeometry(400, 400);
const planeMaterial = new THREE.MeshLambertMaterial( {color: 0xCDAA7D} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.set(0, 0, 0);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotateX(-0.5 * Math.PI);
SCENE.add( plane );

// 四周墙壁
for(var i = 0; i < 4; ++i){
  const wallGeometry = new THREE.BoxGeometry(400, 400, 400);
  const wallMaterial = new THREE.MeshLambertMaterial({color: 0xFFFAF0} );
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  if(i < 2){
    wall.position.set(400 * Math.pow(-1, i), 0, 0);
  }else{
    wall.position.set(0, 0, 400 * Math.pow(-1, i));
  }
  plane.castShadow = true;
  plane.receiveShadow = true;
  SCENE.add(wall);
}

// 相机控制
export const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);
export function initControls(){
  CONTROLS.enableDamping = true;
  CONTROLS.dampingFactor = 0.05;
  CONTROLS.minDistance = 100;
  CONTROLS.maxDistance = 200;
  CONTROLS.maxPolarAngle = Math.PI / 2.2;
  CONTROLS.addEventListener('change', () =>{
    RENDERER.render(SCENE, CAMERA);
  })
}


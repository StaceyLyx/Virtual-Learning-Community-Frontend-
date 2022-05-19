import * as THREE from 'three';
import {Scene, WebGLRenderer} from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
let house;

  //Renderer
  export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  //Create scene
  export const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcfcfcf);
  //Camera setup
  export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1,1000);
  export const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set(0, 50, -200);
  controls.update();

  export const ambient = new THREE.AmbientLight(0xFFFFFF, 0.1);
   ambient.position.set(-5,10, 1);
   scene.add(ambient);
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
   

   var planeGeometry = new THREE.PlaneGeometry(300,300);
   var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
   var plane = new THREE.Mesh(planeGeometry, planeMaterial);
   plane.rotation.x = -0.5 * Math.PI;
   plane.position.set(0, 0, 0);
   plane.receiveShadow = true; 
   scene.add(plane);

  export const directionalLight = new THREE.DirectionalLight(0xffffff,10);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  export const light = new THREE.PointLight(0xc4c4c4,1);
  light.position.set(0,300,500);
  scene.add(light);
 const light2 = new THREE.PointLight(0xc4c4c4,1);
  light2.position.set(500,100,0);
  scene.add(light2);
  const light3 = new THREE.PointLight(0xc4c4c4,1);
   light3.position.set(0,100,-500);
  scene.add(light3);
  const light4 = new THREE.PointLight(0xc4c4c4,1);
  light4.position.set(-500,300,500);
  scene.add(light4); 






  //Load Model
  export const loader = new GLTFLoader();
 


export function animate() {
  requestAnimationFrame(animate);
  // house.rotation.x += 0.001;
  // house.rotation.y += 0.001;
  // house.rotation.z += 0.001;

  renderer.render(scene, camera);

  
  
}
export function initControls(){
 controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 100;
  controls.maxDistance = 200;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.addEventListener('change', () =>{
    renderer.render(scene, camera);
  })
}



export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth , window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

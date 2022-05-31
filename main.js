import './style.css'
import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { randFloatSpread } from 'three/src/math/MathUtils';

const scene= new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer =  new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera)


const orbGeometry = new THREE.SphereGeometry(2,32,32)
const orbMaterial = new THREE.PointsMaterial({
  size:0.03,
  color:0xffffff
})
const orb = new THREE.Points(orbGeometry,orbMaterial);


scene.add(orb)

const geometry = new THREE.TorusGeometry (10,2,16,100);
const material = new THREE.PointsMaterial({
  size: 0.1,
  color: 0x79DAE8
});
const torus = new THREE.Points(geometry,material);

scene.add(torus)

const geometryT = new THREE.TorusGeometry (5,2,16,100);
const materialT = new THREE.PointsMaterial({
  size: 0.1,
  color: 0xFF8AAE
});
const torusT = new THREE.Points(geometryT,materialT);

scene.add(torusT)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0.2,0.5,0.5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.15,24,24);
  const material = new THREE.MeshStandardMaterial ({color: 0xffffff})
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  torusT.rotation.x += 0.02;
  torusT.rotation.y += 0.007;
  torusT.rotation.z += 0.002;

  orb.rotation.y += 0.0015;
  controls.update()

  renderer.render(scene,camera);
}

animate()
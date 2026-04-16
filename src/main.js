import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initializing the Renderer and setting to correct size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize Scene Creation
const scene = new THREE.Scene();
scene.background = new THREE.Color("lightgrey"); // dark blue-ish

// Initialize Camera and set position
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, // Aspect ratio should be set to window ratio
  0.1, 
  1000
);
camera.position.z = 5; // Move camera position back to see

// Update camera aspect ratio and renderer on resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Setup controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Create Light

const light = new THREE.PointLight(0x404040, 100, 0, 0);
light.position.set(0, 10, 100);
scene.add(light);

  // let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  // directionalLight.position.set(0, 5, 5);
  // scene.add(directionalLight);

  // const light = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
  // scene.add( light );

  

// Test objects
const geometry = new THREE.SphereGeometry(0.5, 3, 3); // TODO: revert to 32
const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });

const nodes = [
  { x: 0, y: 0, z: 0 },
  { x: 2, y: 1, z: -1 },
  { x: -2, y: -1, z: 1 }
];

const spheres = [];
nodes.forEach(pos => {
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(pos.x, pos.y, pos.z);
  spheres.push(sphere);
  scene.add(sphere);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  spheres.forEach( sphere => {
    sphere.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();
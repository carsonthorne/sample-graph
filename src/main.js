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

// const spheres = [];
// nodes.forEach(pos => {
//   const sphere = new THREE.Mesh(geometry, material);
//   sphere.position.set(pos.x, pos.y, pos.z);
//   spheres.push(sphere);
//   scene.add(sphere);
// });


// Temporary Graph Data
const graphData = {
  nodes: [
    { id: "mf doom", x: 0, y: 0, z: 0 },
    { id: "doomsday", x: 2, y: 1, z: 0 },
    { id: "sade", x: -2, y: 1, z: 0 }
  ],
  edges: [
    { source: "doomsday", target: "sade" },
    { source: "mf doom", target: "doomsday" }
  ]
};


// Test nodeMap

const nodeMap = new Map();
// const geometry = new THREE.SphereGeometry(0.3, 16, 16);
// const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
graphData.nodes.forEach(node => {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(node.x, node.y, node.z);

  scene.add(mesh);
  nodeMap.set(node.id, mesh);
});


// Build Edges from GraphData
graphData.edges.forEach(edge => {
  const sourceNode = nodeMap.get(edge.source);
  const targetNode = nodeMap.get(edge.target);

  if (sourceNode && targetNode) {
    createEdge(sourceNode, targetNode);
  }
});


// Create Edge Function
function createEdge(nodeA, nodeB) {
  const points = [
    nodeA.position,
    nodeB.position
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  const line = new THREE.Line(geometry, material);
  scene.add(line);
}


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // spheres.forEach( sphere => {
  //   sphere.rotation.y += 0.01;
  // });

  renderer.render(scene, camera);
}

animate();
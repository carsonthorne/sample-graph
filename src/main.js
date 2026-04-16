import * as THREE from 'three';
import { initScene } from './scene/initScene.js';

// Initialization
const { renderer, scene, camera, controls } = initScene();

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
const geometry = new THREE.SphereGeometry(0.5, 3, 3); // TODO: revert to 32
const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
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

  renderer.render(scene, camera);
}

animate();
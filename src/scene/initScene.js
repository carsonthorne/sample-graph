import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

/*
 * Initializes the Renderer, Scene, Camera, Controls, & Light.
 */
export function initScene() {
    // Initializing the Renderer and setting to correct size
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("lightgrey");

    // Initialize Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Update camera aspect ratio and renderer on resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Setup Light
    const light = new THREE.PointLight(0x404040, 100, 0, 0);
    light.position.set(0, 10, 100);
    scene.add(light);

    // let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // directionalLight.position.set(0, 5, 5);
    // scene.add(directionalLight);

    // const light = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
    // scene.add( light );

    return { renderer, scene, camera, controls };
}
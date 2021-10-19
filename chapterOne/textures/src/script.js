import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/*****
 * Textture
 * *****/

// three things
// weight file size

// size

// each pixel of the textures will have to be stored on the GPU regardless of the image's weight
// reduce the size of our images as much as possible
// divide by power of 2

// data

// native javscript

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.addEventListener("load", function loadImage(event) {
//   texture.needsUpdate = true;
// });

// image.src = "/textures/door/color.jpg";

// Using Three js

const loadingManager = new THREE.LoadingManager();

// method we can add to loadingManager

loadingManage.onStart = function start() {};
loadingManage.onProgress = function progress() {};
loadingManage.onLoaded = function loaded() {};
loadingManage.onError = function error() {};

const textureLoader = new THREE.TextureLoader(loadingManager);
// provide path to textureLoader.load("")
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

colorTexture.repeat.x = 2;
colorTexture.repeat.y = 2;

colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

// offset

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// rotation

// colorTexture.rotation = 1;
// colorTexture.rotation = Math.PI * 0.25;

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

/**
 * filter and mip mapping
 *  **/

// to deactivate mipmaps generations
colorTexture.generateMipmaps = false;

// colorTexture.minFilter = THREE.NearestFilter;

// has two values or method on THREE object we can use
colorTexture.magFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.LinearFilter;

// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// example with three optional funcs/callback to textureLoader.load()
// const texture = textureLoader.load(
//     "/textures/door/color.jpg",
// // load func
//     function load() {

//     },
//     // progress func
//     function progress() {

//     },
//     // error
//     function error() {

//     }
// );

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Other Objects
 */

// Or
// const geometry = new THREE.SphereGeometry(1, 32, 32)

// Or
// const geometry = new THREE.ConeGeometry(1, 1, 32)

// Or
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

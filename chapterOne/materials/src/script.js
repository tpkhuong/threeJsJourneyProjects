import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

// Mesh basic material

// setting materials there are two ways

// directly while instanciating
// const material = new THREE.MeshBasicMaterial({
//     map:doorColorTexture
// });

// after instanciating
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.color = "red"

// // setting color
// // material.color.set("#ff00ff")
// material.color = new THREE.Color("pink");

// combine map and color
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.color = "red"

// // setting color
// // material.color.set("#ff00ff")
// material.color = new THREE.Color("pink");

// wireframe
// material.wireframe = true;

// opacity
// need .transparent = true
// material.transparent = true;
// material.opacity = 0.5

// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// sides property

//default is front side
// THREE.FrontSide;
// back
// THREE.BackSide;
// doubleside
// THREE.DoubleSide;

/**
 * Mesh normal material
 * **/

// const material = new THREE.MeshNormalMaterial();

// normal are information that contains the direction of the outside of the face

// normal can be use for lighting, reflection, refraction

// MeshNormalMaterial shares common properties with MeshBasicMaterial
// like wireframe, transparent, opacity, side
// new property flatShading

// material.flatShading = true;

// Mesh Matcap Material
// will display a color by using the normals as a reference to pick the right color on a texture taht looks like a sphere
// const material = new THREE.MeshMatcapMaterial();

// change texture
// we can simulate light and shadows without light or shadows in the scene
// there are different textures available in the /static/textures folder
// matcap github
// https://github.com/nidorx/matcaps
// material.matcap = matcapTexture;
// create our own matcap with a 3D software
//create 2D software like Photoshop

/**
 * Mesh Depth Material
 *  **/

// will color the geometry in white if its close to the near and black if its close to the far value of the camera

// const material = new THREE.MeshDepthMaterial();

/**
 * Lights
 * **/

// adding lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//add it to the scene
scene.add(ambientLight);

const pointLIght = new THREE.PointLight(0xffffff, 0.5);
pointLIght.position.x = 2;
pointLIght.position.y = 3;
pointLIght.position.z = 4;
scene.add(pointLIght);

// material that will react to light

const material = new THREE.MeshLambertMaterial();

/**
 * Mesh Phong Material
 * similar to MeshLambertMaterial but the strange patterns are less visible we will see light reflection
 *  **/

const material = new THREE.MeshPhongMaterial();
material.shininess = 100;
material.specular = new THREE.Color(0x1188ff);
// using one material for multiple objects is good practice
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

/**
 * Mesh Toon Material
 * similar to Lamber but more cartoonish
 * **/

// LOOK AT NOTES from video
const material = new THREE.MeshToonMaterial();
material.gradientMap = gradientTexture;

/**
 * Mesh Standard Material
 * uses physically based rendering principle
 * **/

// we will use this alot

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45;
material.roughness = 0.65;

/***
 * Add debug ui
 *  ***/

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);

sphere.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);

torus.position.x = 1.5;

// adding multiple objects
scene.add(sphere, plane, torus);

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
camera.position.z = 2;
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

  // rotate our objects
  // update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

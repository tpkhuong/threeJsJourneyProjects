import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

// Debug

const gui = new dat.GUI();

/* different elements we can add to the debug panel 

Range —for numbers with minimum and maximum value
Color —for colors with various formats
Text —for simple texts
Checkbox —for booleans (true or false)
Select —for a choice from a list of values
Button —to trigger functions
Folder —to organize your panel if you have too many elements

*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// color of material will presist when our app loads
const material = new THREE.MeshBasicMaterial({ color: parameters.color });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug

// add element pass two arguments: obj, property we want to tweak
// gui.add(mesh.position, "y");
//we can add more arguments to .add
//obj, property, minimum, maximum, step or precision
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);
//obj, property, minimum, maximum, step or precision
//we can add min, max and step using the methods
//use .name() method to change the name of the property we passed into .add()
gui.add(mesh.position, "y").min(-3).max(3).step(0.01);

// show not show
gui.add(mesh, "visible");

//trigger wireframe
gui.add(material, "wireframe");

// change colors
// create temp obj in order to have an accessible property. create a parameter variable at the start of our code

// our parameters obj is not part of the scene
// update the material when the color panel changes color use onChange() method
// trigger a function we will store it in an object
const parameters = {
  color: 0xff0000,
  spin() {
    gsap.to(mesh.position, { duration: 1, y: mesh.position.y + Math.PI * 2 });
  },
};

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");

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
camera.position.z = 3;
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

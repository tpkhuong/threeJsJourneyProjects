import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// The primary purpose of requestAnimationFrame is not to run code on each frame.
// higher framerate means faster rotation when we use rotation
// adapt to the framerate
/*

need to know how much time its been since the last tick
use Date.now() to get current timestamp


*/

// using our own time algorithm
// Time

// previous time
let prevTime = Date.now();

// Animations

tick();

function tick() {
  // time
  console.log("prevTime", prevTime);
  const currentTime = Date.now();
  console.log("currentTime", currentTime);
  // get difference of time
  const timeDifference = currentTime - prevTime;
  console.log("timeDifference", timeDifference);
  prevTime = currentTime;

  // update objects
  mesh.rotation.y += 0.001 * timeDifference;
  //render
  renderer.render(scene, camera);

  //call tick again on the next frame
  window.requestAnimationFrame(tick);
}

// using three js clock function

// const clock = new THREE.Clock();

//two arguments: first the obj we want to target, second is the obj
// gsap.to(mesh.position, { duration: 1, x: 2, delay: 1 });

// Animations

// tick();

// function tick() {
//   //Clock
//   //   const elapsedTime = clock.getElapsedTime();
//   // update objects
//   // rotation one whole resolution
//   //   mesh.rotation.y = elapsedTime * (Math.PI * 2);
//   //   object is moving
//   //   mesh.position.y = Math.sin(elapsedTime);
//   //   mesh.position.x = Math.cos(elapsedTime);
//   // we can move the camera
//   //   camera.position.y = Math.sin(elapsedTime);
//   //   camera.position.x = Math.cos(elapsedTime);
//   //   camera.lookAt(mesh.position);
//   //render
//   renderer.render(scene, camera);

//   //call tick again on the next frame
//   window.requestAnimationFrame(tick);
// }

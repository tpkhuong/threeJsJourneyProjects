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

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/***** use window.innerWidth and window.innerHeight to get viewport *****/

/**
 * Sizes
 */
const sizes = {
  // explicit view size for our canvas
  // width: 800,
  // height: 600
  /***** use window.innerWidth and window.innerHeight to get viewport *****/
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Resizing our canvas
 */

window.addEventListener("resize", listenToResizing);

function listenToResizing(event) {
  //   update sizes

  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  /***** update the other part of our scene *****/
  // update the camera aspect ratio
  camera.aspect = sizes.width / sizes.height;
  //when changing properties like aspect we need to call camera.updateProjectionMatrix
  camera.updateProjectionMatrix();
  // update the renderer
  renderer.setSize(sizes.width, sizes.height);
  // handle pixel ratio on resize too
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/***** handle fullscreen: using listen event dblclick *****/

window.addEventListener("dblclick", handleFullScreen);

function handleFullScreen(event) {
  /***** use prefix for safari *****/
  console.log(document.webkitfullscreenElement);
  console.log(document.fullscreenElement);

  const fullscreenElement =
    document.fullscreenElement || document.webkitfullscreenElement;

  if (!fullscreenElement) {
    // if (canvas.requestFullscreen) {
    //   canvas.requestFullscreen();
    // } else if (canvas.webkitfullscreenElement) {
    //   canvas.webkitRequestFullscreen();
    // }

    // use switch
    switch (true) {
      // checking !== false because DOMelement.requestFullscreen is a function which is truthy
      //if !== false returns true it means the element does have the method .requestFullScreen
      //   we could check if its true: canvas.requestFullscreen === true this didnt work
      // check if typeof .requestFullscreen is a "function" if it is then call .requestFullscreen()
      case typeof canvas.requestFullscreen == "function":
        console.log("here");
        canvas.requestFullscreen();
        break;
      case typeof canvas.webkitfullscreenElement == "function":
        canvas.webkitRequestFullscreen();
        break;
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    //   switch
    // switch (true) {
    //   case typeof document.exitFullscreen == "function":
    //     document.exitFullscreen();
    //     break;
    //   case typeof document.exitFullscreen == "function":
    //     document.webkitExitFullscreen();
    //     break;
    // }
  }

  /***** without prefix *****/
  //   // use requestFullscreen to go to fullscreen
  //   console.log(document.fullscreenElement);
  //   if (!document.fullscreenElement) {
  //     //call it on the canvas or element of our choice
  //     canvas.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
}

/***** handle pixel ratio *****/
// console.log(window.devicePixelRatio)
//apply it to renderer

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
// renderer.setPixelRatio(window.devicePixelRatio);
// limit the pixel ratio to 2
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

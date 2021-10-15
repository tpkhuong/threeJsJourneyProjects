import "./style.css";
import * as THREE from "three";
// pointerlockcontrols is not in the THREE object. we need to import it
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(OrbitControls);

// mouse pointer location
//get coordinates of mouse

window.addEventListener("mousemove", getCoordinatesOfMouse);
// store our coordinates

const pointerCoordinates = {
  x: 0,
  y: 0,
};

function getCoordinatesOfMouse(event) {
  //use the size of the viewport or the size of our canvas
  //use - .5 to get negative and positive values
  // the browser clientY negative value goes up
  // the browser clientY positive value goes down
  pointerCoordinates.x = event.clientX / sizes.width - 0.5;
  // pointerCoordinates.y = (event.clientY / sizes.height - 0.5);
  // in threejs reverse
  // negative value goes down
  // positive value goes up
  //make pointerCoordinates.y a negative value
  pointerCoordinates.y = -(event.clientY / sizes.height - 0.5);
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera

// const camera = new THREE.PerspectiveCamera(field of view, aspectRatio, near, far);
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, near, far);
// Any object or part of the object closer to the camera than the near value or further away from the camera than the far value will not show up on the render.

// PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// orthographic camera

//Instead of a field of view, you must provide how far the camera can see in each direction (left, right, top and bottom).
// Then you can provide the near and far values just like we did for the PerspectiveCamera.
// const camera = new THREE.OrthographicCamera(left,right,top, bottom, near, far)
// const aspectRatio = sizes.width / sizes.height;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// moving the camera with our mouse

// Controls

// provide two arguments: our camera and a DOM element
// const controls = new OrbitControls(ourCamera, DOMelement)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // update camera
  /*****
   * moving the CAMERA. NOT the cube! this view is like looking at the object(cube in this example from a plane view from above view)
   * *****/
  //   camera.position.x = pointerCoordinates.x * 10;
  //   camera.position.y = pointerCoordinates.y * 10;
  // camera.lookAt(mesh.position);
  // look at our cube, center the view make camera lookat our cube
  // when we dont provide any argument to THREE.Vector3 it will be (0,0,0)
  //   camera.lookAt(new THREE.Vector3());
  //pass in the position of our cube use mesh.position instead of new THREE.Vector3()
  /***** want to see the back of the cube. *****/
  // updating camera without using threejs built-in controls
  //   camera.position.x = Math.sin(pointerCoordinates.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(pointerCoordinates.x * Math.PI * 2) * 3;
  //   camera.position.y = pointerCoordinates.y * 5;
  //   camera.lookAt(mesh.position);

  /***** threejs built-in controls *****/
  // update controls
  // update dampening on each frame
  controls.update();

  // update controls
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

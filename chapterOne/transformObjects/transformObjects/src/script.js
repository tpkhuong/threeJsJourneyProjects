import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group = new THREE.Group();
// when we nmove multiple objects we can put the object in groups

//add group to the scene

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

group.add(cube1);

// cube2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);

cube2.position.x = 2;
group.add(cube2);

// cube3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

cube3.position.x = -2;
group.add(cube3);

// move the whole group
group.position.y = 1;
group.scale.y = 3;
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

// axes helper

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function notes() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // position
  mesh.position.set(2, 1, 0.5);

  //Scale

  // mesh.scale.x = 2;
  // mesh.scale.y = 0.5;
  // mesh.scale.z = 0.5;
  // change all three x,y, and z

  mesh.scale.set(2, 0.5, 0.5);

  // Rotation is a euler not a Vector3

  mesh.rotation.y = 0.5;
  //to make a half rotation use this 3.14159 or Math/PI
  //full rotation will be 2 times Math.PI or 3.14159
  //changing x or y or z will change the other axis
  //when we update rotation it will update quaternion if we update quaternion it will update rotation

  //lookAt method on the Object3D instances target must be a vector3

  camera.lookAt(new THREE.Vector3(3, 0, 0));

  // we can have mesh.position, mesh.scale or mesh.rotation in any order
}

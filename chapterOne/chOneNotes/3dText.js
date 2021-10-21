import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import typefaceFront from "three/examples/fonts/helvetiker_regular.typeface.json";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes helper

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// use boudning measures to only render what we want and not things/objects not in front of the camera

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//use matcap material
//change const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
console.log(matcapTexture);
/**
 * Fonts
 * **/

const fontLoader = new THREE.FontLoader();

fontLoader.load(
  "/fonts/helvetiker_regular.typeface.json",
  // provide callback
  function loadFont(font) {
    const textGeometry = new THREE.TextBufferGeometry("Hello Three.js", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.computeBoundingBox();
    //   we will get Box3
    console.log(textGeometry.boundingBox);
    const textMaterial = new THREE.MeshBasicMaterial();
    //   lower the curveSegments and bevelSegments to lower the triangles for performance
    textMaterial.wireframe = true;
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
    //   move the geometry instead of the mesh 23min of 3dtext video
    // textGeometry.translate(
    //   textGeometry.boundingBox.max.x * 0.5,
    //   textGeometry.boundingBox.max.y * 0.5,
    //   textGeometry.boundingBox.max.z * 0.5
    // );
    //   adjust bevelThicknes and bevelSize to center it
    //   below code will center the boundingBox
    /**
     * this is the long way use method .center()
     *  **/
    textGeometry.translate(
      (textGeometry.boundingBox.max.x - 0.02) * 0.5,
      (textGeometry.boundingBox.max.y - 0.02) * 0.5,
      (textGeometry.boundingBox.max.z - 0.03) * 0.5
    );
    //   center method
    textGeometry.center();
    /**
     * first approach to make donuts
     * **/
    console.time("donuts");
    for (let index = 0; index < 100; index++) {
      const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      });

      const donut = new THREE.Mesh(donutGeometry, donutMaterial);

      // change position (random)
      // make donuts both direction left and right
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      // add rotation
      // randomly
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      // add scale make random size
      const scale = Math.random();
      // donut.scale.x = scale;
      // donut.scale.y = scale;
      // donut.scale.z = scale;
      // or use set
      donut.set(scale, scale, scale);

      scene.add(donut);
    }

    /** 
         * Optimize
         * we can use the same material and the same geometry on multiple Meshes
         * put these outside of our loop
         * const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      });
         * **/

    //   using both material for text and donut
    const material = new THREE.MeshBasicMaterial();
    //   lower the curveSegments and bevelSegments to lower the triangles for performance
    textMaterial.wireframe = true;
    const text = new THREE.Mesh(textGeometry, material);
    const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
    // const donutMaterial = new THREE.MeshMatcapMaterial({
    //   matcap: matcapTexture,
    // });

    for (let index = 0; index < 100; index++) {
      const donut = new THREE.Mesh(donutGeometry, material);
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random();
      donut.set(scale, scale, scale);
      scene.add(donut);
    }

    console.time("donuts");
  }
);

// Using MeshMatcapMaterial

/**
 * Object

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

scene.add(cube);

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

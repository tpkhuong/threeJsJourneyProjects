(function ourScopeVariables() {
  // 4 elements:
  /*
    scene that will contain objects
    some objects
    camera
    renderer
    */
  // sizes
  const sizes = {
    width: 800,
    height: 600,
  };
  // scene = container
  const scene = new THREE.Scene();
  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "hsl(356, 100%, 41%)",
  });
  // mesh
  const mesh = new THREE.Mesh(geometry, material);

  // add Mesh to the scene
  scene.add(mesh);
  // camera: a point of view when rendering
  //provide two arguments for PerspectiveCamera
  // field of view in degrees called fov
  // aspect ratio: width of the render divided by the height of the render
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  // change camera position
  camera.position.z = 3;
  camera.position.x = 1;
  camera.position.y = 1;
  // add camera to scene
  scene.add(camera);
  // renderer: render the scene from the camera point of view
  const canvas = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });

  renderer.setSize(sizes.width, sizes.height);
  // render our camera: two arguments scene and camera
  renderer.render(scene, camera);
  //***** the camera is inside the cube which is why we dont see anything *****/
  // need to move the object: position, rotation, scale
  // position is an object: x,y,andx properties
  //three js considers forward/backward axis to be z
  //increase the z value to move camera backwards
})();

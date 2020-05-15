import {
  Vector3,
  Color,
  WebGLRenderer,
  Scene,
  FogExp2,
  PerspectiveCamera,
  Raycaster
} from 'three';
import {
  times,
  getColor
} from './Utilities.js';

const gameProperties = { state: 'uninitialized' };

const canvas = document.querySelector('canvas');

const width = canvas.clientWidth,
  height = canvas.clientHeight,
  color = getColor('bright');

const renderer = new WebGLRenderer({ canvas });
renderer.setPixelRatio(0.25);
renderer.setSize(width, height);
renderer.setScissorTest(true);

const scenes = times(2, () => {

  const scene = new Scene();
  scene.background = new Color(color);
  scene.fog = new FogExp2(color, 0.05);

  return scene;
});

const camerasInitials = { position: new Vector3(0, 4, 0) };

const cameras = [
  new PerspectiveCamera(90, width/height, 0.1, 1000),
  new PerspectiveCamera(60, width/height, 0.1, 1000)
];
cameras[0].position.copy(camerasInitials.position);
cameras[0].rotateX(270*Math.PI/180);

const border = {
  position: 'up',
  value: height*14/15
};

const raycaster = new Raycaster();

export {
  canvas,
  renderer,
  scenes,
  cameras,
  camerasInitials,
  border,
  raycaster,
  gameProperties,
};

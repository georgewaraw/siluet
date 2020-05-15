import {
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Group
} from 'three';
import { getColor } from './Utilities.js';
import { setShader } from './Shader.js';
import { getLocations } from './Map.js';

const playersProperties = {
  health: 2,
  isAiming: false
};

const geometry = new PlaneBufferGeometry(3, 3);
geometry.rotateX(270*Math.PI/180);

const material = setShader(
  {
    uTime: 0,
    uSpeed: 0.25,
    uMorph: 12.5,
    uDistort: 0.125
  },
  new MeshBasicMaterial({
    transparent: true,
    opacity: 0.75,
    color: getColor('dark')
  }),
  'player'
);

const objects = [
  new Group(),
  new Group()
];
const location = getLocations('P')[0];
objects.map((e) => e.position.set(location.x, 0, location.z));
objects[0].add(new Mesh(geometry, material));

export {
  objects as players,
  playersProperties
};

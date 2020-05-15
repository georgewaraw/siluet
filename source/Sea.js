import {
  Vector3,
  BufferGeometry,
  PointsMaterial,
  Points
} from 'three';
import {
  times,
  getRandomNumber,
  getColor,
  getTexture
} from './Utilities.js';
import { setShader } from './Shader.js';
import { size } from './Map.js';

const seaInitials = { uDistort: 2.5 };

const geometry = new BufferGeometry().setFromPoints(times(size*150, () =>
  new Vector3(getRandomNumber(-size, size), getRandomNumber(-15, -11), getRandomNumber(-size, size))));

const values = {
  uTime: 0,
  uSpeed: 0.125,
  uMorph: 200,
  uDistort: seaInitials.uDistort
};
const materials = [
  setShader(
    values,
    new PointsMaterial({
      size: 5,
      transparent: true,
      opacity: 0.125,
      color: getColor('dark')
    }),
    'sea_colored'
  ),
  setShader(
    values,
    new PointsMaterial({
      size: 5,
      transparent: true,
      opacity: 0.125,
      map: getTexture('blue')
    }),
    'sea_textured'
  )
];

const objects = [
  new Points(geometry, materials[0]),
  new Points(geometry, materials[1])
];
// increasing X moves West, increasing Z moves South
objects.map((e) => e.position.set(size/3, 0, size/3));

export {
  objects as sea,
  seaInitials
};

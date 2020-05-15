import {
  Vector3,
  BufferGeometry,
  PointsMaterial,
  Points
} from 'three';
import {
  times,
  getLesserNumber,
  getRandomNumber,
  getColor,
  getTexture
} from './Utilities.js';
import { setShader } from './Shader.js';
import { size } from './Map.js';

const skyInitials = { uDistort: 1.25 };

const geometry = new BufferGeometry().setFromPoints(times(size*150, () =>
  new Vector3(getRandomNumber(-size, size), getRandomNumber(13, 40), getRandomNumber(-size, size))));

const values = {
  uTime: 0,
  uSpeed: 0.125,
  uMorph: 100,
  uDistort: skyInitials.uDistort
};
const materials = [
  setShader(
    values,
    new PointsMaterial({
      size: 7.5,
      transparent: true,
      opacity: 0.125,
      color: getColor('dark')
    }),
    'sky_colored'
  ),
  setShader(
    values,
    new PointsMaterial({
      size: 7.5,
      transparent: true,
      opacity: 0.25,
      map: getTexture('blue')
    }),
    'sky_textured'
  )
];

const objects = [
  new Points(geometry, materials[0]),
  new Points(geometry, materials[1])
];
objects[0].renderOrder = getLesserNumber();
// increasing X moves West, increasing Z moves South
objects.map((e) => e.position.set(size/3, 0, size/3));

export {
  objects as sky,
  skyInitials
};

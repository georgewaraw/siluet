import {
  BoxGeometry,
  Geometry,
  EdgesGeometry,
  MeshBasicMaterial,
  LineSegments,
  Mesh
} from 'three';
import {
  getLesserNumber,
  getColor,
  getTexture
} from './Utilities.js';
import { setShader } from './Shader.js';
import { getLocations } from './Map.js';

const rectangleInitials = { uDistort: 10 };

const geometry = getLocations('S').reduce((a, e) => {

  const geometry = new BoxGeometry(5, 10, 5);
  geometry.translate(e.x, 2.5, e.z);
  a.merge(geometry);

  return a;
}, new Geometry());

const values = {
  uTime: 0,
  uSpeed: 0.375,
  uMorph: 50,
  uDistort: rectangleInitials.uDistort
};
const materials = [
  setShader(
    values,
    new MeshBasicMaterial({ color: getColor('dark') }),
    'rectangle_colored'
  ),
  setShader(
    values,
    new MeshBasicMaterial({
      depthWrite: false,
      transparent: true,
      opacity: 0.5,
      map: getTexture('mix')
    }),
    'rectangle_textured'
  )
];

const objects = [
  new LineSegments(new EdgesGeometry(geometry), materials[0]),
  new Mesh(geometry, materials[1])
];
objects[1].renderOrder = getLesserNumber();

export {
  objects as rectangle,
  rectangleInitials
};

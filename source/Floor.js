import {
  PlaneGeometry,
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

const floorInitials = { uDistort: 0 };

const geometry = getLocations('F').concat(getLocations('E'), getLocations('P')).reduce((a, e) => {

  const geometry = new PlaneGeometry(5, 5);
  geometry.rotateX(270*Math.PI/180);
  geometry.translate(e.x, -7.5, e.z);
  a.merge(geometry);

  return a;
}, new Geometry());

const values = {
  uTime: 0,
  uSpeed: 0.375,
  uMorph: 20,
  uDistort: floorInitials.uDistort
};
const materials = [
  setShader(
    values,
    new MeshBasicMaterial({ color: getColor('dark') }),
    'floor_colored'
  ),
  setShader(
    values,
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      map: getTexture('grey')
    }),
    'floor_textured'
  )
];

const objects = [
  new LineSegments(new EdgesGeometry(geometry), materials[0]),
  new Mesh(geometry, materials[1])
];
objects[1].renderOrder = getLesserNumber();

export {
  objects as floor,
  floorInitials
};

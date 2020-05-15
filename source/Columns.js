import {
  CylinderGeometry,
  Geometry,
  EdgesGeometry,
  MeshBasicMaterial,
  LineSegments,
  Mesh
} from 'three';
import {
  getRandomNumber,
  getColor,
  getTexture
} from './Utilities.js';
import { setShader } from './Shader.js';
import { getLocations } from './Map.js';

const columnsInitials = { uDistort: 1.25 };

const geometry = getLocations('C').reduce((a, e) => {

  const geometry = new CylinderGeometry(
    getRandomNumber(2) ? 1.25 : 1.125,
    getRandomNumber(2) ? 1.25 : 1.125,
    getRandomNumber(2) ? 50 : 37.5,
    getRandomNumber(2) ? 16 : 12,
    getRandomNumber(2) ? 8 : 6
  );
  geometry.translate(e.x, 0, e.z);
  a.merge(geometry);

  return a;
}, new Geometry());
geometry.faces.map((e) => e.materialIndex = getRandomNumber(1, 3));

const values = {
  uTime: 0,
  uSpeed: 0.375,
  uMorph: 10,
  uDistort: columnsInitials.uDistort
};
const materials = [
  setShader(
    values,
    new MeshBasicMaterial({ color: getColor('dark') }),
    'columns_colored'
  ),
  setShader(
    values,
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0.9,
      map: getTexture('grey')
    }),
    'columns_textured'
  )
];

const objects = [
  new LineSegments(new EdgesGeometry(geometry), materials[0]),
  new Mesh(geometry, materials)
];

export {
  objects as columns,
  columnsInitials
};

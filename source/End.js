import {
  TextBufferGeometry,
  EdgesGeometry,
  MeshBasicMaterial,
  LineSegments,
  Mesh,
  Group
} from 'three';
import {
  getFont,
  getColor
} from './Utilities.js';
import { setShader } from './Shader.js';

const end = new Promise((r) => r(getFont('Bender_Regular').then((font) => {

  const geometry = new EdgesGeometry(new TextBufferGeometry('КОНЕЦ!', {
    font,
    size: 0.1,
    height: 0.01
  }));

  const values = {
      uTime: 0,
      uSpeed: 0.375,
      uMorph: 0.125,
      uDistort: 0.025
    },
    color = getColor();
  const materials = [
    setShader(
      values,
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        color
      }),
      'end_inner'
    ),
    setShader(
      values,
      new MeshBasicMaterial({ color }),
      'end_outer'
    )
  ];

  const object = new Group();
  object.position.set(-0.25, 0, -1);
  object.add(new Mesh(geometry, materials[0]));
  object.add(new LineSegments(geometry, materials[1]));

  return object;
})));

export { end };

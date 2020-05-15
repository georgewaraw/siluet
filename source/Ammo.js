import {
  TextBufferGeometry,
  EdgesGeometry,
  MeshBasicMaterial,
  Mesh,
  Group
} from 'three';
import {
  getFont,
  getColor
} from './Utilities.js';
import { setShader } from './Shader.js';

const ammoInitials = { uDistort: 0.0025 };

const ammoProperties = { count: 9 };

const ammo = new Promise((r) => r(getFont('Pomeranian_Regular').then((font) => {

  const geometries = '!一二三四五六七八九'
    .split('')
    .map((e) => {

      const geometry = new TextBufferGeometry(e, {
        font,
        size: 0.075,
        height: 0.0075
      });
      geometry.rotateZ(15*Math.PI/180);
      geometry.translate(-0.05, 0.075, 0);

      return geometry;
    });

  const materials = [
    setShader(
      {
        uTime: 0,
        uSpeed: 0.25,
        uMorph: 3.75,
        uDistort: ammoInitials.uDistort
      },
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.75,
        color: getColor()
      }),
      'ammo_inner'
    ),
    setShader(
      {
        uTime: 0,
        uSpeed: 0.125,
        uMorph: 7.5,
        uDistort: ammoInitials.uDistort*2
      },
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.25,
        color: getColor('bright')
      }),
      'ammo_outer'
    )
  ];

  const objects = geometries.map((e) => {

    const object = new Group();
    object.add(new Mesh(e, materials[0]));
    object.add(new Mesh(new EdgesGeometry(e), materials[1]));

    return object;
  });

  return objects;
})));

export {
  ammo,
  ammoInitials,
  ammoProperties
};

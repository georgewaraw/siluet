import {
  Vector3,
  EdgesGeometry,
  MeshBasicMaterial,
  Mesh,
  Group
} from 'three';
import {
  getModel,
  getColor
} from './Utilities.js';
import { setShader } from './Shader.js';

const gunInitials = {
  uMorph: 3.75,
  position: new Vector3(0.1, -0.25, -1)
};

const gun = new Promise((r) => r(getModel('gun').then((geometry) => {

  geometry.scale(0.0025, 0.0025, 0.0025);
  geometry.rotateX(270*Math.PI/180);
  geometry.rotateY(120*Math.PI/180);
  geometry.rotateZ(60*Math.PI/180);

  const materials = [
    setShader(
      {
        uTime: 0,
        uSpeed: 0.25,
        uMorph: gunInitials.uMorph,
        uDistort: 0.0125
      },
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.75,
        color: getColor()
      }),
      'gun_inner'
    ),
    setShader(
      {
        uTime: 0,
        uSpeed: 0.125,
        uMorph: 7.5,
        uDistort: 0.025
      },
      new MeshBasicMaterial({
        depthWrite: false,
        transparent: true,
        opacity: 0.125,
        color: getColor('bright')
      }),
      'gun_outer'
    )
  ];

  const object = new Group();
  object.add(new Mesh(geometry, materials[0]));
  object.add(new Mesh(new EdgesGeometry(geometry), materials[1]));
  object.position.copy(gunInitials.position);

  return object;
})));

export {
  gun,
  gunInitials
};

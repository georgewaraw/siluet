import {
  SphereBufferGeometry,
  EdgesGeometry,
  MeshBasicMaterial,
  LineSegments,
  Mesh,
  Group
} from 'three';
import {
  times,
  getRandomNumber,
  getModel,
  getColor
} from './Utilities.js';
import { setShader } from './Shader.js';
import { getLocations } from './Map.js';

const enemiesInitials = {
  uMorph: 25,
  uDistort: 0
};

const enemiesProperties = { count: 5 };

const enemies = new Promise((r) => r(getModel('enemy').then((geometry) => {

  const geometries = [
    new EdgesGeometry(new SphereBufferGeometry(1, 16, 16)),
    new EdgesGeometry(geometry.scale(0.03, 0.03, 0.03))
  ];
  geometries[1].rotateX(270*Math.PI/180);
  geometries[1].translate(0, -1.5, 0);

  const locations = [...getLocations('E')];

  return times(enemiesProperties.count, (_, i) => {

    const materials = [
      setShader(
        {
          uTime: 0,
          uSpeed: (getRandomNumber(2)) ? 0.0833 : 0.0625,
          uMorph: (getRandomNumber(2)) ? 1000 : 750,
          uDistort: 1.25
        },
        new MeshBasicMaterial({ color: getColor('dark') }),
        `enemy_${i}_colored`
      ),
      setShader(
        {
          uTime: 0,
          uSpeed: 0.25,
          uMorph: enemiesInitials.uMorph,
          uDistort: enemiesInitials.uDistort
        },
        new MeshBasicMaterial({
          transparent: true,
          opacity: 0.5,
          color: getColor()
        }),
        `enemy_${i}_textured_inner`
      ),
      setShader(
        {
          uTime: 0,
          uSpeed: 0.125,
          uMorph: enemiesInitials.uMorph*2,
          uDistort: enemiesInitials.uDistort*10
        },
        new MeshBasicMaterial({
          depthWrite: false,
          transparent: true,
          opacity: 0.25,
          color: getColor('bright')
        }),
        `enemy_${i}_textured_outer`
      )
    ];

    const objects = [
      new LineSegments(geometries[0], materials[0]),
      new Group()
    ];
    objects[1].add(new Mesh(geometries[1], materials[1]));
    objects[1].add(new Mesh(geometries[1], materials[2]));
    objects[1].name = `enemy_${i}_textured`;
    objects[1].rotation.y = getRandomNumber(5)*72;
    const index = getRandomNumber(locations.length);
    objects.map((e) => e.position.set(locations[index].x, 0, locations[index].z));
    locations.splice(index, 1);

    return objects;
  });
})));

export {
  enemies,
  enemiesInitials,
  enemiesProperties
};

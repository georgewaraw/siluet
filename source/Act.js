import { Vector2 } from 'three';
import TWEEN from 'es6-tween';
import { getRandomNumber } from './Utilities.js';
import { getShader } from './Shader.js';
import { getLocations } from './Map.js';
import {
  gameProperties,
  canvas,
  scenes,
  cameras,
  camerasInitials,
  border,
  raycaster
} from './Game.js';
import {
  players,
  playersProperties
} from './Players.js';
import { title } from './Title.js'
import { end } from './End.js';
import {
  enemies,
  enemiesInitials,
  enemiesProperties
} from './Enemies.js';
import {
  gun,
  gunInitials
} from './Gun.js';
import {
  ammo,
  ammoInitials,
  ammoProperties
} from './Ammo.js';
import { audio } from './Audio.js';

let acting = false;
const animate = (object, destination, duration=375, callback=()=>acting=false) => {
  acting = true;

  new TWEEN.Tween(object)
    .to(destination, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .on('complete', callback)
    .start();
};

const locations = getLocations('F').concat(getLocations('E'), getLocations('P')),
  directions = ['north', 'east', 'south', 'west'];
let index = 0;
const move = (object, direction) => {

  const x = object.position.x,
    z = object.position.z;
  switch (direction) {
    case 'north':
      locations.map((e) => e.x === x && e.z === z-5 && animate(object.position, { z: z-5 }));
      break;
    case 'east':
      locations.map((e) => e.x === x+5 && e.z === z && animate(object.position, { x: x+5 }));
      break;
    case 'south':
      locations.map((e) => e.x === x && e.z === z+5 && animate(object.position, { z: z+5 }));
      break;
    case 'west':
      locations.map((e) => e.x === x-5 && e.z === z && animate(object.position, { x: x-5 }));
      break;
  }
};

let looking = 'center';
const look = (destination, duration) =>
  players.map((e) => animate(e.rotation, { y: (e.rotation.y+destination*Math.PI/180).toFixed(4) }, duration));

const act = (action, ...parameters) => {
  switch (action) {

    case 'initialize':

      audio.initialize();
      cameras[0].add(audio.listener);

      setTimeout(() => {
        gameProperties.state = 'initialized';

        title.then((title) => players[1].remove(title));
        gun.then((gun) => players[1].add(gun));
      }, 500);
      act('transition');
      break;

    case 'transition':

      const duration = 500;
      if (border.position === 'up') {
        border.position = 'down';

        playersProperties.isAiming = false;
        animate(border, { value: canvas.clientHeight/15 }, duration);
        animate(cameras[0].position, { y: camerasInitials.position.y*5 }, duration);
      } else {
        border.position = 'up';

        playersProperties.isAiming = true;
        animate(border, { value: canvas.clientHeight*14/15 }, duration);
        animate(cameras[0].position, { y: camerasInitials.position.y }, duration);
      }
      break;

    case 'look':

      if (!acting) {
        if (looking === 'center') {
          if (parameters[0] === 'left') {
            look(30);

            looking = 'left';
          } else if (parameters[0] === 'right') {
            look(-30);

            looking = 'right';
          }
        } else if (parameters[0] === 'center') {
          look((looking === 'left') ? -30 : 30);

          looking = 'center';
        }
      }
      break;

    case 'turn':

      if (!acting) {
        if (parameters[0] === 'left') {
          look(90);

          index = (index-1 < 0) ? index+3 : index-1;
        } else if (parameters[0] === 'right') {
          look(-90);

          index = (index+1 > 3) ? index-3 : index+1;
        } else if (parameters[0] === 'around') {
          look(-180, 500);

          index = (index+2 > 3) ? index-2 : index+2;
        }
      }
      break;

    case 'move':

      players.map((e) => move(e, directions[index]));
      enemies.then((enemies) => {

        if (acting) enemies.map((e, i) => {

          if (!scenes[0].getObjectByName(`enemy_${i}_textured`)) {
            const number = getRandomNumber(4);
            e.map((e) => move(e, directions[number]));

            if (e[1].position.x === players[1].position.x && e[1].position.z === players[1].position.z)
              act('damage', 'player');
          }
        });
      });
      break;

    case 'aim':

      const x = parameters[0],
        y = parameters[1];
      gun.then((gun) => {

        gun.rotation.set(y, -x, 0);
        gun.position.set(x/4+gunInitials.position.x, y/4+gunInitials.position.y, gunInitials.position.z);
      });
      break;

    case 'shoot':

      if (!acting) {
        raycaster.setFromCamera(new Vector2().set(parameters[0], parameters[1]), cameras[1]);

        ammo.then((ammo) => gun.then((gun) => {

          gun.remove(ammo[ammoProperties.count]);
          if (!ammoProperties.count) {
            ammoProperties.count = 10;

            animate(getShader('gun_inner').uniforms.uMorph, { value: [gunInitials.uMorph*16, gunInitials.uMorph] });
          } else {
            animate(getShader('gun_inner').uniforms.uMorph, { value: [gunInitials.uMorph*4, gunInitials.uMorph] });
            animate(gun.children[0].position, { z: [0.1, 0] });

            act('damage', 'enemy');
          }
          gun.add(ammo[--ammoProperties.count]);
        }));

        animate(getShader('ammo_inner').uniforms.uDistort,
          { value: [ammoInitials.uDistort*50, ammoInitials.uDistort] });
      }
      break;

    case 'damage':

      if (parameters[0] === 'player') {
        players[0].children[0].material.opacity -= 0.5;
        if (!--playersProperties.health) act('end');

      } else if (parameters[0] === 'enemy') {
        enemies.then((enemies) => enemies.map((e, i) => {

          if (scenes[1].getObjectByName(`enemy_${i}_textured`) && raycaster.intersectObject(e[0])[0]) {
            const shader = getShader(`enemy_${i}_textured_inner`);
            shader.uniforms.uDistort.value += 0.5;
            if (shader.uniforms.uDistort.value >= enemiesInitials.uDistort+2) {
              scenes[0].remove(e[0]);
              scenes[1].remove(e[1]);
              scenes[0].add(e[1]);
              if (!--enemiesProperties.count) act('end');
            }
          }
        }));
      }
      break;

    case 'end':

      gameProperties.state = 'ended';

      enemies.then((enemies) => enemies.map((e) => (scenes[0].remove(e[0]), scenes[1].remove(e[1]))));
      gun.then((gun) => players[1].remove(gun));
      end.then((end) => players[1].add(end));

      if (border.position === 'down') act('transition');
      break;
  }
};

export { act };

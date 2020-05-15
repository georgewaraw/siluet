import TWEEN from 'es6-tween';
import {
  times,
  getRandomNumber,
  getMappedNumber
} from './Utilities.js';
import { getShader } from './Shader.js';
import {
  canvas,
  renderer,
  scenes,
  cameras,
  border,
  raycaster
} from './Game.js';
import { seaInitials } from './Sea.js';
import { skyInitials } from './Sky.js';
import { floorInitials } from './Floor.js';
import { columnsInitials } from './Columns.js';
import { rectangleInitials } from './Rectangle.js';
import {
  enemies,
  enemiesInitials
} from './Enemies.js';
import { audio } from './Audio.js';

const	range = [0, 255],
  numbers = times(5, () => getRandomNumber(5, 10));
let shader;
const render = (t) => {

  TWEEN.update();

  getShader().map((e) => e.uniforms.uTime.value = t/1000);
  if (audio.analyser) {
    const amplitude = audio.analyser.getAverageFrequency();
    if (shader = getShader('sea_textured')) shader.uniforms.uDistort.value =
      getMappedNumber(amplitude, ...range, seaInitials.uDistort, seaInitials.uDistort*2);
    if (shader = getShader('sky_textured')) shader.uniforms.uDistort.value =
      getMappedNumber(amplitude, ...range, skyInitials.uDistort, skyInitials.uDistort*2);
    if (shader = getShader('floor_textured')) shader.uniforms.uDistort.value =
      getMappedNumber(amplitude, ...range, floorInitials.uDistort, floorInitials.uDistort+2);
    if (shader = getShader('columns_textured')) shader.uniforms.uDistort.value =
      getMappedNumber(amplitude, ...range, columnsInitials.uDistort, columnsInitials.uDistort*4);
    if (shader = getShader('rectangle_textured')) shader.uniforms.uDistort.value =
      getMappedNumber(amplitude, ...range, rectangleInitials.uDistort, rectangleInitials.uDistort*2);
  }

  enemies.then((enemies) => enemies.map((e, i) => {

    if (shader = getShader(`enemy_${i}_textured_inner`)) {
      if (raycaster.intersectObject(e[0])[0]) {
        if (shader.uniforms.uMorph.value < enemiesInitials.uMorph*4) shader.uniforms.uMorph.value += 1;
      } else if (shader.uniforms.uMorph.value > enemiesInitials.uMorph) shader.uniforms.uMorph.value -= 1;
    }

    e[1].rotation.y += 0.01/numbers[i];
  }));

  renderer.setScissor(0, border.value, canvas.clientWidth, canvas.clientHeight);
  renderer.render(scenes[0], cameras[0]);
  renderer.setScissor(0, 0, canvas.clientWidth, border.value);
  renderer.render(scenes[1], cameras[1]);
};

export { render };

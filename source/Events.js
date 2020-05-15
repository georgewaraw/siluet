import {
  gameProperties,
  canvas,
  renderer,
  cameras,
  border
} from './Game.js';
import { playersProperties } from './Players.js';
import { act } from './Act.js';

canvas.ontouchstart = (e) => e.preventDefault();


window.onorientationchange = () => window.location.reload();

window.onresize = () => {

  const width = canvas.clientWidth,
    height = canvas.clientHeight;

  renderer.setSize(width, height);

  cameras.map((e) => {

    e.aspect = width/height;
    e.updateProjectionMatrix();
  });

  border.value = (border.position === 'up') ? height*14/15 : height/15;

  canvas.style.width = '100%';
  canvas.style.height = '100%';
};


let timeThen = 0,
  xStart = 0,
  yStart = 0;
window.ontouchstart = (e) => {

  timeThen = Date.now();

  xStart = e.changedTouches[0].clientX / canvas.clientWidth * 2 - 1;
  yStart = e.changedTouches[0].clientY / canvas.clientHeight * -2 + 1;
};

window.ontouchend = (e) => {

  if (Date.now()-timeThen < 250) {
    const xEnd = e.changedTouches[0].clientX / canvas.clientWidth * 2 - 1,
      yEnd = e.changedTouches[0].clientY / canvas.clientHeight * -2 + 1;
    // tap
    if (Math.abs(xStart-xEnd) < 0.25 && Math.abs(yStart-yEnd) < 0.25) {
      if (gameProperties.state === 'uninitialized') act('initialize');
      else if (gameProperties.state === 'initialized') {
        if (playersProperties.isAiming) act('shoot', xEnd, yEnd);
        else act('move');
      } else if (gameProperties.state === 'ended') window.location.reload();
    // horizontal swipe
    } else if (Math.abs(xStart-xEnd) > 0.25 && Math.abs(yStart-yEnd) < 0.25) {
      if (gameProperties.state === 'initialized' && !playersProperties.isAiming) {
        // swipe right
        if (xStart-xEnd < 0) act('turn', 'left');
        // swipe left
        else act('turn', 'right');
      }
    // vertical swipe
    } else if (Math.abs(xStart-xEnd) < 0.25 && Math.abs(yStart-yEnd) > 0.25) {
      if (gameProperties.state === 'initialized') {
        // swipe up
        if (yStart-yEnd < 0) act('transition');
        // swipe down
        else {
          if (playersProperties.isAiming) act('transition');
          else act('turn', 'around');
        }
      }
    }
  }
};

window.ontouchmove = (e) => {

  if (Date.now()-timeThen > 250) {
    const x = e.changedTouches[0].clientX / canvas.clientWidth * 2 - 1,
      y = e.changedTouches[0].clientY / canvas.clientHeight * -2 + 1;

    if (gameProperties.state === 'initialized' && playersProperties.isAiming) {
      if (x < -0.75) act('look', 'left');
      else if (x > 0.75) act('look', 'right');
      else if (x > -0.1 && x < 0.1) act('look', 'center');

      act('aim', x, y);
    } else act('look', 'center');
  }
};


window.onmousedown = (e) => {

  if (gameProperties.state === 'uninitialized') act('initialize');
  else if (gameProperties.state === 'initialized') {
    const x = e.clientX / canvas.clientWidth * 2 - 1,
      y = e.clientY / canvas.clientHeight * -2 + 1;

    if (playersProperties.isAiming) act('shoot', x, y);
    else {
      if (x < -0.5) act('turn', 'left');
      else if (x > 0.5) act('turn', 'right');
      else {
        if (y > -0.5) act('move');
        else act('turn', 'around');
      }
    }
  } else if (gameProperties.state === 'ended') window.location.reload();
};

window.onkeydown = (e) => {

  if (gameProperties.state === 'initialized') switch (e.code) {
    case 'ArrowLeft': case 'KeyA':
      if (!playersProperties.isAiming) act('turn', 'left');
      break;
    case 'ArrowRight': case 'KeyD':
      if (!playersProperties.isAiming) act('turn', 'right');
      break;
    case 'ArrowUp': case 'KeyW':
      if (!playersProperties.isAiming) act('move');
      break;
    case 'ArrowDown': case 'KeyS':
      if (!playersProperties.isAiming) act('turn', 'around');
      break;
    case 'Space': case 'KeyG':
      act('transition');
      break;
  }
};

window.onmousemove = (e) => {

  const x = e.clientX / canvas.clientWidth * 2 - 1,
    y = e.clientY / canvas.clientHeight * -2 + 1;

  if (gameProperties.state === 'initialized' && playersProperties.isAiming) {
    if (x < -0.9) act('look', 'left');
    else if (x > 0.9) act('look', 'right');
    else if (x > -0.05 && x < 0.05) act('look', 'center');

    act('aim', x, y);
  } else act('look', 'center');
};

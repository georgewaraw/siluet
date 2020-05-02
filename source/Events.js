export default (() => {
  let events;

  return (canvas, cameras, renderer, border, player, act, gun) => events = (!canvas) ? events : (() => {
    canvas.ontouchstart = (e) => e.preventDefault();

    window.ontouchforcechange = (e) => {
      if (e.changedTouches[0].force > 0.5) window.location.reload();
    };
    window.onorientationchange = () => window.location.reload();
    window.onresize = () => {
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      cameras.map((e) => {
        e.aspect = canvas.clientWidth/canvas.clientHeight;
        e.updateProjectionMatrix();
      });

      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      if (border.position === 'down') border.value = canvas.clientHeight/15;
      else if (border.position === 'up') border.value = canvas.clientHeight*14/15;
    };

    let touchStartX, touchStartY, timeThen, initialized;

    window.ontouchstart = (e) => {
      touchStartX = e.changedTouches[0].clientX/canvas.clientWidth*2-1;
      touchStartY = e.changedTouches[0].clientY/canvas.clientHeight*-2+1;

      timeThen = Date.now();
    };
    window.ontouchend = (e) => {
      if (Date.now()-timeThen < 250) {
        const touchEndX = e.changedTouches[0].clientX/canvas.clientWidth*2-1,
          touchEndY = e.changedTouches[0].clientY/canvas.clientHeight*-2+1;

        if (Math.abs(touchStartX-touchEndX) < 0.25 && Math.abs(touchStartY-touchEndY) < 0.25) {
          if (!initialized) {
            initialized = true;
            act('initialize');
          } else (player.isAiming) ? act('shoot') : act('move');
        } else if (Math.abs(touchStartX-touchEndX) > 0.25 && Math.abs(touchStartY - touchEndY) < 0.25) {
          if (touchStartX-touchEndX < 0 && !player.isAiming) act('turn', 'right');
          else if (!player.isAiming) act('turn', 'left');
        } else if (Math.abs(touchStartX-touchEndX) < 0.25 && Math.abs(touchStartY-touchEndY) > 0.25) {
          if (touchStartY-touchEndY < 0) {
            // nesting avoids transition
            if (!player.isAiming) act('transition');
          } else (player.isAiming) ? act('transition') : act('turn', 'around');
        }
      }

      if (!player.isAiming) {
        gun.rotation.set(0, 0, 0);
        gun.position.copy(gun.initials.position);
      }
    };
    window.ontouchmove = (e) => {
      if (Date.now()-timeThen > 250) {
        const x = e.changedTouches[0].clientX/canvas.clientWidth*2-1,
          y = e.changedTouches[0].clientY/canvas.clientHeight*-2+1;

        if (player.isAiming) {
          if (x < -0.9) act('look', 'left');
          else if (x > 0.9) act('look', 'right');
          else if (x > -0.1 && x < 0.1) act('look', 'center');

          gun.rotation.set(y+0.25, -x, 0);
          gun.position.set(x, y-0.75, -3);
        } else act('look', 'center');
      }
    };

    window.onmousedown = (e) => {
      if (!initialized) {
        initialized = true;
        act('initialize');
      }

      if (player.isAiming) act('shoot');
      else {
        if (e.clientX < canvas.clientWidth/4) act('turn', 'left');
        else if (e.clientX > canvas.clientWidth*3/4) act('turn', 'right');
        else {
          if (e.clientY < canvas.clientHeight*3/4) act('move');
          else act('turn', 'around');
        }
      }
    };
    window.onkeydown = (e) => {
      switch (e.code) {
        case 'ArrowLeft': case 'KeyA':
          if (!player.isAiming) act('turn', 'left');
          break;
        case 'ArrowRight': case 'KeyD':
          if (!player.isAiming) act('turn', 'right');
          break;
        case 'ArrowUp': case 'KeyW':
          if (!player.isAiming) act('move');
          break;
        case 'ArrowDown': case 'KeyS':
          if (!player.isAiming) act('turn', 'around');
          break;
        case 'Space': case 'KeyG':
          act('transition');
          break;
      }
    };
    window.onmousemove = (e) => {
      const x = (e.clientX/canvas.clientWidth)*2-1,
        y = (e.clientY/canvas.clientHeight)*-2+1;

      if (player.isAiming) {
        if (x < -0.9) act('look', 'left');
        else if (x > 0.9) act('look', 'right');
        else if (x > -0.1 && x < 0.1) act('look', 'center');

        gun.rotation.set(y+0.25, -x, 0);
        gun.position.set(x, y-0.75, -3);
      } else {
        act('look', 'center');

        gun.rotation.set(0, 0, 0);
        gun.position.copy(gun.initials.position);
      }
    };
  })();
})();

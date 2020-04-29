export default (() => {
  let act;

  return (TWEEN, players, tiles, gun, listener, THREE, camera, playSound, audioAnalyser, enemies, getRandomNumber,
    border, canvas, getShader, ammo, raycaster, scenes) => act = (!TWEEN) ? act : (() => {
    let acting;

    const animate = (object, destination, duration) => {
      acting = true;

      new TWEEN.Tween(object)
        .to(destination, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .on('complete', () => acting = false)
        .start();
    };

    // `.toFixed(4)` improves accuracy
    const look = (destination, duration=375) =>
      players.map((e) => animate(e.rotation, { y: (e.rotation.y+destination*Math.PI/180).toFixed(4) }, duration));

    const move = (x, z, object, destination) => tiles.map((e) => {
      if (x === e.x && z === e.z) animate(object.position, destination, 375);
    });

    const traverse = (object, direction) => {
      switch (direction) {
        case 'north':
          move(object.position.x, object.position.z-5, object, { z: object.position.z-5 });
          break;
        case 'east':
          move(object.position.x+5, object.position.z, object, { x: object.position.x+5 });
          break;
        case 'south':
          move(object.position.x, object.position.z+5, object, { z: object.position.z+5 });
          break;
        case 'west':
          move(object.position.x-5, object.position.z, object, { x: object.position.x-5 });
          break;
      }
    };

    let looking = 'center',
      index = 0,
      directions = ['north', 'east', 'south', 'west'],
      ammoCount = ammo.length-1;

    const animateGun = new TWEEN.Tween(gun.children[0].position)
      .to({ z: [0.1, 0] }, 375)
      .easing(TWEEN.Easing.Quadratic.InOut);

    return (action, direction) => {
      if (action === 'initialize') {
        players[1].remove(players[1].getObjectByName('title'));

        listener(THREE, camera);
        const sound = playSound('music', THREE, listener(), true);
        audioAnalyser(THREE, sound);
      } else if (!acting) {
        if (action === 'look') {
          if (direction === 'left' && looking === 'center') {
            looking = 'left';
            look(30);
          } else if (direction === 'right' && looking === 'center') {
            looking = 'right';
            look(-30);
          } else if (direction === 'center') {
            if (looking === 'left') {
              looking = 'center';
              look(-30);
            } else if (looking === 'right') {
              looking = 'center';
              look(30);
            }
          }
        } else if (action === 'turn') {
          if (direction === 'left') {
            index = (index-1 < 0) ? index+3 : index-1;
            look(90);
          } else if (direction === 'right') {
            index = (index+1 > 3) ? index-3 : index+1;
            look(-90);
          } else if (direction === 'around') {
            index = (index+2 > 3) ? index-2 : index+2;
            look(-180, 500);
          }
        } else if (action === 'move') {
          players.map((e) => traverse(e, directions[index]));
          if (acting) enemies.map((e, i) => {
            if (!scenes[0].getObjectByName(`enemy_${i}`)) {
              const randomNumber = getRandomNumber(0, 4);
              e.map((e) => traverse(e, directions[randomNumber]));
            }
          });
        } else if (action === 'transition') {
          if (border.position === 'down') {
            border.position = 'up';
            animate(border, { value: canvas.clientHeight*14/15 }, 500);

            players[1].isAiming = true;
          } else if (border.position === 'up') {
            border.position = 'down';
            animate(border, { value: canvas.clientHeight/15 }, 500);

            players[1].isAiming = false;
          }
        } else if (action === 'shoot') {
          acting = true;

          new TWEEN.Tween(getShader('gun_top').uniforms.uMorph)
            .to({ value: [30, 7.5] }, 375)
            .start();
          animateGun.start();

          new TWEEN.Tween(getShader('ammo').uniforms.uDistort)
            .to({ value: [0.125, 0.01] }, 375)
            .on('complete', () => acting = false)
            .start();
          gun.remove(ammo[ammoCount]);
          if (!ammoCount) ammoCount = 10;
          gun.add(ammo[--ammoCount]);

          enemies.map((e, i) => {
            if (!scenes[0].getObjectByName(`enemy_${i}`)) {
              const shader = getShader(`enemy_${i}_textured`);
              if (shader && raycaster.intersectObject(e[0])[0]) {
                shader.uniforms.uDistort.value += 0.5;
                if (shader.uniforms.uDistort.value > 2) {
                  scenes[1].remove(e[1]);
                  scenes[0].remove(e[0]);
                  scenes[0].add(e[1]);
                }
              }
            }
          });
        }
      }
    };
  })();
} )();

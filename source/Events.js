export default ( () => {

  let events;

  return ( VRButton, canvas, camera, renderer, border, vr, player, act, gun ) =>
    events = ( !VRButton ) ? events : ( () => {

    canvas.ontouchstart = ( e ) => e.preventDefault();

    window.ontouchforcechange = ( e ) => {

      if ( e.changedTouches[ 0 ].force > 0.5 ) window.location.reload();

    };

    window.onorientationchange = () => window.location.reload();

    window.onresize = () => {

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( canvas.clientWidth, canvas.clientHeight );

      if ( border.position === 'down' ) border.value = canvas.clientHeight / 15;
      else if ( border.position === 'up' ) border.value = canvas.clientHeight * 14 / 15;

    };

    let touchStartX, touchStartY, timeThen;

    window.ontouchstart = ( e ) => {

      touchStartX = e.changedTouches[ 0 ].clientX / canvas.clientWidth * 2 - 1;
      touchStartY = e.changedTouches[ 0 ].clientY / canvas.clientHeight * -2 + 1;

      timeThen = Date.now();

    };

    window.ontouchend = ( e ) => {

      if ( !vr && Date.now() - timeThen < 250 ) {

        const touchEndX = e.changedTouches[ 0 ].clientX / canvas.clientWidth * 2 - 1,
          touchEndY = e.changedTouches[ 0 ].clientY / canvas.clientHeight * -2 + 1;

        if ( Math.abs( touchStartX - touchEndX ) < 0.25 && Math.abs( touchStartY - touchEndY ) < 0.25 )
          ( player.isAiming ) ? act( 'shoot' ) : act( 'move' );
        else if ( Math.abs( touchStartX - touchEndX ) > 0.25 && Math.abs( touchStartY - touchEndY ) < 0.25 ) {

          if ( touchStartX - touchEndX < 0 && !player.isAiming ) act( 'turn', 'left' );
          else if ( !player.isAiming ) act( 'turn', 'right' );

        } else if ( Math.abs( touchStartX - touchEndX ) < 0.25 && Math.abs( touchStartY - touchEndY ) > 0.25 ) {

          if ( touchStartY - touchEndY < 0 ) {

            // nesting avoids transition
            if ( !player.isAiming ) act( 'transition' );

          } else ( player.isAiming ) ? act( 'transition' ) : act( 'turn', 'around' );

        }

      }

    };

    window.ontouchmove = ( e ) => {

      if ( !vr && Date.now() - timeThen > 250 ) {

        const x = e.changedTouches[ 0 ].clientX / canvas.clientWidth * 2 - 1,
          y = e.changedTouches[ 0 ].clientY / canvas.clientHeight * -2 + 1;

        gun.rotation.set( -y, x, 0 );

        if ( !player.isAiming ) {

          if ( x < -0.5 ) act( 'look', 'right' );
          else if ( x > 0.5 ) act( 'look', 'left' );
          else act( 'look', 'center' );

        }

      }

    };

    window.onmousedown = ( e ) => {

      if ( !vr ) {

        if ( player.isAiming ) act( 'shoot' );
        else {

          if ( e.clientX < canvas.clientWidth / 4 ) act( 'turn', 'left' );
          else if ( e.clientX > canvas.clientWidth * 3 / 4 ) act( 'turn', 'right' );
          else {

            if ( e.clientY < canvas.clientHeight * 3 / 4 ) act( 'move' );
            else act( 'turn', 'around' );

          }

        }

      }

    };

    window.onkeydown = ( e ) => {

      switch ( e.code ) {

        case 'ArrowLeft':

          // fallthrough

        case 'KeyA':

          if ( !player.isAiming ) act( 'turn', 'left' );

          break;

        case 'ArrowRight':

          // fallthrough

        case 'KeyD':

          if ( !player.isAiming ) act( 'turn', 'right' );

          break;

        case 'ArrowUp':

          // fallthrough

        case 'KeyW':

          if ( !player.isAiming ) act( 'move' );

          break;

        case 'ArrowDown':

          // fallthrough

        case 'KeyS':

          if ( !player.isAiming ) act( 'turn', 'around' );

          break;

        case 'KeyG':

          act( 'transition' );

          break;

      }

    };

    window.onmousemove = ( e ) => {

      const x = ( e.clientX / canvas.clientWidth ) * 2 - 1,
        y = ( e.clientY / canvas.clientHeight ) * -2 + 1;

      gun.rotation.set( y + 0.25, -x, 0 );

      if ( !player.isAiming ) {

        if ( x < -0.75 ) act( 'look', 'left' );
        else if ( x > 0.75 ) act( 'look', 'right' );
        else if ( x > -0.5 && x < 0.5 ) act( 'look', 'center' );

      }

    };

    if ( vr ) {

      document.body.appendChild( VRButton.createButton( renderer ) );

      const controller = renderer.vr.getController( 0 );
      controller.add( gun );
      player.add( controller );

      controller.addEventListener( 'select', () => {

        if ( player.isAiming ) act( 'shoot' );
        else {

          if ( controller.rotation.x > 0.75 ) act( 'turn', 'around' );
          else {

            if ( controller.rotation.y < -0.5 ) act( 'turn', 'right' );
            else if ( controller.rotation.y > 0.5 ) act( 'turn', 'left' );
            else act( 'move' );

          }

        }

      } );

    }

  } )();

} )();

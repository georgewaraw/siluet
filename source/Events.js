// button: Lib, canvas: Obj, vr: Bool, renderer: Obj, user: Obj, cameras: Arr(2xObj), light: Obj, act: Fun
export default ( () => {

  let events;

  return ( button, canvas, vr, renderer, user, cameras, light, act ) => events = ( !button ) ? events : ( () => {

    canvas.ontouchstart = ( e ) => e.preventDefault();

    window.ontouchforcechange = ( e ) => {

      if ( e.changedTouches[ 0 ].force > 0.5 ) window.location.reload();

    };

    window.onorientationchange = () => window.location.reload();

    window.onresize = () => {

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      cameras[ 0 ].aspect = canvas.clientWidth / canvas.clientHeight;
      cameras[ 0 ].updateProjectionMatrix();

      cameras[ 1 ].aspect = canvas.clientWidth / canvas.clientHeight;
      cameras[ 1 ].updateProjectionMatrix();

      renderer.setSize( canvas.clientWidth, canvas.clientHeight );

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

        if ( Math.abs( touchStartX - touchEndX ) < 0.25 && Math.abs( touchStartY - touchEndY ) < 0.25 ) act( 'MOVE' );
        else if ( Math.abs( touchStartX - touchEndX ) > 0.25 && Math.abs( touchStartY - touchEndY ) < 0.25 ) {

          if ( touchStartX - touchEndX < 0 ) act( 'TURN', 'RIGHT' );
          else act( 'TURN', 'LEFT' );

        } else if ( Math.abs( touchStartX - touchEndX ) < 0.25 && Math.abs( touchStartY - touchEndY ) > 0.25 ) {

          if ( touchStartY - touchEndY < 0 ); // swipe up
          else act( 'TURN', 'AROUND' );

        }

      }

    };

    window.ontouchmove = ( e ) => {

      if ( !vr && Date.now() - timeThen > 250 ) {

        const x = e.changedTouches[ 0 ].clientX / canvas.clientWidth * -2 + 1,
          y = e.changedTouches[ 0 ].clientY / canvas.clientHeight * -2 + 1;

        if ( x < -0.5 ) act( 'LOOK', 'RIGHT' );
        else if ( x > 0.5 ) act( 'LOOK', 'LEFT' );
        else act( 'LOOK', 'CENTER' );

        light.rotation.set( y, x, 0 );

      }

    };

    window.onmousedown = ( e ) => {

      if ( !vr ) {

        if ( e.clientX < canvas.clientWidth / 4 ) act( 'TURN', 'LEFT' );
        else if ( e.clientX > canvas.clientWidth * 3 / 4 ) act( 'TURN', 'RIGHT' );
        else {

          if ( e.clientY < canvas.clientHeight * 3 / 4 ) act( 'MOVE' );
          else act( 'TURN', 'AROUND' );

        }

      }

    };

    window.onkeydown = ( e ) => {

      switch ( e.code ) {

        case 'ArrowLeft':

          // fallthrough

        case 'KeyA':

          act( 'TURN', 'LEFT' );

          break;

        case 'ArrowRight':

          // fallthrough

        case 'KeyD':

          act( 'TURN', 'RIGHT' );

          break;

        case 'ArrowUp':

          // fallthrough

        case 'KeyW':

          act( 'MOVE' );

          break;

        case 'ArrowDown':

          // fallthrough

        case 'KeyS':

          act( 'TURN', 'AROUND' );

          break;

      }

    };

    window.onmousemove = ( e ) => {

      const x = ( e.clientX / canvas.clientWidth ) * 2 - 1,
        y = ( e.clientY / canvas.clientHeight ) * -2 + 1;

      if ( x < -0.75 ) act( 'LOOK', 'LEFT' );
      else if ( x > 0.75 ) act( 'LOOK', 'RIGHT' );
      else if ( x > -0.5 && x < 0.5 ) act( 'LOOK', 'CENTER' );

      light.rotation.set( y + 0.25, -x, 0 );

    };

    if ( vr ) {

      document.body.appendChild( button.createButton( renderer ) );

      const controller = renderer.vr.getController( 0 );
      controller.add( light );
      user.add( controller );

      controller.addEventListener( 'select', () => {

        if ( controller.rotation.x > 0.75 ) act( 'TURN', 'AROUND' );
        else {

          if ( controller.rotation.y < -0.5 ) act( 'TURN', 'RIGHT' );
          else if ( controller.rotation.y > 0.5 ) act( 'TURN', 'LEFT' );
          else act( 'MOVE' );

        }

      } );

    }

  } )();

} )();

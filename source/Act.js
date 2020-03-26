export default ( () => {

  let act;

  return ( TWEEN, player, tiles, others, getRandomNumber, border, canvas ) => act = ( !TWEEN ) ? act : ( () => {

    let acting;

    const animate = ( object, destination, duration ) => {

      acting = true;

      new TWEEN.Tween( object )
        .to( destination, duration )
        .easing( TWEEN.Easing.Quadratic.Out )
        .on( 'complete', () => acting = false )
        .start();

    };

    // `.toFixed( 4 )` improves accuracy
    const look = ( destination, duration = 375 ) =>
      animate( player.rotation, { y: ( player.rotation.y + destination * Math.PI / 180 ).toFixed( 4 ) }, duration );

    const move = ( x, z, object, destination ) => tiles.map( ( e ) => {

      if ( x === e.x && z === e.z ) animate( object.position, destination, 375 );

    } );

    const traverse = ( object, direction ) => {

      switch ( direction ) {

        case 'north':

          move( object.position.x, object.position.z - 5, object, { z: object.position.z - 5 } );

          break;

        case 'east':

          move( object.position.x + 5, object.position.z, object, { x: object.position.x + 5 } );

          break;

        case 'south':

          move( object.position.x, object.position.z + 5, object, { z: object.position.z + 5 } );

          break;

        case 'west':

          move( object.position.x - 5, object.position.z, object, { x: object.position.x - 5 } );

          break;

      }

    };

    let looking = 'center',
      index = 0,
      directions = [ 'north', 'east', 'south', 'west' ];

    return ( action, direction ) => {

      if ( !acting ) {

        if ( action === 'look' ) {

          if ( direction === 'left' && looking === 'center' ) {

            looking = 'left';
            look( 30 );

          } else if ( direction === 'right' && looking === 'center' ) {

            looking = 'right';
            look( -30 );

          } else if ( direction === 'center' ) {

            if ( looking === 'left' ) {

              looking = 'center';
              look( -30 );

            } else if ( looking === 'right' ) {

              looking = 'center';
              look( 30 );

            }

          }

        } else if ( action === 'turn' ) {

          if ( direction === 'left' ) {

            index = ( index - 1 < 0 ) ? index + 3 : index - 1;
            look( 90 );

          } else if ( direction === 'right' ) {

            index = ( index + 1 > 3 ) ? index - 3 : index + 1;
            look( -90 );

          } else if ( direction === 'around' ) {

            index = ( index + 2 > 3 ) ? index - 2 : index + 2;
            look( -180, 500 );

          }

        } else if ( action === 'move' ) {

          traverse( player, directions[ index ] );
          if ( acting ) others.map( ( e ) => traverse( e, directions[ getRandomNumber( 0, 4 ) ] ) );

        } else if ( action === 'transition' ) {

          if ( border.position === 'down' ) {

            border.position = 'up';
            animate( border, { value: canvas.clientHeight * 14 / 15 }, 175 );

          } else if ( border.position === 'up' ) {

            border.position = 'down';
            animate( border, { value: canvas.clientHeight / 15 }, 175 );

          }

        }

      }

    };

  } )();

} )();

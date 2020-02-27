// three: Lib, tween: Lib, user: Obj, others: Arr(5xObj), tiles: Arr(NxObj), random: Fun
export default ( () => {

  let act;

  return ( three, tween, user, others, tiles, random ) => act = ( !three ) ? act : ( () => {

    let acting;

    // (o)bject, (t)o, (d)uration
    const animate = ( o, t, d ) => {

      acting = true;

      new tween.Tween( o )
        .to( t, d )
        .easing( tween.Easing.Quadratic.Out )
        .on( 'complete', () => acting = false )
        .start();

    };

    // (t)o, (d)uration
    // `.toFixed( 4 )` improves accuracy
    const look = ( t, d = 375 ) =>
      animate( user.rotation, { y: ( user.rotation.y + t * Math.PI / 180 ).toFixed( 4 ) }, d );

    // (x)-coordinate, (z)-coordinate, (o)bject, (t)o
    const move = ( x, z, o, t ) => tiles.map( ( e ) => {

      if ( x === e.x && z === e.z ) animate( o.position, t, 375 );

    } );

    // (o)bject, (d)irection
    const traverse = ( o, d ) => {

      switch ( d ) {

        case 'NORTH':

          move( o.position.x, o.position.z - 5, o, { z: o.position.z - 5 } );

          break;

        case 'EAST':

          move( o.position.x + 5, o.position.z, o, { x: o.position.x + 5 } );

          break;

        case 'SOUTH':

          move( o.position.x, o.position.z + 5, o, { z: o.position.z + 5 } );

          break;

        case 'WEST':

          move( o.position.x - 5, o.position.z, o, { x: o.position.x - 5 } );

          break;

      }

    };

    let looking = 'CENTER',
      index = 0,
      directions = [ 'NORTH', 'EAST', 'SOUTH', 'WEST' ];

    // (a)ction, (d)irection
    return ( a, d ) => {

      if ( !acting ) {

        if ( a === 'LOOK' ) {

          if ( d === 'LEFT' && looking === 'CENTER' ) {

            looking = 'LEFT';
            look( 30 );

          } else if ( d === 'RIGHT' && looking === 'CENTER' ) {

            looking = 'RIGHT';
            look( -30 );

          } else if ( d === 'CENTER' ) {

            if ( looking === 'LEFT' ) {

              looking = 'CENTER';
              look( -30 );

            } else if ( looking === 'RIGHT' ) {

              looking = 'CENTER';
              look( 30 );

            }

          }

        } else if ( a === 'TURN' ) {

          if ( d === 'LEFT' ) {

            index = ( index - 1 < 0 ) ? index + 3 : index - 1;
            look( 90 );

          } else if ( d === 'RIGHT' ) {

            index = ( index + 1 > 3 ) ? index - 3 : index + 1;
            look( -90 );

          } else if ( d === 'AROUND' ) {

            index = ( index + 2 > 3 ) ? index - 2 : index + 2;
            look( -180, 500 );

          }

        } else if ( a === 'MOVE' ) {

          traverse( user, directions[ index ] );
          if ( acting ) others.map( ( e ) => traverse( e, directions[ random( 0, 4 ) ] ) );

        }

      }

    };

  } )();

} )();

// three: Lib, tween: Lib, vr: Bool, canvas: Obj, renderer: Obj, scene: Obj, cameras: Arr(Obj, Obj),
//   shaders: Arr(NxObj), light: Obj, others: Arr(5xObj)
export default ( () => {

  let render;

  return ( three, tween, vr, canvas, renderer, scene, cameras, shaders, light, others ) =>
    render = ( !three ) ? render : ( () => {

    const	vector2 = new three.Vector2(),
      raycaster = new three.Raycaster();

    let vector31 = new three.Vector3(),
      vector32 = new three.Vector3(),
      border = canvas.clientHeight,
      count = 0,
      direction = 'DOWN';

    // (t)ime
    return ( t ) => {

      t /= 1000;

      tween.update();

      shaders.map( ( e ) => e.uniforms.uTime.value = t );

      if ( vr ) {

        renderer.render( scene, cameras[ 0 ] );

        raycaster.set( cameras[ 0 ].getWorldPosition( vector31 ), cameras[ 0 ].getWorldDirection( vector32 ) );

      } else {

        renderer.setScissor( 0, 0, canvas.clientWidth, border );
        renderer.render( scene, cameras[ 0 ] );
        renderer.setScissor( 0, border, canvas.clientWidth, canvas.clientHeight );
        renderer.render( scene, cameras[ 1 ].children[ 0 ] );

        if ( direction === 'DOWN' ) {

          border -= canvas.clientHeight / 500;
          if ( border < canvas.clientHeight - canvas.clientHeight / 5 )
            ( ++count % 2 ) ? direction = 'UP' : border = canvas.clientHeight;

        } else if ( direction === 'UP' ) {

          border += canvas.clientHeight / 500;
          if ( border > canvas.clientHeight ) direction = 'DOWN';

        }

        raycaster.setFromCamera( vector2.set( -light.rotation.y, light.rotation.x - 0.25 ), cameras[ 0 ] );

      }

      others.map( ( e ) =>
          ( raycaster.intersectObject( e )[ 0 ] ) ? ( e.material.opacity > 0 ) ? e.material.opacity -= 0.01 : void 0
                                                  : ( e.material.opacity < 1 ) ? e.material.opacity += 0.005 : void 0 );

    };

  } )();

} )();

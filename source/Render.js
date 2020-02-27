// three: Lib, tween: Lib, vr: Bool, canvas: Obj, renderer: Obj, scene: Obj, cameras: Arr(2xObj), shaders: Arr(NxObj),
//   light: Obj, others: Arr(5xObj)
export default ( () => {

  let render;

  return ( three, tween, vr, canvas, renderer, scene, cameras, shaders, light, others ) =>
    render = ( !three ) ? render : ( () => {

    const	vector2 = new three.Vector2(),
      raycaster = new three.Raycaster();

    let vector31 = new three.Vector3(),
      vector32 = new three.Vector3(),
      border = canvas.clientHeight,
      pass = 1;

    // (t)ime
    return ( t ) => {

      t /= 1000;

      tween.update();

      shaders.map( ( e ) => e.uniforms.uTime.value = t );

      if ( vr ) {

        renderer.render( scene, cameras[ 0 ] );

        raycaster.set( cameras[ 0 ].getWorldPosition( vector31 ), cameras[ 0 ].getWorldDirection( vector32 ) );

      } else {

        if ( pass % 2 ) {

          renderer.setScissor( 0, 0, canvas.clientWidth, border );
          renderer.render( scene, cameras[ 0 ] );
          renderer.setScissor( 0, border, canvas.clientWidth, canvas.clientHeight );
          renderer.render( scene, cameras[ 1 ] );

        } else {

          renderer.setScissor( 0, 0, canvas.clientWidth, border );
          renderer.render( scene, cameras[ 1 ] );
          renderer.setScissor( 0, border, canvas.clientWidth, canvas.clientHeight );
          renderer.render( scene, cameras[ 0 ] );

        }

        border -= canvas.clientHeight / 375;
        if ( border < 0 ) {

          border = canvas.clientHeight;
          pass++;

        }

        raycaster.setFromCamera( vector2.set( -light.rotation.y, light.rotation.x - 0.25 ), cameras[ 0 ] );

      }

      others.map( ( e ) => {

        const object = e.children[ 0 ];

        if ( raycaster.intersectObject( object )[ 0 ] ) {

          // nesting `if` avoids flickering
          if ( object.material.opacity > 0 ) object.material.opacity -= 0.01;

        } else if ( object.material.opacity < 1 ) object.material.opacity += 0.005;

      } );

    };

  } )();

} )();

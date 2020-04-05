export default ( () => {

  let render;

  return ( THREE, TWEEN, getShader, vr, gun, skulls, randomNumbers, renderer, canvas, border, scenes, camera ) =>
    render = ( !THREE ) ? render : ( () => {

    const	vector2 = new THREE.Vector2(),
      raycaster = new THREE.Raycaster();
    let vector3_1 = new THREE.Vector3(),
      vector3_2 = new THREE.Vector3();

    return ( time ) => {

      time /= 1000;

      TWEEN.update();

      getShader().map( ( e ) => e.uniforms.uTime.value = time );

      if ( vr ) raycaster.set( camera.getWorldPosition( vector3_1 ), camera.getWorldDirection( vector3_2 ) );
      else raycaster.setFromCamera( vector2.set( -gun.rotation.y, gun.rotation.x - 0.25 ), camera );

      skulls.map( ( e, i ) => {

        e.rotation.y = time / randomNumbers[ i ];

        const shader = getShader( `skull_${ i }_textured` );
        if ( shader ) {

          if ( raycaster.intersectObject( e )[ 0 ] ) {

            if ( shader.uniforms.uMorph.value < 100 ) shader.uniforms.uMorph.value += 1;

          } else if ( shader.uniforms.uMorph.value > 50 ) shader.uniforms.uMorph.value -= 1;

        }

      } );

      renderer.setScissor( 0, border.value, canvas.clientWidth, canvas.clientHeight );
      renderer.render( scenes[ 0 ], camera );
      renderer.setScissor( 0, 0, canvas.clientWidth, border.value );
      renderer.render( scenes[ 1 ], camera );

    };

  } )();

} )();

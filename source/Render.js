export default ( () => {

  let render;

  return ( THREE, TWEEN, audioAnalyser, getMappedNumber, getShader, vr, raycaster, gun, skulls, randomNumbers, renderer,
    canvas, border, scenes, camera ) => render = ( !THREE ) ? render : ( () => {

    const	vector2 = new THREE.Vector2();
    let amplitude,
      vector3_1 = new THREE.Vector3(),
      vector3_2 = new THREE.Vector3();

    return ( time ) => {

      time /= 1000;

      TWEEN.update();

      if ( audioAnalyser() ) amplitude = getMappedNumber( audioAnalyser().getAverageFrequency(), 0, 255, 0, 10 );
      if ( getShader( 'floor_textured' ) ) getShader( 'floor_textured' ).uniforms.uDistort.value = amplitude;

      getShader().map( ( e ) => e.uniforms.uTime.value = time );

      if ( vr ) raycaster.set( camera.getWorldPosition( vector3_1 ), camera.getWorldDirection( vector3_2 ) );
      else raycaster.setFromCamera( vector2.set( -gun.rotation.y, gun.rotation.x - 0.25 ), camera );

      skulls.map( ( e, i ) => {

        e[ 1 ].rotation.y += 0.01 / randomNumbers[ i ];

        const shader = getShader( `skull_${ i }_textured` );
        if ( shader ) {

          if ( raycaster.intersectObject( e[ 0 ] )[ 0 ] ) {

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

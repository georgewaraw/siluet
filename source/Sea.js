export default ( () => {

  let sea;

  return ( THREE, getRandomNumber, setShader, color, texture ) => sea = ( !THREE ) ? sea : ( () => {

    const geometry = new THREE.BufferGeometry().setFromPoints( [ ...Array( 7500 ) ].map( () =>
      new THREE.Vector3( getRandomNumber( -50, 51 ), getRandomNumber( -10, -6.5 ), getRandomNumber( -50, 51 ) ) ) );

    const values = { uTime: 0, uSpeed: 0.125, uMorph: 200, uDistort: 2.5 };
    const materials = [

      setShader( values, new THREE.PointsMaterial( { size: 5, transparent: true, opacity: 0.125, color } ),
        'sea_colored' ),
      setShader( values, new THREE.PointsMaterial( { size: 5, transparent: true, opacity: 0.125, map: texture } ),
        'sea_textured' )

    ];

    const objects = [

      new THREE.Points( geometry, materials[ 0 ] ),
      new THREE.Points( geometry, materials[ 1 ] )

    ];
    // +X: m\ W, +Z: m\ S
    // 16.66 = 50 * 1/3
    objects.map( ( e ) => e.position.set( 16.66, 0, 16.66 ) );

    return objects;

  } )();

} )();

export default ( () => {

  let sky;

  return ( THREE, getRandomNumber, setShader, color, texture, number ) => sky = ( !THREE ) ? sky : ( () => {

    const geometry = new THREE.BufferGeometry().setFromPoints( [ ...Array( 15000 ) ].map( () => new THREE.Vector3(
      getRandomNumber( -100, 100 ), getRandomNumber( 12.5, 38.5 ), getRandomNumber( -100, 100 ) ) ) );

    const values = { uTime: 0, uSpeed: 0.125, uMorph: 100, uDistort: 1.25 };
    const materials = [

      setShader( values, new THREE.PointsMaterial( { size: 7.5, transparent: true, opacity: 0.125, color } ),
        'sky_colored' ),
      setShader( values, new THREE.PointsMaterial( { size: 7.5, transparent: true, opacity: 0.25, map: texture } ),
        'sky_textured' )

    ];

    const objects = [

      new THREE.Points( geometry, materials[ 0 ] ),
      new THREE.Points( geometry, materials[ 1 ] )

    ];
    // +X: m\ W, +Z: m\ S
    // 33.33 = 100 / 3
    objects.map( ( e ) => e.position.set( 33.33, 1, 33.33 ) );
    objects[ 0 ].renderOrder = number;

    return objects;

  } )();

} )();

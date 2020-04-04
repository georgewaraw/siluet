export default ( () => {

  let skulls;

  return ( THREE, geometry, setShader, getRandomNumber, color, texture, tiles ) =>
    skulls = ( !THREE ) ? skulls : [ ...Array( 5 ) ].map( ( _, i ) => {

    const geometries = [

      new THREE.EdgesGeometry( new THREE.SphereBufferGeometry( 1.125, 16, 16 ) ),
      new THREE.EdgesGeometry( geometry )

    ];
    geometries[ 1 ].rotateX( 270 * Math.PI / 180 );
    geometries[ 1 ].translate( 0, -2.5, 0 );

    const materials = [

      setShader(

        { uTime: 0, uSpeed: ( getRandomNumber( 0, 2 ) ? 0.0833 : 0.0625 ),
          uMorph: ( getRandomNumber( 0, 2 ) ? 1000 : 750 ), uDistort: 1.25 },
        new THREE.MeshBasicMaterial( { transparent: true, color } ),
        `skull_${ i }_colored`

      ),
      setShader(

        { uTime: 0, uSpeed: 0.25, uMorph: 10, uDistort: 0.1 },
        new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5, map: texture } ),
        `skull_${ i }_textured`

      )

    ];

    const objects = [

      new THREE.LineSegments( geometries[ 0 ], materials[ 0 ] ),
      new THREE.Mesh( geometries[ 1 ], materials[ 1 ] )

    ];
    const index = getRandomNumber( 0, tiles.length );
    objects.map( ( e ) => e.position.set( tiles[ index ].x, 0, tiles[ index ].z ) );
    tiles.splice( index, 1 );

    return objects;

  } );

} )();

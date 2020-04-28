export default ( () => {

  let gun;

  return ( THREE, setShader, textures ) => gun = ( !THREE ) ? gun : ( () => {

    const geometries = [

      new THREE.BoxBufferGeometry( 0.2, 0.4, 0.8 ),
      new THREE.BoxBufferGeometry( 0.175, 0.2, 0.175 )

    ];

    const materials = [

      setShader( { uTime: 0, uSpeed: 0.25, uMorph: 7.5, uDistort: 0.025 },
        new THREE.MeshBasicMaterial( { transparent: false, opacity: 0.5, map: textures[ 0 ] } ), 'gun_top' ),
      setShader( { uTime: 0, uSpeed: 0.375, uMorph: 5, uDistort: 0.01 },
        new THREE.MeshBasicMaterial( { transparent: false, opacity: 0.5, map: textures[ 1 ] } ), 'gun_bottom' )

    ];

    const object = new THREE.Group();
    object.position.set( 0, -0.75, -3 );
    object.add( new THREE.Mesh( geometries[ 0 ], materials[ 0 ] ) );
    object.add( new THREE.Mesh( geometries[ 1 ], materials[ 1 ] ) );
    object.children[ 1 ].position.set( 0, -0.3, 0.3 );

    return object;

  } )();

} )();

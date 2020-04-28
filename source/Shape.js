export default ( () => {

  let shape;

  return ( THREE, tiles, setShader, color, texture, number ) => shape = ( !THREE ) ? shape : ( () => {

    const geometry = tiles.reduce( ( a, e ) => {

      const geometry = new THREE.BoxGeometry( 5, 5, 10 );
      geometry.rotateX( 270 * Math.PI / 180 );
      geometry.translate( e.x, 2.5, e.z );
      a.merge( geometry );

      return a;

    }, new THREE.Geometry() );

    const values = { uTime: 0, uSpeed: 0.375, uMorph: 50, uDistort: 10 };
    const materials = [

      setShader( values, new THREE.MeshBasicMaterial( { color } ), 'shape_colored' ),
      setShader( values, new THREE.MeshBasicMaterial( {
        depthWrite: false, transparent: true, opacity: 0.5, map: texture } ), 'shape_textured' )

    ];

    const objects = [

      new THREE.LineSegments( new THREE.EdgesGeometry( geometry ), materials[ 0 ] ),
      new THREE.Mesh( geometry, materials[ 1 ] )

    ];
    // avoid artifacts when looking through
    objects[ 1 ].renderOrder = number;

    return objects;

  } )();

} )();

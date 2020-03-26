export default ( () => {

  let skull;

  return ( THREE, setShader, texture, geometry ) => skull = ( !THREE ) ? skull : ( () => {

    const material = setShader( { uTime: 0, uSpeed: 0.25, uMorph: 10, uDistort: 0.1 },
      new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5, map: texture } ), 'skull' );

    const object = new THREE.Mesh( new THREE.EdgesGeometry( geometry ), material );
    object.rotation.set( 270 * Math.PI / 180, 0, 0 );
    object.position.set( 10, -2.5, 0 );

    return object;

  } )();

} )();

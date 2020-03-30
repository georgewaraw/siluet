export default ( () => {

  let ammo;

  return ( THREE, font, setShader, color ) => ammo = ( !THREE ) ? ammo : ( () => {

    const geometries = '!一二三四五六七八九'.split( '' ).map( ( e ) =>
      new THREE.TextBufferGeometry( e, { font, size: 0.1, height: 0.01 } ) );

    const material = setShader( { uTime: 0, uSpeed: 0.25, uMorph: 7.5, uDistort: 0.01 },
      new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5, color } ), 'ammo' );

    const objects = geometries.map( ( e ) => new THREE.Mesh( e, material ) );
    objects.map( ( e ) => e.position.set( 0.15, 0.25, -0.4 ) );

    return objects;

  } )();

} )();

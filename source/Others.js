export default ( () => {

  let others;

  return ( THREE, setShader, getRandomNumber, color, tiles ) =>
    others = ( !THREE ) ? others : [ ...Array( 5 ) ].map( ( _, i ) => {

    const geometry = new THREE.SphereBufferGeometry( 1.125, 16, 16 );

    const material = setShader(

      { uTime: 0, uSpeed: ( getRandomNumber( 0, 2 ) ? 0.0833 : 0.0625 ),
        uMorph: ( getRandomNumber( 0, 2 ) ? 1000 : 750 ), uDistort: 1.25 },
      new THREE.MeshBasicMaterial( { transparent: true, color } ),
      `other_${ i }`

    );

    const object = new THREE.LineSegments( new THREE.EdgesGeometry( geometry ), material );
    const index = getRandomNumber( 0, tiles.length );
    object.position.set( tiles[ index ].x, 0, tiles[ index ].z );
    tiles.splice( index, 1 );

    return object;

  } );

} )();

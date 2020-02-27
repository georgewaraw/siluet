export default Object.freeze( {

  // (t)hree: Lib, (c)olor: Str
  text: ( () => {

    let text;

    return ( t, c ) => text = ( !t ) ? text : new t.MeshLambertMaterial( { color: c } );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  floor: ( () => {

    let floor;

    return ( t, c ) => floor = ( !t ) ? floor
      : new t.MeshLambertMaterial( { transparent: true, opacity: 0.5, color: c } );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  room: ( () => {

    let room;

    return ( t, c ) => room = ( !t ) ? room
      : new t.MeshLambertMaterial( { depthWrite: false, transparent: true, opacity: 0.5, color: c } );

  } )(),

  // (t)hree: Lib
  poles: ( () => {

    let poles;

    return ( t ) => poles = ( !t ) ? poles :
      new t.MeshLambertMaterial( { side: t.DoubleSide, transparent: true, opacity: 0.5, vertexColors: t.FaceColors } );

  } )(),

  // (t)hree: Lib
  others: ( () => {

    let others;

    return ( t ) => others = ( !t ) ? others : [ ...Array( 5 ) ].map( () =>
      new t.MeshLambertMaterial( { depthWrite: false, transparent: true, opacity: 0.5, vertexColors: t.FaceColors } ) );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  water: ( () => {

    let water;

    return ( t, c ) => water = ( !t ) ? water
      : new t.PointsMaterial( { size: 5, transparent: true, opacity: 0.125, color: c } );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  sky: ( () => {

    let sky;

    return ( t, c ) => sky = ( !t ) ? sky
      : new t.PointsMaterial( { size: 7.5, transparent: true, opacity: 0.125, color: c } );

  } )()

} );

export default Object.freeze( {

  // (t)hree: Lib, (c)olor: Str
  ambient: ( () => {

    let ambient;

    return ( t, c ) => ambient = ( !t ) ? ambient : new t.AmbientLight( c, 2 );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  point: ( () => {

    let point;

    return ( t, c ) => point = ( !t ) ? point : new t.PointLight( c, 0.5, 20, 2 );

  } )(),

  // (t)hree: Lib, (c)olor: Str
  spot: ( () => {

    let spot;

    return ( t, c ) => spot = ( !t ) ? spot : ( () => {

      const light = new t.SpotLight( c, 1, 0, Math.PI / 16, 0, 2 );
      light.castShadow = true;
      light.shadow.mapSize = new t.Vector2( 32, 32 );
      light.target.position.set( 0, 0, -4 );
      const spot = new t.Object3D();
      spot.add( light );
      spot.add( light.target );

      return spot;

    } )();

  } )()

} );

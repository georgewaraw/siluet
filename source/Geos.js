export default Object.freeze( {

  // (t)hree: Lib, (f)ont: Obj
  text: ( () => {

    let text;

    return ( t, f ) => text = ( !t ) ? text
      : new t.TextBufferGeometry( 'СИЛУЭТ', { font: f, size: 0.1, height: 0.01 } );

  } )(),

  // (t)hree: Lib, tile (l)ocations: Arr(NxObj(2xNum)), (c)olor: Fun
  floor: ( () => {

    let floor;

    return ( t, l, c ) => floor = ( !t ) ? floor : ( () => {

      const floor = l.reduce( ( a, e ) => {

        const geometry = new t.PlaneGeometry( 5, 5 );
        geometry.rotateX( 270 * Math.PI / 180 );
        geometry.translate( e.x, -2.5, e.z );
        a.merge( geometry );

        return a;

      }, new t.Geometry() );
      floor.faces.map( ( e ) => e.color = new t.Color( c() ) );

      return floor;

    } )();

  } )(),

  // (t)hree: Lib, tile (l)ocations: Arr(NxObj(2xNum)), (c)olor: Fun
  poles: ( () => {

    let poles;

    return ( t, l, c ) => poles = ( !t ) ? poles : ( () => {

      const poles = l.reduce( ( a, e ) => {

        const geometry = new t.CylinderGeometry( 1.125, 1.125, 50, 16, 16 );
        geometry.translate( e.x, -2.5, e.z );
        a.merge( geometry );

        return a;

      }, new t.Geometry() );
      poles.faces.map( ( e ) => e.color = new t.Color( c() ) );

      return poles;

    } )();

  } )(),

  // (t)hree: Lib, (c)olor: Fun
  others: ( () => {

    let others;

    return ( t, c ) => others = ( !t ) ? others : [ ...Array( 5 ) ].map( () => {

      const geometry = new t.SphereGeometry( 1.125, 16, 16 );
      geometry.faces.map( ( e ) => e.color = new t.Color( c() ) );

      return geometry;

    } );

  } )(),

  // (t)hree: Lib, (r)andom: Fun
  water: ( () => {

    let water;

    return ( t, r ) => water = ( !t ) ? water : new t.BufferGeometry().setFromPoints( [ ...Array( 7500 ) ].map( () =>
      new t.Vector3( r( -50, 51 ), r( -10, -6.5 ), r( -50, 51 ) ) ) );

  } )(),

  // (t)hree: Lib, (r)andom: Fun
  sky: ( () => {

    let sky;

    return ( t, r ) => sky = ( !t ) ? sky : new t.BufferGeometry().setFromPoints( [ ...Array( 15000 ) ].map( () =>
      new t.Vector3( r( -50, 51 ), r( 12.5, 38.5 ), r( -50, 51 ) ) ) );

  } )()

} );

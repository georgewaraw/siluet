export default Object.freeze( {

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  text: ( () => {

    let text;

    return ( t, g, m ) => text = ( !t ) ? text : ( () => {

      const mesh = new t.Mesh( g, m );
      mesh.position.set( -0.25, 0, -1 );

      return mesh;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  floor: ( () => {

    let floor;

    return ( t, g, m ) => floor = ( !t ) ? floor : ( () => {

      const group = new t.Group();
      // avoid flickering
      group.renderOrder = Number.MAX_VALUE;
      group.add( new t.LineSegments( new t.EdgesGeometry( g ), m ) );
      const mesh = new t.Mesh( g, m );
      mesh.receiveShadow = true;
      group.add( mesh );

      return group;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  poles: ( () => {

    let poles;

    return ( t, g, m ) => poles = ( !t ) ? poles : ( () => {

      const group = new t.Group();
      group.add( new t.LineSegments( new t.EdgesGeometry( g ), m ) );
      const mesh = new t.Mesh( g, m );
      mesh.receiveShadow = true;
      group.add( mesh );

      return group;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Arr(5xObj), (m)aterial: Obj, tile (l)ocations: Arr(NxObj(2xNum)), (r)andom: Fun
  others: ( () => {

    let others;

    return ( t, g, m, l, r ) => others = ( !t ) ? others : ( () => {

      const locations = [ ...l ];
      let order = Number.MAX_VALUE;

      return [ ...Array( 5 ) ].map( ( _, i ) => {

        const group = new t.Group();
        const index = r( 0, locations.length );
        group.position.set( locations[ index ].x, 0, locations[ index ].z );
        locations.splice( index, 1 );
        // avoid artifacts when looking through
        group.renderOrder = --order;
        group.add( new t.LineSegments( new t.EdgesGeometry( g[ i ] ), m[ i ] ) );
        const mesh = new t.Mesh( g[ i ], m[ i ] );
        mesh.castShadow = true;
        group.add( mesh );

        return group;

      } );

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  water: ( () => {

    let water;

    return ( t, g, m ) => water = ( !t ) ? water : ( () => {

      const mesh = new t.Points( g, m );
      // X: m\ W, Z: m\ S
      // 16.66 = 50 * 1/3
      mesh.position.set( 16.66, 0, 16.66 );

      return mesh;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  sky: ( () => {

    let sky;

    return ( t, g, m ) => sky = ( !t ) ? sky : ( () => {

      const mesh = new t.Points( g, m );
      mesh.position.set( 16.66, 0, 16.66 );

      return mesh;

    } )();

  } )()

} );

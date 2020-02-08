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

      const mesh = new t.Mesh( g, m );
      mesh.receiveShadow = true;

      return mesh;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  poles: ( () => {

    let poles;

    return ( t, g, m ) => poles = ( !t ) ? poles : ( () => {

      const mesh = new t.Mesh( g, m );
      mesh.receiveShadow = true;

      return mesh;

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Arr(5xObj), (m)aterial: Obj, tile (l)ocations: Arr(NxObj(2xNum)), (r)andom: Fun
  others: ( () => {

    let others;

    return ( t, g, m, l, r ) => others = ( !t ) ? others : ( () => {

      const locations = [ ...l ];

      return [ ...Array( 5 ) ].map( ( _, i ) => {

        const mesh = new t.Mesh( g[ i ], m[ i ] );
        mesh.castShadow = true;
        const index = r( 0, locations.length );
        mesh.position.set( locations[ index ].x, 0, locations[ index ].z );
        locations.splice( index, 1 );

        return mesh;

      } );

    } )();

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  water: ( () => {

    let water;

    return ( t, g, m ) => water = ( !t ) ? water : new t.Points( g, m );

  } )(),

  // (t)hree: Lib, (g)eometry: Obj, (m)aterial: Obj
  sky: ( () => {

    let sky;

    return ( t, g, m ) => sky = ( !t ) ? sky : new t.Points( g, m );

  } )()

} );

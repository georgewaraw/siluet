export default Object.freeze( {

  // (t)hree: Lib, (c)anvas: Obj, (v)r support: Bool
  renderer: ( () => {

    let renderer;

    return ( t, c, v ) => renderer = ( !t ) ? renderer : ( () => {

      const renderer = new t.WebGLRenderer( { canvas: c } );
      renderer.setPixelRatio( 0.2 );
      renderer.setSize( c.clientWidth, c.clientHeight );
      renderer.physicallyCorrectLights = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = t.PCFSoftShadowMap;
      ( v ) ? renderer.vr.enabled = true : renderer.setScissorTest( true );

      return renderer;

    } )();

  } )(),

  // (t)hree: Lib, (c)olor: Str
  scene: ( () => {

    let scene;

    return ( t, c ) => scene = ( !t ) ? scene : ( () => {

      const scene = new t.Scene();
      scene.background = new t.Color( c );
      scene.fog = new t.FogExp2( c, 0.05 );

      return scene;

    } )();

  } )(),

  // (t)hree: Lib
  user: ( () => {

    let user;

    return ( t ) => user = ( !t ) ? user : new t.Group();

  } )(),

  // (t)hree: Lib, (c)anvas: Obj
  cameras: ( () => {

    let cameras;

    return ( t, c ) => cameras = ( !t ) ? cameras : ( () => {

      const cameras = [

        new t.PerspectiveCamera( 60, c.clientWidth / c.clientHeight, 0.1, 1000 ),
        new t.PerspectiveCamera( 60, c.clientWidth / c.clientHeight, 0.1, 1000 )

      ];
      cameras[ 1 ].position.set( 0.5, 0, 0 );

      return cameras;

    } )();

  } )()

} );

export default Object.freeze( {

  renderer: ( () => {

    let renderer;

    return ( THREE, canvas, vr ) => renderer = ( !THREE ) ? renderer : ( () => {

      const renderer = new THREE.WebGLRenderer( { canvas } );
      renderer.setPixelRatio( 0.15 );
      renderer.setSize( canvas.clientWidth, canvas.clientHeight );
      renderer.setScissorTest( true );
      if ( vr ) renderer.vr.enabled = true;

      return renderer;

    } )();

  } )(),

  scenes: ( () => {

    let scenes;

    return ( THREE, color ) => scenes = ( !THREE ) ? scenes : [ ...Array( 2 ) ].map( () => {

      const scene = new THREE.Scene();
      scene.background = new THREE.Color( color );
      scene.fog = new THREE.FogExp2( color, 0.05 );

      return scene;

    } );

  } )(),

  player: ( () => {

    let player;

    return ( THREE ) => player = ( !THREE ) ? player : ( () => {

      const player = new THREE.Group();
      player.isAiming = false;

      return player;

    } )();

  } )(),

  camera: ( () => {

    let camera;

    return ( THREE, canvas ) => camera = ( !THREE ) ? camera :
      new THREE.PerspectiveCamera( 60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );

  } )(),

  raycaster: ( () => {

    let raycaster;

    return ( THREE ) => raycaster = ( !THREE ) ? raycaster : new THREE.Raycaster();

  } )(),

  border: ( () => {

    let border;

    return ( position, value ) => border = ( !position ) ? border : { position, value };

  } )()

} );

export default Object.freeze({
  renderer: (() => {
    let renderer;

    return (THREE, canvas) => renderer = (!THREE) ? renderer : (() => {
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setPixelRatio(0.15);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setScissorTest(true);

      return renderer;
    })();
  })(),
  scenes: (() => {
    let scenes;

    return (THREE, color) => scenes = (!THREE) ? scenes : [...Array(2)].map(() => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(color);
      scene.fog = new THREE.FogExp2(color, 0.05);

      return scene;
    });
  })(),
  cameras: (() => {
    let cameras;

    return (THREE, canvas, player) => cameras = (!THREE) ? cameras : [...Array(2)].map((_, i) => {
      const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
      if (!i) {
        camera.rotation.set(270*Math.PI/180, 0, 0);
        camera.position.set(player.position.x, 20, player.position.z);
      }

      return camera;
    });
  })(),

  player: (() => {
    let player;

    return (THREE, tile) => player = (!THREE) ? player : (() => {
      const player = new THREE.Group();
      player.position.set(tile.x, 0, tile.z);
      player.isAiming = false;

      return player;
    })();
  })(),

  raycaster: (() => {
    let raycaster;

    return (THREE) => raycaster = (!THREE) ? raycaster : new THREE.Raycaster();
  })(),

  border: (() => {
    let border;

    return (position, value) => border = (!position) ? border : { position, value };
  })(),

  listener: (() => {
    let listener;

    return (THREE, camera) => listener = (!THREE) ? listener : (() => {
      const listener = new THREE.AudioListener();
      camera.add(listener);

      return listener;
    })();
  })(),
  audioAnalyser: (() => {
    let audioAnalyser;

    return (THREE, sound) => audioAnalyser = (!THREE) ? audioAnalyser : new THREE.AudioAnalyser(sound);
  })()
});

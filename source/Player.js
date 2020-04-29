export default (() => {
  let player;

  return (THREE, setShader, color) => player = (!THREE) ? player : (() => {
    const geometry = new THREE.PlaneBufferGeometry(3, 3);

    const material = setShader(
      { uTime: 0, uSpeed: 0.25, uMorph: 12.5, uDistort: 0.125 },
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, color }),
      'player'
    );

    const object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, -20);

    return object;
  })();
})();

export default (() => {
  let players;

  return (THREE, setShader, color, tile) => players = (!THREE) ? players : (() => {
    const geometry = new THREE.PlaneBufferGeometry(3, 3);

    const material = setShader(
      { uTime: 0, uSpeed: 0.25, uMorph: 12.5, uDistort: 0.125 },
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.75, color }),
      'players'
    );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(270*Math.PI/180, 0, 0);

    const objects = [
      new THREE.Group(),
      new THREE.Group()
    ];
    objects[0].add(mesh);
    objects.map((e) => e.position.set(tile.x, 0, tile.z));
    objects[1].isAiming = false;

    return objects;
  })();
})();

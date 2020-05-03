export default (() => {
  let end;

  return (THREE, font, setShader, color) => end = (!THREE) ? end : (() => {
    const geometry = new THREE.EdgesGeometry(new THREE.TextBufferGeometry('КОНЕЦ!', { font, size: 0.1, height: 0.01 }));

    const values = { uTime: 0, uSpeed: 0.375, uMorph: 0.125, uDistort: 0.025 };
    const materials = [
      setShader(values, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, color }), 'end_inner'),
      setShader(values, new THREE.MeshBasicMaterial({ color }), 'end_outer')
    ];

    const object = new THREE.Group();
    object.position.set(-0.25, 0, -1);
    object.add(new THREE.Mesh(geometry, materials[0]));
    object.add(new THREE.LineSegments(geometry, materials[1]));

    return object;
  })();
})();

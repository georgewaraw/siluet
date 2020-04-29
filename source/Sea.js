export default (() => {
  let sea;

  return (THREE, getRandomNumber, size, setShader, color, texture) => sea = (!THREE) ? sea : (() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([...Array(15000)].map(() =>
      new THREE.Vector3(getRandomNumber(-size, size), getRandomNumber(-10, -6.5), getRandomNumber(-size, size))));

    const values = { uTime: 0, uSpeed: 0.125, uMorph: 200, uDistort: 2.5 };
    const materials = [
      setShader(values, new THREE.PointsMaterial({ size: 5, transparent: true, opacity: 0.125, color }), 'sea_colored'),
      setShader(values, new THREE.PointsMaterial({ size: 5, transparent: true, opacity: 0.125, map: texture }),
        'sea_textured')
    ];

    const objects = [
      new THREE.Points(geometry, materials[0]),
      new THREE.Points(geometry, materials[1])
    ];
    // +X: m\ W, +Z: m\ S
    objects.map((e) => e.position.set(size/3, 0, size/3));

    return objects;
  })();
})();

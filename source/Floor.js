export default (() => {
  let floor;

  return (THREE, tiles, setShader, color, texture, number) => floor = (!THREE) ? floor : (() => {
    const geometry = tiles.reduce((a, e) => {
      const geometry = new THREE.PlaneGeometry(5, 5);
      geometry.rotateX(270*Math.PI/180);
      geometry.translate(e.x, -2.5, e.z);
      a.merge(geometry);

      return a;
    }, new THREE.Geometry());

    const values = { uTime: 0, uSpeed: 0.375, uMorph: 20, uDistort: 0 };
    const materials = [
      setShader(values, new THREE.MeshBasicMaterial({ color }), 'floor_colored'),
      setShader(values, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, map: texture }),
        'floor_textured')
    ];

    const objects = [
      new THREE.LineSegments(new THREE.EdgesGeometry(geometry), materials[0]),
      new THREE.Mesh(geometry, materials[1])
    ];
    // avoid flickering
    objects[1].renderOrder = number;

    return objects;
  })();
})();

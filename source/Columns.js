export default (() => {
  let columns;

  return (THREE, tiles, getRandomNumber, setShader, color, texture) => columns = (!THREE) ? columns : (() => {
    const geometry = tiles.reduce((a, e) => {
      const geometry = new THREE.CylinderGeometry(1.125, 1.125, 50, 16, 16);
      geometry.translate(e.x, -2.5, e.z);
      a.merge(geometry);

      return a;
    }, new THREE.Geometry());
    geometry.faces.map((e) => e.materialIndex = getRandomNumber(1, 3));

    const values = { uTime: 0, uSpeed: 0.375, uMorph: 10, uDistort: 1.25 };
    const materials = [
      setShader(values, new THREE.MeshBasicMaterial({ color }), 'columns_colored'),
      setShader(values, new THREE.MeshBasicMaterial({ transparent: false, opacity: 0.5, map: texture }),
        'columns_textured')
    ];

    const objects = [
      new THREE.LineSegments(new THREE.EdgesGeometry(geometry), materials[0]),
      new THREE.Mesh(geometry, materials)
    ];

    return objects;
  })();
})();

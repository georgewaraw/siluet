export default (() => {
  let render;

  return (THREE, TWEEN, audioAnalyser, getMappedNumber, getShader, raycaster, gun, enemies, randomNumbers, renderer,
    canvas, border, scenes, cameras) => render = (!THREE) ? render : (() => {
    const	vector2 = new THREE.Vector2();
    let analyser, amplitude;

    return (time) => {
      time /= 1000;

      TWEEN.update();

      getShader().map((e) => e.uniforms.uTime.value = time);
      if (analyser) {
        amplitude = analyser.getAverageFrequency();
        if (getShader('sea_textured')) getShader('sea_textured').uniforms.uDistort.value =
          getMappedNumber(amplitude, 0, 255, 2.5, 5);
        if (getShader('sea_textured')) getShader('sea_textured').uniforms.uDistort.value =
          getMappedNumber(amplitude, 0, 255, 1.25, 2.5);
        if (getShader('floor_textured')) getShader('floor_textured').uniforms.uDistort.value =
          getMappedNumber(amplitude, 0, 255, 0, 2);
        if (getShader('columns_textured')) getShader('columns_textured').uniforms.uDistort.value =
          getMappedNumber(amplitude, 0, 255, 1.25, 5);
        if (getShader('shape_textured')) getShader('shape_textured').uniforms.uDistort.value =
          getMappedNumber(amplitude, 0, 255, 10, 20);
      } else analyser = audioAnalyser();

      raycaster.setFromCamera(vector2.set(-gun.rotation.y, gun.rotation.x-0.25), cameras[1]);
      enemies.map((e, i) => {
        e[1].rotation.y += 0.01/randomNumbers[i];

        const shader = getShader(`enemy_${i}_textured`);
        if (shader) {
          if (raycaster.intersectObject(e[0])[0]) {
            if (shader.uniforms.uMorph.value < 100) shader.uniforms.uMorph.value += 1;
          } else if (shader.uniforms.uMorph.value > 50) shader.uniforms.uMorph.value -= 1;
        }
      });

      renderer.setScissor(0, border.value, canvas.clientWidth, canvas.clientHeight);
      renderer.render(scenes[0], cameras[0]);
      renderer.setScissor(0, 0, canvas.clientWidth, border.value);
      renderer.render(scenes[1], cameras[1]);
    };
  })();
})();

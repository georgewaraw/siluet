const uniforms = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uMorph;
  uniform float uDistort;
`,
  vertexShader = `
    vec3 transformed = position;

    transformed.x += sin((position.x + uTime * uSpeed) * 20.0) * 0.0015 * uMorph;
    transformed.y += sin((position.y + uTime * uSpeed) * 20.0) * 0.0015 * uMorph;
    transformed.z += sin((position.z + uTime * uSpeed) * 20.0) * 0.0015 * uMorph;

    if (uDistort > 0.0) {
      transformed.x += fract(sin(dot(position.x + uTime * uSpeed * 0.000000375, (12.9898, 78.233))) * 43758.5453123)
        * uDistort;
      transformed.y += fract(sin(dot(position.y + uTime * uSpeed * 0.000000375, (12.9898, 78.233))) * 43758.5453123)
        * uDistort;
      transformed.z += fract(sin(dot(position.z + uTime * uSpeed * 0.000000375, (12.9898, 78.233))) * 43758.5453123)
        * uDistort;
    }
  `,
  shaders = [];

const getShader = (name) => (name) ? shaders.filter((e) => e.name === name)[0] : shaders;

const setShader = (values, material, name) => {

  material.onBeforeCompile = (shader) => {

    Object.keys(values).map((e) => shader.uniforms[e] = { value: values[e] });
    shader.vertexShader = uniforms + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', vertexShader);
    shader.name = name;
    shaders.push(shader);
  };

  return material;
};

export {
  getShader,
  setShader
};

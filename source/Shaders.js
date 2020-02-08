// vertexShader: Str, uniforms: Str, values: Obj(4xNum), material: Obj
export default ( () => {

  const shaders = [];

  return ( vertexShader, uniforms, values, material ) => {

    if ( material ) {

      material.onBeforeCompile = ( s ) => {

        Object.keys( values ).map( ( e ) => s.uniforms[ e ] = { value: values[ e ] } );

        s.vertexShader = uniforms + s.vertexShader;
        s.vertexShader = s.vertexShader.replace( '#include <begin_vertex>', vertexShader );

        shaders.push( s );

      };

      return material;

    } else return shaders;

  };

} )();

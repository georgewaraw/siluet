export default Object.freeze( {

  CANVAS: document.querySelector( 'canvas' ),

  HUES: [ 330, 346 ],

  MAP: `

     FFFFFFF
    CFFFFFFFC
     FFFFFFF
    CFF S FFC
     FFS SFF
    CFF S FFC
     FFFFFFF
    CFFFFFFFC
     C C C C

  `,

  UNIFORMS: `

    uniform float uTime;
    uniform float uSpeed;
    uniform float uMorph;
    uniform float uDistort;

  `,

  VERTEX_SHADER: `

    vec3 transformed = position;

    transformed.x += sin( ( position.x + uTime * uSpeed ) * 20.0 ) * 0.0015 * uMorph;
    transformed.y += sin( ( position.y + uTime * uSpeed ) * 20.0 ) * 0.0015 * uMorph;
    transformed.z += sin( ( position.z + uTime * uSpeed ) * 20.0 ) * 0.0015 * uMorph;

    if ( uDistort > 0.0 ) {

      transformed.x += fract( sin( dot( position.x + uTime * uSpeed * 0.000000375, ( 12.9898, 78.233 ) ) )
        * 43758.5453123 ) * uDistort;
      transformed.y += fract( sin( dot( position.y + uTime * uSpeed * 0.000000375, ( 12.9898, 78.233 ) ) )
        * 43758.5453123 ) * uDistort;
      transformed.z += fract( sin( dot( position.z + uTime * uSpeed * 0.000000375, ( 12.9898, 78.233 ) ) )
        * 43758.5453123 ) * uDistort;

    }

  `

} );

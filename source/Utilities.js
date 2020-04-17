export default Object.freeze( {

  getNextNumber: ( () => {

    let number = Number.MAX_VALUE;

    // repeating the number doesn't always work with `number--`
    return ( repeat ) => ( repeat ) ? number : --number;

  } )(),

  getRandomNumber: ( from, to ) => Math.floor( Math.random() * ( to - from ) + from ),

  getMappedNumber: ( input, inputFrom, inputTo, outputFrom, outputTo ) =>
    ( input - inputFrom ) * ( outputTo - outputFrom ) / ( inputTo - inputFrom ) + outputFrom,

  getColor: ( () => {

    const cache = {};

    const color = ( brightness, hue ) => {

      if ( brightness === 'dark' ) return `hsl( ${ hue }, 5%, 12% )`;
      else if ( brightness === 'bright' ) return `hsl( ${ hue }, 5%, 50% )`;
      else return `hsl( ${ hue }, 5%, 25% )`;

    };

    return ( brightness, hue, random ) => {

      if ( random ) return color( brightness, hue );
      else {

        let bright = brightness;
        if ( bright !== 'dark' && bright !== 'bright' ) bright = 'normal';

        return cache[ bright ] = cache[ bright ] || color( bright, hue );

      }

    };

  } )(),

  getFont: ( () => {

    const cache = {};

    return ( THREE, name ) => new Promise( ( r ) =>
      cache[ name ] = cache[ name ] || new THREE.FontLoader().load( `./build/assets/${ name }.json`, r ) );

  } )(),

  getTexture: ( () => {

    const cache = {};

    return ( THREE, name, smooth ) => cache[ name + smooth ] = cache[ name + smooth ] || ( () => {

      const texture = new THREE.TextureLoader().load( `./build/assets/${ name }.jpg` );
      if ( !smooth ) {

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

      }

      return texture;

    } )();

  } )(),

  getSTL: ( () => {

    const cache = {};

    return ( STLLoader, name ) => new Promise( ( r ) =>
      cache[ name ] = cache[ name ] || new STLLoader().load( `./build/assets/${ name }.stl`, r ) );

  } )(),

  // return array of X and Z coordinates of tiles of size s where object o is located on map m
  getTiles: ( () => {

    const cache = {};

    return ( map, object, size = 5 ) => cache[ map + object + size ] = cache[ map + object + size ] || ( () => {

                       // return array of single-line strings from multi-line string
      const array = map.split( '\n' )
                       // return array without empty strings
                       .filter( ( e ) => e.length )
                       // remove trailing whitespace from strings and return array of arrays of characters
                       .map( ( e ) => e.trimEnd().split( '' ) );

      // get longest item in array
      const item = array.reduce( ( a, e ) => ( a.length < e.length ) ? e : a );

      // get length of leading whitespace in longest item
      const spaces = item.length - item.filter( ( e ) => e !== ' ' ).length;

                  // return arrays without leading whitespace
      return array.map( ( e ) => e.filter( ( e, i ) => e !== ' ' || i >= spaces ) )
                  // return array of X and Z coordinates
                  .map( ( e, iR ) => e.map( ( e, iC ) => ( object )
                    ? ( e === object )
                      ? { x: iC * size, z: iR * size }
                      : void 0
                    : { x: iC * size, z: iR * size } ) )
                  .flat()
                  // return array withut `undefined`s
                  .filter( ( e ) => e );

    } )();

  } )(),

  shader: ( () => {

    const shaders = [];

    return Object.freeze( {

      get: ( name ) => ( name ) ? shaders.filter( ( e ) => e.name === name )[ 0 ] : shaders,
      set: ( vertexShader, uniforms, values, material, name ) => {

        material.onBeforeCompile = ( shader ) => {

          Object.keys( values ).map( ( e ) => shader.uniforms[ e ] = { value: values[ e ] } );
          shader.vertexShader = uniforms + shader.vertexShader;
          shader.vertexShader = shader.vertexShader.replace( '#include <begin_vertex>', vertexShader );
          shader.name = name;

          shaders.push( shader );

        };

        return material;

      }

    } );

  } )(),

  playSound: ( () => {

    const cache = {};

    return ( name, THREE, listener, loop ) => {

      if ( cache[ name ] ) {

        if ( !cache[ name ].isPlaying ) cache[ name ].play();

      } else {

        cache[ name ] = new THREE.Audio( listener );
        new THREE.AudioLoader().load( `./build/assets/${ name }.mp3`, ( b ) => {

          cache[ name ].setBuffer( b );
          if ( loop ) cache[ name ].setLoop( true );
          cache[ name ].play();

        } );

      }

    };

  } )()

} );

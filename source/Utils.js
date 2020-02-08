export default Object.freeze( {

  // return random number in range a[0]..a[1] (non-inclusive)
  // a[0]: Arr(Num, Num) OR a[0]: Num, a[1]: Num
  random: ( ...a ) => Array.isArray( a[ 0 ] )
                        ? Math.floor( Math.random() * ( a[ 0 ][ 1 ] - a[ 0 ][ 0 ] ) + a[ 0 ][ 0 ] )
                        : Math.floor( Math.random() * ( a[ 1 ] - a[ 0 ] ) + a[ 0 ] ),

  // return number i in range iF..iT mapped to range oF..oT (both ranges non-inclusive)
  // (i)nput: Num, (i)nput(F)rom: Num, (i)nput(T)o: Num, (o)utput(F)rom: Num, (o)utput(T)o: Num
  map: ( i, iF, iT, oF, oT ) => ( i - iF ) * ( oT - oF ) / ( iT - iF ) + oF,

  // return HSL color string (random or fixed)
  // (b)rightness: Str, (h)ue: Num, (r)andom: Bool
  color: ( () => {

    const cache = {};

    const color = ( b, h ) => ( b === 'dark' ) ? `hsl( ${ h }, 10%, 10% )`
                                               : ( b === 'bright' ) ? `hsl( ${ h }, 75%, 75% )`
                                                                    : `hsl( ${ h }, 50%, 50% )`;

    return ( b, h, r ) => ( r ) ? color( b, h )
                                // cache single instances of dark, bright, and normal colors
                                : cache[ b = ( b === 'dark' || b === 'bright' ) ? b : 'normal' ] = cache[ b ] ||
                                  color( b, h );

  } )(),

  // return promise for font n
  // (t)hree: Lib, (n)ame: Str
  text: ( () => {

    const cache = {};

    return ( t, n ) => new Promise( ( r ) => cache[ n ] = cache[ n ] ||
                         new t.FontLoader().load( `/build/assets/${ n }.json`, r ) );

  } )(),

  // return array of X and Z coordinates of tiles of size s where object o is located on map m
  // (m)ap: Str, (o)bject: Str, tile (s)ize: Num
  locations: ( () => {

    const cache = {};

    return ( m, o, s = 5 ) => cache[ m + o + s ] = cache[ m + o + s ] || ( () => {

                     // return array of single-line strings from multi-line string
      const array = m.split( '\n' )
                     // return array without empty strings
                     .filter( ( e ) => e.length )
                     // remove trailing whitespace from strings and return array of arrays of characters
                     .map( ( e ) => e.trimEnd().split( '' ) );

      // get longest item in array
      const item = array.reduce( ( a, e ) => ( a.length < e.length ) ? e : a );

      // find leading whitespace length in longest item
      const spaces = item.length - item.filter( ( e ) => e !== ' ' ).length;

                  // remove leading whitespace from arrays
      return array.map( ( e ) => e.filter( ( e, i ) => e !== ' ' || i >= spaces ) )
                  // return array of X and Z coordinates
                  .map( ( e, iR ) => e.map( ( e, iC ) => ( o ) ? ( e === o ) ? { x: iC * s, z: iR * s } : void 0
                                                               : { x: iC * s, z: iR * s } ) )
                  .flat()
                  // return array withut `undefined`s
                  .filter( ( e ) => e );

    } )();

  } )()

} );

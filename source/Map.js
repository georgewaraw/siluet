const size = 100;

/*
  C: column
  S: shape
  F: floor
  E: possible enemy spawn point
  P: player spawn point

  F, E, and P locations are traversable
*/
const cache = {},
  map = `
    CCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCC
    CCCCECECECECCCC
    CCCEEEEEEEEECCC
    CCCCFFFCFFFCCCC
    CCCFFFFFFFFFCCC

    CCCCFP S FFCCCC
    CCCFFFS SFFFCCC
    CCCCEE S EECCCC

    CCCEEEEEEEEECCC
    CCCCEEECEEECCCC
    CCCEEEEEEEEECCC
    CCCCECECECECCCC
    CCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCC
  `,
  tile = 5;
const getLocations = (object='all') => cache[object] = cache[object] || map
  .split('\n') // turn multi-line string into array of strings
  .filter((e) => e.length) // remove empty strings
  .map((e, iR) => e
    .split('') // turn strings into arrays of characters
    .map((e, iC) => (object === 'all')
      ? { // return array of arrays with all possible X and Z coordinates
          x: iC*tile,
          z: iR*tile
        }
      : (e === object) // ...or just the specified object's coordinates
          ? {
              x: iC*tile,
              z: iR*tile
            }
          : void 0
    )
  )
  .flat() // flatten array
  .filter((e) => e); // remove undefined values

export {
  size,
  getLocations
};

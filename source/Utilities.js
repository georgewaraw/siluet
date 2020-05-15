import {
  FontLoader,
  TextureLoader,
  NearestFilter
} from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

const times = (number, callback) => [...Array(number)].map(callback);

const once = (callback) => {

  let done = false;

  return function() {

    return (done) ? void 0 : ((done = true), callback.apply(this, arguments));
  };
};

const getLesserNumber = (() => {

  let number = Number.MAX_VALUE;

  return (last=false) => (last) ? number : --number;
})();

const getRandomNumber = (from, to) => {

  if (!to) {
    to = from;
    from = 0;
  }

  return Math.floor(Math.random() * (to - from) + from);
};

const getMappedNumber = (input, inputFrom, inputTo, outputFrom, outputTo) =>
  (input - inputFrom) / (inputTo - inputFrom) * (outputTo - outputFrom) + outputFrom;

const getFont = (name) => new Promise((r) => new FontLoader().load(`./build/assets/${name}.json`, r));

const getModel = (name) => new Promise((r) => new STLLoader().load(`./build/assets/${name}.stl`, r));

const getColor = (brightness='normal', hue=330) => {

  if (brightness === 'dark') return `hsl(${hue}, 5%, 12%)`;
  else if (brightness === 'bright') return `hsl(${hue}, 5%, 50%)`;
  else return `hsl(${hue}, 5%, 25%)`;
};

const getTexture = (() => {

  const cache = {},
    loader = new TextureLoader();

  return (name, smooth=false) => cache[name+smooth] = cache[name+smooth] || (() => {

    const texture = loader.load(`./build/assets/${name}.jpg`);
    if (!smooth) {
      texture.magFilter = NearestFilter;
      texture.minFilter = NearestFilter;
    }

    return texture;
  })();
})();

export {
  times,
  once,
  getLesserNumber,
  getRandomNumber,
  getMappedNumber,
  getFont,
  getModel,
  getColor,
  getTexture
};

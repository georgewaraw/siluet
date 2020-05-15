import {
  AudioListener,
  AudioLoader,
  Audio,
  AudioAnalyser
} from 'three';
import { once } from './Utilities.js';

const audio = {
  initialize: null,
  listener: null,
  play: null,
  analyser: null
};
audio.initialize = once(() => {

  audio.listener = new AudioListener();

  const cache = {},
    loader = new AudioLoader();
  audio.play = (name, loop=false) => {

    if (cache[name]) {
      if (!cache[name].isPlaying) cache[name].play();
    } else {
      cache[name] = new Audio(audio.listener);
      loader.load(`./build/assets/${name}.mp3`, (b) => {

        cache[name].setBuffer(b);
        cache[name].setLoop(loop);
        cache[name].play();
      });
    }

    return cache[name];
  };

  const sound = audio.play('music', true);
  audio.analyser = new AudioAnalyser(sound);
});

export { audio };

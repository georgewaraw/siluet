import { getColor } from './Utilities.js';
import {
  renderer,
  scenes,
  cameras
} from './Game.js';
import { players } from './Players.js';
import { title } from './Title.js';
import { sea } from './Sea.js';
import { sky } from './Sky.js';
import { floor } from './Floor.js';
import { columns } from './Columns.js';
import { rectangle } from './Rectangle.js';
import { enemies } from './Enemies.js';
import { gun } from './Gun.js';
import { ammo } from './Ammo.js';
import './Events.js';
import { render } from './Render.js';

document.body.style.background = getColor('bright');

players.map((e, i) => scenes[i].add(e));
cameras.map((e, i) => players[i].add(e));
title.then((title) => players[1].add(title));
sea.map((e, i) => scenes[i].add(e));
sky.map((e, i) => scenes[i].add(e));
floor.map((e, i) => scenes[i].add(e));
columns.map((e, i) => scenes[i].add(e));
rectangle.map((e, i) => scenes[i].add(e));
enemies.then((enemies) => enemies.map((e) => e.map((e, i) => scenes[i].add(e))));
ammo.then((ammo) => gun.then((gun) => gun.add(ammo[9])));

renderer.setAnimationLoop(render);

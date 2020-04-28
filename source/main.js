import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import TWEEN from 'es6-tween';

import Constants from './Constants.js';
import Utilities from './Utilities.js';
import Game from './Game.js';
import Player from './Player.js';
import Title from './Title.js';
import Sea from './Sea.js';
import Sky from './Sky.js';
import Floor from './Floor.js';
import Columns from './Columns.js';
import Shape from './Shape.js';
import Enemies from './Enemies.js';
import Gun from './Gun.js';
import Ammo from './Ammo.js';
import Act from './Act.js';
import Events from './Events.js';
import Render from './Render.js';

Utilities.getColor( 'dark', Constants.HUES[ 0 ] );
Utilities.getColor( 'normal', Constants.HUES[ 0 ] );
Utilities.getColor( 'bright', Constants.HUES[ 0 ] );
const setShader = ( values, material, name ) =>
  Utilities.shader.set( Constants.VERTEX_SHADER, Constants.UNIFORMS, values, material, name );

document.body.style.background = Utilities.getColor( 'bright' );

Game.renderer( THREE, Constants.CANVAS );
Game.scenes( THREE, Utilities.getColor( 'bright' ) );
Game.scenes()[ 1 ].add( Game.player( THREE, Utilities.getTiles( Constants.MAP, 'P' )[ 0 ] ) );
Game.cameras( THREE, Constants.CANVAS, Game.player() ).map( ( e, i ) => ( i ) ? Game.player().add( e )
                                                                              : Game.scenes()[ 0 ].add( e ) );
Game.raycaster( THREE );
Game.border( 'down', Constants.CANVAS.clientHeight / 15 );

Game.cameras()[ 0 ].add( Player(

  THREE,
  setShader,
  Utilities.getColor( 'dark' )

) );

Utilities.getFont( THREE, 'Bender_Regular' ).then( ( font ) => Game.player().add( Title(

  THREE,
  font,
  setShader,
  Utilities.getColor()

) ) );

Sea(

  THREE,
  Utilities.getRandomNumber,
  setShader,
  Utilities.getColor( 'dark' ),
  Utilities.getTexture( THREE, 'blue_dark' )

).map( ( e, i ) => Game.scenes()[ i ].add( e ) );

Sky(

  THREE,
  Utilities.getRandomNumber,
  setShader,
  Utilities.getColor( 'dark' ),
  Utilities.getTexture( THREE, 'blue_light' ),
  Utilities.getNextNumber()

).map( ( e, i ) => Game.scenes()[ i ].add( e ) );

Floor(

  THREE,
  Utilities.getTiles( Constants.MAP, 'F' ),
  setShader,
  Utilities.getColor( 'dark' ),
  Utilities.getTexture( THREE, 'grey_dark' ),
  Utilities.getNextNumber()

).map( ( e, i ) => Game.scenes()[ i ].add( e ) );

Columns(

  THREE,
  Utilities.getTiles( Constants.MAP, 'C' ),
  Utilities.getRandomNumber,
  setShader,
  Utilities.getColor( 'dark' ),
  Utilities.getTexture( THREE, 'grey_dark' )

).map( ( e, i ) => Game.scenes()[ i ].add( e ) );

Shape(

  THREE,
  Utilities.getTiles( Constants.MAP, 'S' ),
  setShader,
  Utilities.getColor( 'dark' ),
  Utilities.getTexture( THREE, 'mix' ),
  Utilities.getNextNumber()

).map( ( e, i ) => Game.scenes()[ i ].add( e ) );

Utilities.getSTL( STLLoader, 'enemy' ).then( ( geometry ) => {

  Enemies(

    THREE,
    Constants.ENEMY_COUNT,
    geometry.scale( 0.05, 0.05, 0.05 ),
    setShader,
    Utilities.getRandomNumber,
    Utilities.getColor( 'dark' ),
    Utilities.getTexture( THREE, 'grey_dark' ),
    [ ...Utilities.getTiles( Constants.MAP, 'F' ) ]

  ).map( ( e ) => e.map( ( e, i ) => {

    if ( i ) e.rotation.y = Utilities.getRandomNumber( 0, 5 ) * 72;
    Game.scenes()[ i ].add( e );

  } ) );

  Game.player().add( Gun(

    THREE,
    setShader,
    [ Utilities.getTexture( THREE, 'grey_dark' ), Utilities.getTexture( THREE, 'blue_light' ) ]

  ) );

  Utilities.getFont( THREE, 'Pomeranian_Regular' ).then( ( font ) => {

    Gun().add( Ammo(

      THREE,
      font,
      setShader,
      Utilities.getColor()

    )[ 9 ] ) ;

    Act(

      TWEEN,
      Game.player(),
      Utilities.getTiles( Constants.MAP, 'F' ),
      Gun(),
      Game.listener,
      THREE,
      Game.cameras(),
      Utilities.playSound,
      Game.audioAnalyser,
      Enemies(),
      Utilities.getRandomNumber,
      Game.border(),
      Constants.CANVAS,
      Utilities.shader.get,
      Ammo(),
      Game.raycaster(),
      Game.scenes()

    );

    Events(

      Constants.CANVAS,
      Game.cameras(),
      Game.renderer(),
      Game.border(),
      Game.player(),
      Act(),
      Gun()

    );

  } );

  Render(

    THREE,
    TWEEN,
    Game.audioAnalyser,
    Utilities.getMappedNumber,
    Utilities.shader.get,
    Game.raycaster(),
    Gun(),
    Enemies(),
    [ ...Array( 5 ) ].map( () => Utilities.getRandomNumber( 5, 10 ) ),
    Game.renderer(),
    Constants.CANVAS,
    Game.border(),
    Game.scenes(),
    Game.cameras()

  );
  Game.renderer().setAnimationLoop( Render() );

} );

import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import TWEEN from 'es6-tween';

import Constants from './Constants.js';
import Utilities from './Utilities.js';
import Game from './Game.js';
import Title from './Title.js';
import Sea from './Sea.js';
import Sky from './Sky.js';
import Floor from './Floor.js';
import Columns from './Columns.js';
import Shape from './Shape.js';
import Skulls from './Skulls.js';
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

Game.renderer( THREE, Constants.CANVAS, Constants.VR_SUPPORT );
Game.scenes( THREE, Utilities.getColor( 'bright' ) );
Game.scenes()[ 1 ].add( Game.player( THREE ) );
Game.player().add( Game.camera( THREE, Constants.CANVAS ) );
Game.border( 'down', Constants.CANVAS.clientHeight / 15 );

Utilities.getFont( THREE, 'Bender_Regular' ).then( ( font ) => Game.scenes()[ 0 ].add( Title(

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
  Utilities.getTexture( THREE, 'blue_light' )

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

Utilities.getSTL( STLLoader, 'skull' ).then( ( geometry ) => {

  Skulls(

    THREE,
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
      Skulls(),
      Utilities.getRandomNumber,
      Game.border(),
      Constants.CANVAS,
      Utilities.shader.get,
      Ammo()

    );

    Events(

      VRButton,
      Constants.CANVAS,
      Game.camera(),
      Game.renderer(),
      Game.border(),
      Constants.VR_SUPPORT,
      Game.player(),
      Act(),
      Gun()

    );

  } );

  Render(

    THREE,
    TWEEN,
    Utilities.shader.get,
    Constants.VR_SUPPORT,
    Gun(),
    Skulls().map( ( e ) => e[ 0 ] ),
    [ ...Array( 5 ) ].map( () => Utilities.getRandomNumber( 5, 10 ) ),
    Game.renderer(),
    Constants.CANVAS,
    Game.border(),
    Game.scenes(),
    Game.camera()

  );
  Game.renderer().setAnimationLoop( Render() );

} );

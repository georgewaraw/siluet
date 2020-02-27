import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import TWEEN from 'es6-tween';
import Act from './Act.js';
import App from './App.js';
import Consts from './Consts.js';
import Events from './Events.js';
import Geos from './Geos.js';
import Lights from './Lights.js';
import Mats from './Mats.js';
import Meshes from './Meshes.js';
import Render from './Render.js';
import Shaders from './Shaders.js';
import Utils from './Utils.js';

Utils.color( 'dark', Utils.random( Consts.HUES ) );
Utils.color( 'normal', Utils.random( Consts.HUES ) );
Utils.color( 'bright', Utils.random( Consts.HUES ) );

const shaders = ( v, m ) => Shaders( Consts.VERTEX_SHADER, Consts.UNIFORMS, v, m );

document.body.style.background = Utils.color( 'bright' );

App.renderer( THREE, Consts.CANVAS, Consts.VR_CAPABLE );
App.scene( THREE, Utils.color( 'bright' ) );
App.scene().add( App.user( THREE ) );
App.cameras( THREE, Consts.CANVAS ).map( ( e ) => App.user().add( e ) );

Object.keys( Lights ).map( ( e ) =>

  ( e === 'ambient' ) ? App.scene().add( Lights[ e ]( THREE, Utils.color( 'dark' ) ) )
                      : App.user().add( Lights[ e ]( THREE, Utils.color() ) )

);

Utils.text( THREE, 'Bender_Regular' ).then( ( f ) => App.scene().add( Meshes.text(

  THREE,
  Geos.text( THREE, f ),
  shaders( { uTime: 0, uSpeed: 0.375, uMorph: 0.125, uDistort: 0.025 }, Mats.text( THREE, Utils.color( 'bright' ) ) )

) ) );

App.scene().add( Meshes.floor(

  THREE,
  Geos.floor( THREE, Utils.locations( Consts.LAYOUT, 'F' ) ),
  shaders( { uTime: 0, uSpeed: 0.375, uMorph: 20, uDistort: 0 }, Mats.floor( THREE, Utils.color( 'dark' ) ) )

) );

App.scene().add( Meshes.room(

  THREE,
  Geos.room( THREE, Utils.locations( Consts.LAYOUT, 'R' ) ),
  shaders( { uTime: 0, uSpeed: 0.375, uMorph: 50, uDistort: 10 }, Mats.room( THREE, Utils.color( 'dark' ) ) )

) );

App.scene().add( Meshes.poles(

  THREE,
  Geos.poles( THREE, Utils.locations( Consts.LAYOUT, 'P' ),
    ( () => Utils.color( 'dark', Utils.random( Consts.HUES ), true ) ) ),
  shaders( { uTime: 0, uSpeed: 0.375, uMorph: 10, uDistort: 1.25 }, Mats.poles( THREE ) )

) );

Meshes.others(

  THREE,
  Geos.others( THREE, ( () => Utils.color( 'bright', Utils.random( Consts.HUES ), true ) ) ),
  Mats.others( THREE ).map( ( e ) => shaders( { uTime: 0, uSpeed: ( Utils.random( 0, 2 ) ? 0.0833 : 0.0625 ),
    uMorph: ( Utils.random( 0, 2 ) ? 1000 : 750 ), uDistort: 1.25 }, e ) ),
  Utils.locations( Consts.LAYOUT, 'F' ),
  Utils.random

).map( ( e ) => App.scene().add( e ) );

if ( !Consts.VR_CAPABLE ) App.scene().add( Meshes.water(

  THREE,
  Geos.water( THREE, Utils.random ),
  shaders( { uTime: 0, uSpeed: 0.125, uMorph: 200, uDistort: 2.5 }, Mats.water( THREE, Utils.color( 'dark' ) ) )

) );

App.scene().add( Meshes.sky(

  THREE,
  Geos.sky( THREE, Utils.random ),
  shaders( { uTime: 0, uSpeed: 0.125, uMorph: 100, uDistort: 1.25 }, Mats.sky( THREE, Utils.color( 'dark' ) ) )

) );

Events( VRButton, Consts.CANVAS, Consts.VR_CAPABLE, App.renderer(), App.user(), App.cameras(), Lights.spot(),
  Act( THREE, TWEEN, App.user(), Meshes.others(), Utils.locations( Consts.LAYOUT, 'F' ), Utils.random ) );

Render( THREE, TWEEN, Consts.VR_CAPABLE, Consts.CANVAS, App.renderer(), App.scene(), App.cameras(), Shaders(),
  Lights.spot(), Meshes.others() );
App.renderer().setAnimationLoop( Render() );

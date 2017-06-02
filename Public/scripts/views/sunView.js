'use strict';

var app = app || {};

(function(module) {
  const sunView = {};

  sunView.translateBC = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.BC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateR(app.Render.angles[1].angle);
    $(`.BC-text`).html(`${targetData.sundata[0].time} 'Begin Civil Twilight (Dawn)' `);
  };

  sunView.translateR = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.R`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateU(app.Render.angles[2].angle);
    $(`.R-text`).html(`${targetData.sundata[1].time} 'Sunrise' `);
  };

  sunView.translateU = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.U`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateS(app.Render.angles[3].angle);
    $(`.U-text`).html(`${targetData.sundata[2].time} 'Local Apparent Noon' `);
  };

  sunView.translateS = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.S`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateEC(app.Render.angles[4].angle);
    $(`.S-text`).html(`${targetData.sundata[3].time} 'Sunset' `);
  };

  sunView.translateEC = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.EC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.keyframesOrbit(app.Render.angles[5].angle);
    $(`.EC-text`).html(`${targetData.sundata[4].time} 'End Civil Twilight (Nightfall)' `);
  };

  sunView.keyframesOrbit = (angle) =>{
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -Math.cos(angle * (Math.PI/180));
    $.keyframe.define({
      name: 'orbit',
      from: {
        'transform':'rotate(0deg) translateX('+transX*25+'vh) translateY('+transY*25+'vh) rotate(0deg)'
      },
      to: {
        'transform':'rotate(360deg) translateX('+transX*25+'vh) translateY('+transY*25+'vh) rotate(-360deg)'
      }
    });
  };

  sunView.keyframesPulse = () =>{
    let angleBC = app.Render.angles[0].angle;
    let angleR = app.Render.angles[1].angle;
    let angleS = app.Render.angles[3].angle;
    let angleEC = app.Render.angles[4].angle;
    console.log(angleBC, angleR, angleS, angleEC);
    $.keyframe.define([{
      name: 'pulse',
      '0%' : { 'background-color': '#ccf5f3'},
      '5%' : { 'background-color': '#df8773'},
      '30%' : { 'background-color': '#666'},
      '35%' : { 'background-color':  '#df8773'},
      '45%' : { 'background-color': '#ccf5f3'},
      '100%' : { 'background-color': '#ccf5f3'},
    }]);
  };

  sunView.fireKeyframes = () =>{
    let currentSun = app.Render.angles[5].angle;
    let currentS = app.Render.angles[3].angle;
    let currentR = app.Render.angles[1].angle;
    if (currentSun > 0){
      console.log('afternoon');
      setTimeout(function(){
        app.sunView.keyframesPulse();},((currentS - currentSun)/360 * 40000));
    }else if (currentSun < 0 && currentSun > currentR){
      console.log('morning');
      setTimeout(function(){
        app.sunView.keyframesPulse();},(((currentS - currentSun) / 360) * 40000));
    }else{
      console.log('pre-dawn');
      setTimeout(function(){
        app.sunView.keyframesPulse();}, 40000);
    }
  };

  // app.sunView.keyframesPulse().delay(
    // ((currentBC + 180) - currentSun)/360 * 20000);

    // app.sunView.keyframesPulse().delay(
      // ((currentBC + 180 + currentSun) / 360) * 20000);
  module.sunView = sunView;
}(app));

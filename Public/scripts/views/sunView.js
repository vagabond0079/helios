'use strict';

var app = app || {};

(function(module) {
  const sunView = {};

  sunView.translateBC = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.BC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateR(app.Render.angles[1].angle);
  };

  sunView.translateR = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.R`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateU(app.Render.angles[2].angle);
  };

  sunView.translateU = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.U`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateS(app.Render.angles[3].angle);
  };

  sunView.translateS = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.S`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.translateEC(app.Render.angles[4].angle);
  };

  sunView.translateEC = (angle) => {
    let transX = Math.sin(angle * (Math.PI/180));
    let transY = -1*Math.cos(angle * (Math.PI/180));
    $(`.EC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    app.sunView.keyframesOrbit(app.Render.angles[5].angle);
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

  module.sunView = sunView;
}(app));

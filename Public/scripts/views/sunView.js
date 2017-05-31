'use strict';

var app = app || {};

(function(module) {
  const sunView = {};

  sunView.translateBC = (angle) => {
    let transX = Math.sin(angle);
    let transY = -1*Math.cos(angle);
    $(`.BC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.BC`));
  };

  sunView.translateR = (angle) => {
    let transX = Math.sin(angle);
    let transY = -1*Math.cos(angle);
    $(`.R`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.R`));
  };

  sunView.translateU = (angle) => {
    let transX = Math.sin(angle);
    let transY = -1*Math.cos(angle);
    $(`.U`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.U`));
  };

  sunView.translateS = (angle) => {
    let transX = Math.sin(angle);
    let transY = -1*Math.cos(angle);
    $(`.S`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.BC`));
  };

  sunView.translateEC = (angle) => {
    let transX = Math.sin(angle);
    let transY = -1*Math.cos(angle);
    $(`.EC`).css({'top':'calc('+transY+' * 25vh)', 'left':'calc('+transX+' * 25vh)'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.EC`));
  };

  sunView.translateCur = (angle) => {
    let transX = Math.sin(angle) * 25;
    let transY = -1*Math.cos(angle) * 25;
    $(`.Cur`).css({'top':'calc('+transY+')', 'left':'calc('+transX+')'});
    console.log(Math.sin(angle));
    console.log(Math.cos(angle));
    console.log($(`.Cur`));
  };

  module.sunView = sunView;
}(app));

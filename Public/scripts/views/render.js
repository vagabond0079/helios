'use strict';

var app  = app || {};

(function(module) {
  function Render(targetData) {
    Object.keys(targetData).forEach(key => this[key] = targetData[key]);
  }
  Render.angles = []

  Render.BC = (targetData) => {
    let BC = {
      name: `Begin Civil Twilight`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataBC`)
    }
    Render.angles[0] = BC;
    app.Render.R(targetData);
  }
  Render.R = (targetData) => {
    let R = {
      name: `Sunrise`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataR`)
    }
    Render.angles[1] = R;
    app.Render.U(targetData);
  }
  Render.U = (targetData) => {
    let U = {
      name: `Local Apparent Noon`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataU`)
    }
    Render.angles[2] = U;
    app.Render.S(targetData);
  }
  Render.S = (targetData) => {
    let S = {
      name: `sunset`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataS`)
    }
    Render.angles[3] = S;
    app.Render.EC(targetData);
  }
  Render.EC = (targetData) => {
    let EC = {
      name: `End Civil Twilight`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataEC`)
    }
    Render.angles[4] = EC;
    app.Render.Cur(targetData);
  }
  Render.Cur = (targetData) => {
    let Cur = {
      name: `Current Location of the Sun`,
      angle: app.middleware.degreesFromNoon(targetData, `sundataCur`)
    }
    Render.angles[5] = Cur;
    app.Render.seasonalHours(targetData);
  }
  Render.seasonalHours = (targetData) => {
    app.sun.twelveSeasonalHours = (targetData, `sundataR`)
  }

module.Render = Render
})(app);

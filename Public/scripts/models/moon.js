'use strict';
var app = app || {};

(function(module){

  const moon = {};

  //Returns total seconds before or after Lunar Upper Transit, known in our targetData as "phen: 'U' " (for Upper Transit). Time before lunar transit is negative, time after lunar transit is positive.

  //NOTE: targetTime must be the targetDataDateObj property in string form, i.e. 'moondataS'.

  moon.secondsFromLunarTransit = (targetData, targetTime) => {
    let secondsFromLunarTransit =
    (app.middleware.dateObjToSecondsFromMidnight(
      app.middleware.targetDataDateObj(targetData).moondataU) -
    app.middleware.dateObjToSecondsFromMidnight(
      app.middleware.targetDataDateObj(targetData)[targetTime])) * -1;
    return secondsFromLunarTransit;
  };

  //Returns angular distance from lunar transit (0 degrees). I.e., -126 degrees or 33 degrees.

  moon.degreesFromLunarTransit = (targetData, targetTime) => {
    let degreesFromLunarTransit =
    app.middleware.secondsToDegrees(
      moon.secondsFromLunarTransit(targetData, targetTime));
    return degreesFromLunarTransit;
  };

  //Returns the current position of the moon in degrees to/from upper lunar transit.

  moon.currentMoonPosition = (targetData) => {
    let currentMoonPosition = moon.degreesFromLunarTransit(targetData, 'currentTime');
    return currentMoonPosition;
  };

  module.moon = moon;
}(app));

'use strict';
var app = app || {};

(function(module){

  const sun = {};

  sun.totalSunlight = (targetData) => {
    let totalSunlight =
    app.middleware.dateObjToSecondsFromMidnight(
      app.middleware.targetDataDateObj(targetData).sundataS) - app.middleware.dateObjToSecondsFromMidnight(
        app.middleware.targetDataDateObj(targetData).sundataR);
    return totalSunlight;
  };

  //Returns length of seasonal hour in seconds, i.e. 1/12 of the total daylight.

  sun.seasonalHourInSeconds = (targetData) => {
    let seasonalHourInSeconds =
    sun.totalSunlight(targetData) / 12;
    return seasonalHourInSeconds;
  };

  //Returns length of seasonal hour in minutes to the second decimal.

  sun.seasonalHourInMinutes = (targetData) => {
    let seasonalHourInMinutes =
    parseFloat((sun.seasonalHourInSeconds(targetData) / 60).toFixed(2));
    return seasonalHourInMinutes;
  };

  //Returns degree length of seasonal hour to the second decimal.

  sun.seasonalHourInDegrees = (targetData) => {
    let seasonalHourInDegrees =
    parseFloat((app.middleware.secondsToDegrees(
      sun.seasonalHourInSeconds(targetData))).toFixed(2));
    return seasonalHourInDegrees;
  };

  //Returns an array of degrees representing the 12 seasonal hours.

  sun.twelveSeasonalHours = (targetData, sunrise) => {
    let seasonalHours = [];
    seasonalHours.push(app.middleware.degreesFromNoon(targetData, sunrise));
    for (var i=0; i<12; i++){
      seasonalHours.push(seasonalHours[i]+sun.seasonalHourInDegrees(targetData));
    }
    return seasonalHours;
  };

  //Returns the current position of the sun in degrees to/from local apparent noon.

  sun.currentSunPosition = (targetData) => {
    let currentSunPosition = app.middleware.degreesFromNoon(targetData, 'currentTime');
    return currentSunPosition;
  };

  module.sun = sun;

}(app));

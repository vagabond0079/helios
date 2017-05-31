'use strict';
var app = app || {};

(function(module){

  const middleware = {};

  //Takes input from the targetData object we receive from the USNO API along with the object property we're trying to translate (i.e., targetData.sundata or targetData.mooondata) as well as the index of the data (0, 1, etc) and returns a new Date object called targetDataDateObj in the format: Wed May 31 2017 01:21:00 GMT-0700 (PDT).

  //NOTE: dataset must be in string form, i.e. 'sundata'.

  middleware.targetDataToDateString = (targetData, dataset, index) => {
    let targetDataDateString = new Date(
      targetData.year,
      targetData.month-1,
      targetData.day,
      targetData[dataset][index].time.substring(0 ,2),
      targetData[dataset][index].time.substring(3,5)
    );
    // console.log(targetData);
    return targetDataDateString;
  };

  //Returns new array of objects with sun and moon data translated to date objects.

  middleware.targetDataDateObj = (targetData, year, month, day, hour, minute) => {
    let targetDataDateObj = {};
    if (year){
      targetDataDateObj.currentTime = new Date(year, month, day, hour, minute);
    }else{
      targetDataDateObj.currentTime = new Date();
    }
    targetDataDateObj.sundataBC = middleware.targetDataToDateString(
      targetData, 'sundata', 0);
    targetDataDateObj.sundataR = middleware.targetDataToDateString(
      targetData, 'sundata', 1);
    targetDataDateObj.sundataU = middleware.targetDataToDateString(
      targetData, 'sundata', 2);
    targetDataDateObj.sundataS = middleware.targetDataToDateString(
      targetData, 'sundata', 3);
    targetDataDateObj.sundataEC = middleware.targetDataToDateString(
      targetData, 'sundata', 4);
    targetDataDateObj.moondataS = middleware.targetDataToDateString(
      targetData, 'moondata', 0);
    targetDataDateObj.moondataR = middleware.targetDataToDateString(
      targetData, 'moondata', 1);
    targetDataDateObj.moondataU = middleware.targetDataToDateString(
      targetData, 'moondata', 2);

    return targetDataDateObj;
  };

  //Returns total seconds in current day since midnight.

  middleware.dateObjToSecondsFromMidnight = (dateObj) => {
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    return totalSeconds;
  };

  //Returns total seconds before or after Local Apparent Noon, known in our targetData as "phen: 'U' " (for Upper Transit). Time before noon is negative, time after noon is positive.

  //NOTE: targetTime must be the targetDataDateObj property in string form, i.e. 'sundataS'.

  middleware.secondsFromNoon = (targetData, targetTime) => {
    let secondsFromNoon =
    (middleware.dateObjToSecondsFromMidnight(
      middleware.targetDataDateObj(targetData).sundataU) -
    middleware.dateObjToSecondsFromMidnight(
      middleware.targetDataDateObj(targetData)[targetTime])) * -1;
    return secondsFromNoon;
  };

  //Takes input of seconds and returns degrees.

  middleware.secondsToDegrees = (seconds) => {
    let degrees = seconds / 240;
    return degrees;
  };

  //Returns angular distance from noon (0 degrees). I.e., -126 degrees or 33 degrees.

  middleware.degreesFromNoon = (targetData, targetTime) => {
    let degreesFromNoon =
    middleware.secondsToDegrees(middleware.secondsFromNoon(targetData, targetTime));
    return degreesFromNoon;
  };

  module.middleware = middleware;

}(app));

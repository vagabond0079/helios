'use strict';

//Takes input from the targetData object we receive from the USNO API along with the object property we're trying to translate (i.e., targetData.sundata or targetData.mooondata) as well as the index of the data (0, 1, etc) and returns a new Date object called targetDataDateObj in the format: Wed May 31 2017 01:21:00 GMT-0700 (PDT).

//NOTE: dataset must be in string form, i.e. 'sundata'.

let targetDataToDateString = (targetData, dataset, index) => {
  let targetDataDateString = new Date(
    targetData.year,
    targetData.month-1,
    targetData.day,
    targetData[dataset][index].time.substring(0,2),
    targetData[dataset][index].time.substring(3,5)
  );
  return targetDataDateString;
};

//Returns new array of objects with sun and moon data translated to date objects.

let targetDataDateObj = (targetData) => {
  let targetDataDateObj = {};
  targetDataDateObj.currentTime = new Date();
  targetDataDateObj.sundataBC = targetDataToDateString(targetData, 'sundata', 0);
  targetDataDateObj.sundataR = targetDataToDateString(targetData, 'sundata', 1);
  targetDataDateObj.sundataU = targetDataToDateString(targetData, 'sundata', 2);
  targetDataDateObj.sundataS = targetDataToDateString(targetData, 'sundata', 3);
  targetDataDateObj.sundataEC = targetDataToDateString(targetData, 'sundata', 4);
  targetDataDateObj.moondataS = targetDataToDateString(targetData, 'moondata', 0);
  targetDataDateObj.moondataR = targetDataToDateString(targetData, 'moondata', 1);
  targetDataDateObj.moondataU = targetDataToDateString(targetData, 'moondata', 2);

  return targetDataDateObj;
};

//Returns total seconds in current day since midnight.

let dateObjToSecondsFromMidnight = (dateObj) => {
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  return totalSeconds;
};

//Returns total seconds before or after Local Apparent Noon, known in our targetData as "phen: 'U' " (for Upper Transit). Time before noon is negative, time after noon is positive.

//NOTE: targetTime must be the targetDataDateObj property in string form, i.e. 'sundataS'.

let secondsFromNoon = (targetData, targetTime) => {
  let secondsFromNoon =
  (dateObjToSecondsFromMidnight(targetDataDateObj(targetData).sundataU) -
  dateObjToSecondsFromMidnight(targetDataDateObj(targetData)[targetTime])) * -1;
  return secondsFromNoon;
};

//Takes input of seconds and returns degrees.

let secondsToDegrees = (seconds) => {
  let degrees = seconds / 240;
  return degrees;
};

//Returns angular distance from noon (0 degrees). I.e., -126 degrees or 33 degrees.

let degreesFromNoon = (targetData, targetTime) => {
  let degreesFromNoon =
  secondsToDegrees(secondsFromNoon(targetData, targetTime));
  return degreesFromNoon;
};

//Takes input of sunset and sunrise and returns total sunlight per day in seconds.

let totalSunlight = (targetData) => {
  let totalSunlight =
  dateObjToSecondsFromMidnight(targetDataDateObj(targetData).sundataS) - dateObjToSecondsFromMidnight(targetDataDateObj(targetData).sundataR);
  return totalSunlight;
};

//Returns length of seasonal hour in seconds, i.e. 1/12 of the total daylight.

let seasonalHourInSeconds = (targetData) => {
  let seasonalHourInSeconds =
  totalSunlight(targetData) / 12;
  return seasonalHourInSeconds;
};

//Returns length of seasonal hour in minutes to the second decimal.

let seasonalHourInMinutes = (targetData) => {
  let seasonalHourInMinutes =
  parseFloat((seasonalHourInSeconds(targetData) / 60).toFixed(2));
  return seasonalHourInMinutes;
};

//Returns degree length of seasonal hour to the second decimal.

let seasonalHourInDegrees = (targetData) => {
  let seasonalHourInDegrees =
  parseFloat((secondsToDegrees(seasonalHourInSeconds(targetData))).toFixed(2));
  return seasonalHourInDegrees;
};

//Returns the current position of the sun in degrees to/from local apparent noon.

let currentSunPosition = (targetData) => {
  let currentSunPosition = degreesFromNoon(targetData, 'currentTime');
  return currentSunPosition;
};

//Returns total seconds before or after Lunar Upper Transit, known in our targetData as "phen: 'U' " (for Upper Transit). Time before lunar transit is negative, time after lunar transit is positive.

//NOTE: targetTime must be the targetDataDateObj property in string form, i.e. 'sundataS'.

let secondsFromLunarTransit = (targetData, targetTime) => {
  let secondsFromLunarTransit =
  (dateObjToSecondsFromMidnight(targetDataDateObj(targetData).moondataU) -
  dateObjToSecondsFromMidnight(targetDataDateObj(targetData)[targetTime])) * -1;
  return secondsFromLunarTransit;
};

//Returns angular distance from lunar transit (0 degrees). I.e., -126 degrees or 33 degrees.

let degreesFromLunarTransit = (targetData, targetTime) => {
  let degreesFromLunarTransit =
  secondsToDegrees(secondsFromLunarTransit(targetData, targetTime));
  return degreesFromLunarTransit;
};

//Returns the current position of the moon in degrees to/from upper lunar transit.

let currentMoonPosition = (targetData) => {
  let currentMoonPosition = degreesFromLunarTransit(targetData, 'currentTime');
  return currentMoonPosition;
};

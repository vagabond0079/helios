'use strict';

//Takes input from the targetData object we receive from the USNO API along with the object property we're trying to translate (i.e., targetData.sundata or targetData.mooondata) as well as the index of the data (0, 1, etc) and returns a new Date object called targetDataDateObj in the format: Wed May 31 2017 01:21:00 GMT-0700 (PDT).

//NOTE: dataset must be in string form, i.e. 'sundata'.

function targetDataToDateString(targetData, dataset, index) {
  let targetDataDateString = new Date(
    targetData.year,
    targetData.month-1,
    targetData.day,
    targetData[dataset][index].time.substring(0,2),
    targetData[dataset][index].time.substring(3,5)
  );
  return targetDataDateString;
}

//Returns new array of objects with sun and moon data translated to date objects.

function targetDataDateObj(targetData) {
  let targetDataDateObj = {};
  targetDataDateObj.sundataBC = targetDataToDateString(targetData, 'sundata', 0);
  targetDataDateObj.sundataR = targetDataToDateString(targetData, 'sundata', 1);
  targetDataDateObj.sundataU = targetDataToDateString(targetData, 'sundata', 2);
  targetDataDateObj.sundataS = targetDataToDateString(targetData, 'sundata', 3);
  targetDataDateObj.sundataEC = targetDataToDateString(targetData, 'sundata', 4);
  targetDataDateObj.moondataS = targetDataToDateString(targetData, 'moondata', 0);
  targetDataDateObj.moondataR = targetDataToDateString(targetData, 'moondata', 1);
  targetDataDateObj.moondataU = targetDataToDateString(targetData, 'moondata', 2);
  return targetDataDateObj;
}

//Returns total seconds in current day since midnight.

function dateObjToSecondsFromMidnight(dateObj) {
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  return totalSeconds;
}

//Returns total seconds before or after Local Apparent Noon, known in our targetData as "phen: 'U' " (for Upper Transit). Time before noon is negative, time after noon is positive.

//NOTE: targetTime must be the targetDataDateObj properyt in string form, i.e. 'sundataS'.

function secondsFromNoon(targetData, targetTime) {
  let secondsFromNoon =
  (dateObjToSecondsFromMidnight(targetDataDateObj(targetData).sundataU) -
  dateObjToSecondsFromMidnight(targetDataDateObj(targetData)[targetTime])) * -1;
  return secondsFromNoon;
}

//Returns angular distance from noon (0 degrees). I.e., -126 degrees or 33 degrees.

function degreesFromNoon(targetData, targetTime) {
  let degreesFromNoon =
  secondsFromNoon(targetData, targetTime) / 240;
  return degreesFromNoon;
}

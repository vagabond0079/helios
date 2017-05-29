'use strict';

//Returns total seconds in current day since midnight.

function targetDataToDateObj(targetData, dataset, index) {
  let targetDataDateObj = new Date(
    targetData.year,
    targetData.month-1,
    targetData.day,
    dataset[index].time.substring(0,2),
    dataset[index].time.substring(3,5)
  );
  return targetDataDateObj;
};

function currentTimeToSecondsFromMidnight(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  return totalSeconds;
};

'use strict';
//This functions gets the current user's location
function getLocation(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showData);
  } 
}
var currentLocation;
function showData(position){
  currentLocation = [position.coords.latitude, position.coords.longitude].join();
  console.log(currentLocation);
  return currentLocation;
}

//This function gets the current users's Date
function getDate(){
  let setDate = new Date();
  let setMonth = setDate.getMonth();
  let setDay = setDate.getDate();
  let setYear = setDate.getFullYear();

  return (setMonth+1)+'/'+setDay+'/'+setYear;
}

// var targetData;
//variable/function to call the API
var getData = function() { $.get( "http://api.usno.navy.mil/rstt/oneday?", {date:`${getDate()}`, coords:`${currentLocation}`,tz:'-7'})
  .done((data)=>
    // console.log(data)
  targetData = data
  );};

getLocation();

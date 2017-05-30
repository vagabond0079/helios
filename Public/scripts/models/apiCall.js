'use strict';

var currentLocation;
var currentDate;

/*these lines of code takes the values from the input field forms and sets up the currentDate and currentLocation by City*/
$('#newData').on('submit', function(event){
  event.preventDefault();
  currentLocation = $('#city-Name').val();
  currentDate = $('#date').val();
  formatDate();
});

function formatDate(){
  currentDate = currentDate.split('-');
  currentDate = currentDate[1]+'/'+currentDate[2]+'/'+currentDate[0];
  getDataByCityName();
}

//This functions gets the current user's location
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showData);
  }
}
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

  currentDate = (setMonth+1)+'/'+setDay+'/'+setYear;
  return currentDate;
}

//variable/function to call the API
var getDataByCityName = function() { $.get( "http://api.usno.navy.mil/rstt/oneday?", {date:`${currentDate}`, loc:`${currentLocation}`,tz:'-7'})
  .done((data)=>
  targetData = data
  );};

var getDataByCoordinates = function() { $.get( "http://api.usno.navy.mil/rstt/oneday?", {date:`${currentDate}`, coords:`${currentLocation}`,tz:'-7'})
    .done((data)=>
  targetData = data
  );};

getLocation();
getDate();

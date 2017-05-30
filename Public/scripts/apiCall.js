'use strict';
//This functions gets the current user's location
function getLocation(){
if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(showData);
}
}
function showData(position){
  var currentLocation = [position.coords.latitude, position.coords.longitude].join();
  console.log(currentLocation);
}

//This function gets the current users's Date
function getDate(){
  let setDate = new Date();
  let setMonth = setDate.getMonth();
  let setDay = setDate.getDate();
  let setYear = setDate.getFullYear();

  return (setMonth+1)+'/'+setDay+'/'+setYear;
}


//variable/function to call the API
var getData = function() { $.get( "http://api.usno.navy.mil/rstt/oneday?", {date:'1/5/2005', loc:'Renton,WA'})
  .done(function( data ) {
    console.table(data.sundata);
  });};
         

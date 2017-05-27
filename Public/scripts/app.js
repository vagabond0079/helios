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

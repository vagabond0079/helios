'use strict';


/*these lines of code takes the values from the input field forms and sets up the currentDate and currentLocation by City*/
var currentLocation;
var currentDate;
let $app = $('#app');

$('#newData').on('submit', function(event){
  event.preventDefault();
  currentLocation = $('#city-Name').val();
  currentDate = $('#date').val();
  formatDate();
});

function formatDate(){
  currentDate = currentDate.split('-');
  currentDate = currentDate[1]+'/'+currentDate[2]+'/'+currentDate[0];
  convertCityNameToLatLong();
}

//This functions gets the current user's location
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showData);
  }
}
function showData(position){
  currentLocation = [position.coords.latitude, position.coords.longitude].join();
  getDataByCoordinates();
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

//function to call the google API
var convertCityNameToLatLong = function() {$.get("https://maps.googleapis.com/maps/api/geocode/json?",
  {address:`${currentLocation}`, key:`${GOOGLE_API}`})
  .done((results) =>
  getLatLng(results));

};

function getLatLng (results) {
  currentLocation = results;
  currentLocation = [currentLocation.results[0].geometry.location.lat, currentLocation.results[0].geometry.location.lng].join();
  getDataByCoordinates();
  console.log('test', currentLocation);
}

var getDataByCoordinates = function() { $.get( "/usno/rstt/oneday?", {date:`${currentDate}`, coords:`${currentLocation}`,tz:'-7'})
    .done((data)=> targetData = data
  )
  .done(() => $app.fadeIn())
  .done(() => $('#loading-img').hide())
  .done(() => app.Render.BC(targetData))
  .done(() => app.sunView.translateBC(app.Render.angles[0].angle))
  .done(() => app.sunView.fireKeyframes());};

// navigation menu script
$( window ).resize(function() {
  if ($(window).width() < 479) {
    $('.navigation-menu').hide();
    $('#newData').hide();
    $('.fa-times').hide();
    $('.fa-bars').on('click', function() {
      $('.navigation-menu').show('slow', function() {
        $('.fa-bars').hide();
        $('#newData').show('slow');
        $('.fa-times').show();
      });
    });
    $('.fa-times').on('click', function(){
      $('.navigation-menu').hide('slow', function(){
        $('.fa-times').hide();
        $('#newData').hide('slow');
        $('.fa-bars').show();
      });
    });
  }
  else {
    $('.navigation-menu').show();
    $('#newData').show();
  }
});

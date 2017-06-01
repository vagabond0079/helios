'use strict';

$('#start-button').click(function() {
  let $app = $('#app');
  $('main').empty();
  $('#loading-img').show();
  getDate();
  getLocation();

});

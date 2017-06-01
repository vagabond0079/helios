'use strict';

$('#start-button').click(function() {
  console.log('booya');
  let $app = $('#app');
  $('main').empty();
  $app.show()
  getLocation();
  getDate();
  getDataByCoordinates();
  app.Render.BC(targetData)
  app.sunView.translateBC(app.Render.angles[0].angle);
});

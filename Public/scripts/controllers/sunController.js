'use strict';

  $('#start-button').click(function() {
  let $app = $('#app');
  $('main').empty();
  $app.show()
  getLocation();
  getDate();
  getDataByCoordinates();
  app.Render.BC(targetData);
  app.sunView.translateR(app.Render.angle[0].angle);
});

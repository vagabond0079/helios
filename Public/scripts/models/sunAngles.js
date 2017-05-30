'use strict';
var app = app || {};

(function(module) {
const angles  = $('#angle-template').html();
const template = Handlebars.compile(angles);
$('body').append(template(targetData)).hide();
// targetData will be app.Render.angles when API is set up
})(app);

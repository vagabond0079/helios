'use strict';
var app = app || {};

(function(module) {
const angles  = $('#angle-template').html();
const template = Handlebars.compile(angles);
$('body').append(template(app.Render.agles)).hide();
})(app);

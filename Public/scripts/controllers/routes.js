'use strict';
var app = app || {};

page('/', app.tbd.Controller1stView.index); //main page
page('/api', app.tbd.Controller2ndView.index.loadAll); //api results page
page('/about', app.tbd.Controller3ndView.index); //about the team page
page();

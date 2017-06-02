'use strict';
console.log('teamrenderjs');

let teamArray = [];

function Team(teamData) {
this.imageUrl = teamData.imageUrl;
this.name = teamData.name;
this.bio = teamData.bio;
this.gitHub = teamData.gitHub;
this.linkedIn = teamData.linkedIn;
};

Team.prototype.toHtml = function() {
  let template = $("#team-template").html();
  console.log('teamRender line18',template);
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};

teamData.forEach(function(callback) {
  teamArray.push(new Team(callback));
});

teamArray.forEach(function(callback){
  $('#team').append(callback.toHtml());
});

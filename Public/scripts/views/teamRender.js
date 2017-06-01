'use strict';

function Team(image, name, bio, gitHub, linkedIn) {
image = this.image,
name = this.name,
bio = this.bio,
gitHub = this.gitHub,
linkedIn = this.linkedIn,
}

let Team = new Team

Team.prototype.toHtml = function() {
  let template = $(#team-template).html();
  let templateRender = Handlebars.compile(template);
  return templateReder(this);
};

Team.all = [];

Team.loadAll = function(teamData) {
  Team.all = teamData(function(ele) {
    return new Team(ele)
  })
};

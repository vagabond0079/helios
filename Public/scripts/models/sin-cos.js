'use strict';

let translateBC = (angle) => {
  let transX = Math.sin(angle[0]);
  let transY = Math.cos(angle[0]);
  $(`.BC`).css(`top: calc(`+transX+` * 25vh), right: calc(`+transY+` * 25vh)`);
};

var Question = require('./question');

function Single(answer,identifier) {
  Question.call(this, answer,identifier);
}

Single.prototype = Object.create(Question.prototype);

Single.prototype.constructor = Single;

Single.prototype.getScore = function() {

  var score = 0;
  var singles = document.getElementsByName(this.identifier);

  var single = _.find(singles,{checked : true});

  var value = single ? single.value : '';

  return this.answer === value ? 10 : 0;

};

module.exports = Single;

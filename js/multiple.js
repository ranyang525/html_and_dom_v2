var Question = require('./question');

function Multiple(answer,identifier) {
  Question.call(this, answer,identifier);
}

Multiple.prototype = Object.create(Question.prototype);

Multiple.prototype.constructor = Multiple;

Multiple.prototype.getScore = function() {
  var score = 0;
  var multipleArray = [];
  var multiple = document.getElementsByName(this.identifier);
  for (var i = 0; i < multiple.length; i++) {
    if (multiple[i].checked === true) {
      multipleArray += multiple[i].value;
    }
  }
  if (this.answer.toString() === multipleArray.toString()) {
    score = 10;
  }
  return score;
};


module.exports = Multiple;

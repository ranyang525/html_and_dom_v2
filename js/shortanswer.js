var Question = require('./question');

function ShortAnswer(answer,identifier) {
  Question.call(this, answer,identifier);
}

ShortAnswer.prototype = Object.create(Question.prototype);

ShortAnswer.prototype.constructor = ShortAnswer;

ShortAnswer.prototype.getScore = function() {
    return this.answer === document.getElementById(this.identifier).value ? 20 :0;
};


module.exports = ShortAnswer;

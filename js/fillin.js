function FillIn(answer,identifier) {
  Question.call(this, answer,identifier);
}

FillIn.prototype = Object.create(Question.prototype);

FillIn.prototype.constructor = FillIn;

FillIn.prototype.getScore = function() {

  var score = 0;
  var answerArray = [];
  _.forEach(document.getElementsByName(this.identifier), function(input) {
    answerArray.push(input.value);
  });

  _.forEach(this.answer, function(array) {
    if(_.contains(answerArray, array)) {
      score += 5;
    }
  });

  return score;
};

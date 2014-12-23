var Question = require('./question');

function Estimate(answer,identifier) {
  Question.call(this, answer,identifier);
}

Estimate.prototype = Object.create(Estimate.prototype);

Estimate.prototype.constructor = Estimate;

Estimate.prototype.getScore = function() {
  var score = 0;
  var estimates = document.getElementsByName(this.identifier);

  var estimate = _.find(estimates,{checked:true});

  var value = estimate ? estimate.value : '';

  return this.answer === value ? 10:0;
};


module.exports = Estimate;

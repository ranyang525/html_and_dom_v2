(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ranyang/Projects/html_and_dom_v2/js/estimate.js":[function(require,module,exports){
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

},{"./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/fillin.js":[function(require,module,exports){
var Question = require('./question');

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

module.exports = FillIn;

},{"./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/main.js":[function(require,module,exports){

var FillIn = require('./fillin');
var Single = require('./single');
var Multiple = require('./multiple');
var Estimate = require('./estimate');
var ShortAnswer = require('./shortanswer');


$(document).ready(function() {
  $('#submit').on('click',function() {
    clickbox();
  });
});


function clickbox() {

  HasEmptyRequiredInput();

  document.getElementById("count").value = getScores();

  return false;
}

function getScores() {
  var score = 0;
  var answers = [
  new FillIn(['统一建模语言'],'1_1'),
  new FillIn(['封装性','继承性','多态性'],'1_2'),
  new Single('B','2_1'),
  new Single('A','2_2'),
  new Multiple('ABD','3_1'),
  new Multiple('ABC','3_2'),
  new Estimate('no','4_1'),
  new Estimate('yes','4_2'),
  new ShortAnswer('模型是对现实世界的简化和抽象,模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体;可以是某种图形;或者是一种数学表达式。','5_1')
  ];
  _.forEach(answers,function(answer){
    score += answer.getScore();
  });
  return score;
}

function HasEmptyRequiredInput() {
  var personInfos = ["className","studentNumber","studentName"];
  var information = ["班级","学号","姓名"];

  for (var i = 0; i < personInfos.length; i++) {
    //var personInfo = document.getElementById(personInfos[i]).value;
    var personInfo = $('#'+personInfos[i]).val();

    if (personInfo === "") {
      alert("请输入:" + information[i] + "!");
    }
  }
}

},{"./estimate":"/home/ranyang/Projects/html_and_dom_v2/js/estimate.js","./fillin":"/home/ranyang/Projects/html_and_dom_v2/js/fillin.js","./multiple":"/home/ranyang/Projects/html_and_dom_v2/js/multiple.js","./shortanswer":"/home/ranyang/Projects/html_and_dom_v2/js/shortanswer.js","./single":"/home/ranyang/Projects/html_and_dom_v2/js/single.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/multiple.js":[function(require,module,exports){
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

},{"./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/question.js":[function(require,module,exports){
function Question(answer,identifier) {
  this.identifier = identifier;
  this.answer = answer;
}

Question.prototype.getScore = function() {

};

module.exports = Question;

},{}],"/home/ranyang/Projects/html_and_dom_v2/js/shortanswer.js":[function(require,module,exports){
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

},{"./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/single.js":[function(require,module,exports){
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

},{"./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js"}]},{},["/home/ranyang/Projects/html_and_dom_v2/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvZXN0aW1hdGUuanMiLCJqcy9maWxsaW4uanMiLCJqcy9tYWluLmpzIiwianMvbXVsdGlwbGUuanMiLCJqcy9xdWVzdGlvbi5qcyIsImpzL3Nob3J0YW5zd2VyLmpzIiwianMvc2luZ2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vcXVlc3Rpb24nKTtcblxuZnVuY3Rpb24gRXN0aW1hdGUoYW5zd2VyLGlkZW50aWZpZXIpIHtcbiAgUXVlc3Rpb24uY2FsbCh0aGlzLCBhbnN3ZXIsaWRlbnRpZmllcik7XG59XG5cbkVzdGltYXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXN0aW1hdGUucHJvdG90eXBlKTtcblxuRXN0aW1hdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXN0aW1hdGU7XG5cbkVzdGltYXRlLnByb3RvdHlwZS5nZXRTY29yZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2NvcmUgPSAwO1xuICB2YXIgZXN0aW1hdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5pZGVudGlmaWVyKTtcblxuICB2YXIgZXN0aW1hdGUgPSBfLmZpbmQoZXN0aW1hdGVzLHtjaGVja2VkOnRydWV9KTtcblxuICB2YXIgdmFsdWUgPSBlc3RpbWF0ZSA/IGVzdGltYXRlLnZhbHVlIDogJyc7XG5cbiAgcmV0dXJuIHRoaXMuYW5zd2VyID09PSB2YWx1ZSA/IDEwOjA7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gRXN0aW1hdGU7XG4iLCJ2YXIgUXVlc3Rpb24gPSByZXF1aXJlKCcuL3F1ZXN0aW9uJyk7XG5cbmZ1bmN0aW9uIEZpbGxJbihhbnN3ZXIsaWRlbnRpZmllcikge1xuICBRdWVzdGlvbi5jYWxsKHRoaXMsIGFuc3dlcixpZGVudGlmaWVyKTtcbn1cblxuRmlsbEluLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUXVlc3Rpb24ucHJvdG90eXBlKTtcblxuRmlsbEluLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZpbGxJbjtcblxuRmlsbEluLnByb3RvdHlwZS5nZXRTY29yZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBzY29yZSA9IDA7XG4gIHZhciBhbnN3ZXJBcnJheSA9IFtdO1xuICBfLmZvckVhY2goZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5pZGVudGlmaWVyKSwgZnVuY3Rpb24oaW5wdXQpIHtcbiAgICBhbnN3ZXJBcnJheS5wdXNoKGlucHV0LnZhbHVlKTtcbiAgfSk7XG5cbiAgXy5mb3JFYWNoKHRoaXMuYW5zd2VyLCBmdW5jdGlvbihhcnJheSkge1xuICAgIGlmKF8uY29udGFpbnMoYW5zd2VyQXJyYXksIGFycmF5KSkge1xuICAgICAgc2NvcmUgKz0gNTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzY29yZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsbEluO1xuIiwiXG52YXIgRmlsbEluID0gcmVxdWlyZSgnLi9maWxsaW4nKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL3NpbmdsZScpO1xudmFyIE11bHRpcGxlID0gcmVxdWlyZSgnLi9tdWx0aXBsZScpO1xudmFyIEVzdGltYXRlID0gcmVxdWlyZSgnLi9lc3RpbWF0ZScpO1xudmFyIFNob3J0QW5zd2VyID0gcmVxdWlyZSgnLi9zaG9ydGFuc3dlcicpO1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICBjbGlja2JveCgpO1xuICB9KTtcbn0pO1xuXG5cbmZ1bmN0aW9uIGNsaWNrYm94KCkge1xuXG4gIEhhc0VtcHR5UmVxdWlyZWRJbnB1dCgpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRcIikudmFsdWUgPSBnZXRTY29yZXMoKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFNjb3JlcygpIHtcbiAgdmFyIHNjb3JlID0gMDtcbiAgdmFyIGFuc3dlcnMgPSBbXG4gIG5ldyBGaWxsSW4oWyfnu5/kuIDlu7rmqKHor63oqIAnXSwnMV8xJyksXG4gIG5ldyBGaWxsSW4oWyflsIHoo4XmgKcnLCfnu6fmib/mgKcnLCflpJrmgIHmgKcnXSwnMV8yJyksXG4gIG5ldyBTaW5nbGUoJ0InLCcyXzEnKSxcbiAgbmV3IFNpbmdsZSgnQScsJzJfMicpLFxuICBuZXcgTXVsdGlwbGUoJ0FCRCcsJzNfMScpLFxuICBuZXcgTXVsdGlwbGUoJ0FCQycsJzNfMicpLFxuICBuZXcgRXN0aW1hdGUoJ25vJywnNF8xJyksXG4gIG5ldyBFc3RpbWF0ZSgneWVzJywnNF8yJyksXG4gIG5ldyBTaG9ydEFuc3dlcign5qih5Z6L5piv5a+5546w5a6e5LiW55WM55qE566A5YyW5ZKM5oq96LGhLOaooeWei+aYr+WvueaJgOeglOeptueahOezu+e7n+OAgei/h+eoi+OAgeS6i+eJqeaIluamguW/teeahOS4gOenjeihqOi+vuW9ouW8j+OAguWPr+S7peaYr+eJqeeQhuWunuS9kzvlj6/ku6XmmK/mn5Dnp43lm77lvaI75oiW6ICF5piv5LiA56eN5pWw5a2m6KGo6L6+5byP44CCJywnNV8xJylcbiAgXTtcbiAgXy5mb3JFYWNoKGFuc3dlcnMsZnVuY3Rpb24oYW5zd2VyKXtcbiAgICBzY29yZSArPSBhbnN3ZXIuZ2V0U2NvcmUoKTtcbiAgfSk7XG4gIHJldHVybiBzY29yZTtcbn1cblxuZnVuY3Rpb24gSGFzRW1wdHlSZXF1aXJlZElucHV0KCkge1xuICB2YXIgcGVyc29uSW5mb3MgPSBbXCJjbGFzc05hbWVcIixcInN0dWRlbnROdW1iZXJcIixcInN0dWRlbnROYW1lXCJdO1xuICB2YXIgaW5mb3JtYXRpb24gPSBbXCLnj63nuqdcIixcIuWtpuWPt1wiLFwi5aeT5ZCNXCJdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGVyc29uSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAvL3ZhciBwZXJzb25JbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGVyc29uSW5mb3NbaV0pLnZhbHVlO1xuICAgIHZhciBwZXJzb25JbmZvID0gJCgnIycrcGVyc29uSW5mb3NbaV0pLnZhbCgpO1xuXG4gICAgaWYgKHBlcnNvbkluZm8gPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwi6K+36L6T5YWlOlwiICsgaW5mb3JtYXRpb25baV0gKyBcIiFcIik7XG4gICAgfVxuICB9XG59XG4iLCJ2YXIgUXVlc3Rpb24gPSByZXF1aXJlKCcuL3F1ZXN0aW9uJyk7XG5cbmZ1bmN0aW9uIE11bHRpcGxlKGFuc3dlcixpZGVudGlmaWVyKSB7XG4gIFF1ZXN0aW9uLmNhbGwodGhpcywgYW5zd2VyLGlkZW50aWZpZXIpO1xufVxuXG5NdWx0aXBsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFF1ZXN0aW9uLnByb3RvdHlwZSk7XG5cbk11bHRpcGxlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE11bHRpcGxlO1xuXG5NdWx0aXBsZS5wcm90b3R5cGUuZ2V0U2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNjb3JlID0gMDtcbiAgdmFyIG11bHRpcGxlQXJyYXkgPSBbXTtcbiAgdmFyIG11bHRpcGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5pZGVudGlmaWVyKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdWx0aXBsZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtdWx0aXBsZVtpXS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICBtdWx0aXBsZUFycmF5ICs9IG11bHRpcGxlW2ldLnZhbHVlO1xuICAgIH1cbiAgfVxuICBpZiAodGhpcy5hbnN3ZXIudG9TdHJpbmcoKSA9PT0gbXVsdGlwbGVBcnJheS50b1N0cmluZygpKSB7XG4gICAgc2NvcmUgPSAxMDtcbiAgfVxuICByZXR1cm4gc2NvcmU7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGU7XG4iLCJmdW5jdGlvbiBRdWVzdGlvbihhbnN3ZXIsaWRlbnRpZmllcikge1xuICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICB0aGlzLmFuc3dlciA9IGFuc3dlcjtcbn1cblxuUXVlc3Rpb24ucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb247XG4iLCJ2YXIgUXVlc3Rpb24gPSByZXF1aXJlKCcuL3F1ZXN0aW9uJyk7XG5cbmZ1bmN0aW9uIFNob3J0QW5zd2VyKGFuc3dlcixpZGVudGlmaWVyKSB7XG4gIFF1ZXN0aW9uLmNhbGwodGhpcywgYW5zd2VyLGlkZW50aWZpZXIpO1xufVxuXG5TaG9ydEFuc3dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFF1ZXN0aW9uLnByb3RvdHlwZSk7XG5cblNob3J0QW5zd2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNob3J0QW5zd2VyO1xuXG5TaG9ydEFuc3dlci5wcm90b3R5cGUuZ2V0U2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hbnN3ZXIgPT09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWRlbnRpZmllcikudmFsdWUgPyAyMCA6MDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTaG9ydEFuc3dlcjtcbiIsInZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vcXVlc3Rpb24nKTtcblxuZnVuY3Rpb24gU2luZ2xlKGFuc3dlcixpZGVudGlmaWVyKSB7XG4gIFF1ZXN0aW9uLmNhbGwodGhpcywgYW5zd2VyLGlkZW50aWZpZXIpO1xufVxuXG5TaW5nbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShRdWVzdGlvbi5wcm90b3R5cGUpO1xuXG5TaW5nbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2luZ2xlO1xuXG5TaW5nbGUucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHNjb3JlID0gMDtcbiAgdmFyIHNpbmdsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLmlkZW50aWZpZXIpO1xuXG4gIHZhciBzaW5nbGUgPSBfLmZpbmQoc2luZ2xlcyx7Y2hlY2tlZCA6IHRydWV9KTtcblxuICB2YXIgdmFsdWUgPSBzaW5nbGUgPyBzaW5nbGUudmFsdWUgOiAnJztcblxuICByZXR1cm4gdGhpcy5hbnN3ZXIgPT09IHZhbHVlID8gMTAgOiAwO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiJdfQ==

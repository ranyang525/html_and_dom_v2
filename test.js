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
var Question = require('./question');

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

},{"./estimate":"/home/ranyang/Projects/html_and_dom_v2/js/estimate.js","./fillin":"/home/ranyang/Projects/html_and_dom_v2/js/fillin.js","./multiple":"/home/ranyang/Projects/html_and_dom_v2/js/multiple.js","./question":"/home/ranyang/Projects/html_and_dom_v2/js/question.js","./shortanswer":"/home/ranyang/Projects/html_and_dom_v2/js/shortanswer.js","./single":"/home/ranyang/Projects/html_and_dom_v2/js/single.js"}],"/home/ranyang/Projects/html_and_dom_v2/js/multiple.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvZXN0aW1hdGUuanMiLCJqcy9maWxsaW4uanMiLCJqcy9tYWluLmpzIiwianMvbXVsdGlwbGUuanMiLCJqcy9xdWVzdGlvbi5qcyIsImpzL3Nob3J0YW5zd2VyLmpzIiwianMvc2luZ2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9xdWVzdGlvbicpO1xuXG5mdW5jdGlvbiBFc3RpbWF0ZShhbnN3ZXIsaWRlbnRpZmllcikge1xuICBRdWVzdGlvbi5jYWxsKHRoaXMsIGFuc3dlcixpZGVudGlmaWVyKTtcbn1cblxuRXN0aW1hdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFc3RpbWF0ZS5wcm90b3R5cGUpO1xuXG5Fc3RpbWF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFc3RpbWF0ZTtcblxuRXN0aW1hdGUucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzY29yZSA9IDA7XG4gIHZhciBlc3RpbWF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLmlkZW50aWZpZXIpO1xuXG4gIHZhciBlc3RpbWF0ZSA9IF8uZmluZChlc3RpbWF0ZXMse2NoZWNrZWQ6dHJ1ZX0pO1xuXG4gIHZhciB2YWx1ZSA9IGVzdGltYXRlID8gZXN0aW1hdGUudmFsdWUgOiAnJztcblxuICByZXR1cm4gdGhpcy5hbnN3ZXIgPT09IHZhbHVlID8gMTA6MDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBFc3RpbWF0ZTtcbiIsInZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vcXVlc3Rpb24nKTtcblxuZnVuY3Rpb24gRmlsbEluKGFuc3dlcixpZGVudGlmaWVyKSB7XG4gIFF1ZXN0aW9uLmNhbGwodGhpcywgYW5zd2VyLGlkZW50aWZpZXIpO1xufVxuXG5GaWxsSW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShRdWVzdGlvbi5wcm90b3R5cGUpO1xuXG5GaWxsSW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRmlsbEluO1xuXG5GaWxsSW4ucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHNjb3JlID0gMDtcbiAgdmFyIGFuc3dlckFycmF5ID0gW107XG4gIF8uZm9yRWFjaChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLmlkZW50aWZpZXIpLCBmdW5jdGlvbihpbnB1dCkge1xuICAgIGFuc3dlckFycmF5LnB1c2goaW5wdXQudmFsdWUpO1xuICB9KTtcblxuICBfLmZvckVhY2godGhpcy5hbnN3ZXIsIGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgaWYoXy5jb250YWlucyhhbnN3ZXJBcnJheSwgYXJyYXkpKSB7XG4gICAgICBzY29yZSArPSA1O1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNjb3JlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxsSW47XG4iLCJ2YXIgUXVlc3Rpb24gPSByZXF1aXJlKCcuL3F1ZXN0aW9uJyk7XG5cbnZhciBGaWxsSW4gPSByZXF1aXJlKCcuL2ZpbGxpbicpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vc2luZ2xlJyk7XG52YXIgTXVsdGlwbGUgPSByZXF1aXJlKCcuL211bHRpcGxlJyk7XG52YXIgRXN0aW1hdGUgPSByZXF1aXJlKCcuL2VzdGltYXRlJyk7XG52YXIgU2hvcnRBbnN3ZXIgPSByZXF1aXJlKCcuL3Nob3J0YW5zd2VyJyk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICQoJyNzdWJtaXQnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgIGNsaWNrYm94KCk7XG4gIH0pO1xufSk7XG5cblxuZnVuY3Rpb24gY2xpY2tib3goKSB7XG5cbiAgSGFzRW1wdHlSZXF1aXJlZElucHV0KCk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudFwiKS52YWx1ZSA9IGdldFNjb3JlcygpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NvcmVzKCkge1xuICB2YXIgc2NvcmUgPSAwO1xuICB2YXIgYW5zd2VycyA9IFtcbiAgbmV3IEZpbGxJbihbJ+e7n+S4gOW7uuaooeivreiogCddLCcxXzEnKSxcbiAgbmV3IEZpbGxJbihbJ+WwgeijheaApycsJ+e7p+aJv+aApycsJ+WkmuaAgeaApyddLCcxXzInKSxcbiAgbmV3IFNpbmdsZSgnQicsJzJfMScpLFxuICBuZXcgU2luZ2xlKCdBJywnMl8yJyksXG4gIG5ldyBNdWx0aXBsZSgnQUJEJywnM18xJyksXG4gIG5ldyBNdWx0aXBsZSgnQUJDJywnM18yJyksXG4gIG5ldyBFc3RpbWF0ZSgnbm8nLCc0XzEnKSxcbiAgbmV3IEVzdGltYXRlKCd5ZXMnLCc0XzInKSxcbiAgbmV3IFNob3J0QW5zd2VyKCfmqKHlnovmmK/lr7nnjrDlrp7kuJbnlYznmoTnroDljJblkozmir3osaEs5qih5Z6L5piv5a+55omA56CU56m255qE57O757uf44CB6L+H56iL44CB5LqL54mp5oiW5qaC5b+155qE5LiA56eN6KGo6L6+5b2i5byP44CC5Y+v5Lul5piv54mp55CG5a6e5L2TO+WPr+S7peaYr+afkOenjeWbvuW9ojvmiJbogIXmmK/kuIDnp43mlbDlrabooajovr7lvI/jgIInLCc1XzEnKVxuICBdO1xuICBfLmZvckVhY2goYW5zd2VycyxmdW5jdGlvbihhbnN3ZXIpe1xuICAgIHNjb3JlICs9IGFuc3dlci5nZXRTY29yZSgpO1xuICB9KTtcbiAgcmV0dXJuIHNjb3JlO1xufVxuXG5mdW5jdGlvbiBIYXNFbXB0eVJlcXVpcmVkSW5wdXQoKSB7XG4gIHZhciBwZXJzb25JbmZvcyA9IFtcImNsYXNzTmFtZVwiLFwic3R1ZGVudE51bWJlclwiLFwic3R1ZGVudE5hbWVcIl07XG4gIHZhciBpbmZvcm1hdGlvbiA9IFtcIuePree6p1wiLFwi5a2m5Y+3XCIsXCLlp5PlkI1cIl07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJzb25JbmZvcy5sZW5ndGg7IGkrKykge1xuICAgIC8vdmFyIHBlcnNvbkluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwZXJzb25JbmZvc1tpXSkudmFsdWU7XG4gICAgdmFyIHBlcnNvbkluZm8gPSAkKCcjJytwZXJzb25JbmZvc1tpXSkudmFsKCk7XG5cbiAgICBpZiAocGVyc29uSW5mbyA9PT0gXCJcIikge1xuICAgICAgYWxlcnQoXCLor7fovpPlhaU6XCIgKyBpbmZvcm1hdGlvbltpXSArIFwiIVwiKTtcbiAgICB9XG4gIH1cbn1cbiIsInZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vcXVlc3Rpb24nKTtcblxuZnVuY3Rpb24gTXVsdGlwbGUoYW5zd2VyLGlkZW50aWZpZXIpIHtcbiAgUXVlc3Rpb24uY2FsbCh0aGlzLCBhbnN3ZXIsaWRlbnRpZmllcik7XG59XG5cbk11bHRpcGxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUXVlc3Rpb24ucHJvdG90eXBlKTtcblxuTXVsdGlwbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTXVsdGlwbGU7XG5cbk11bHRpcGxlLnByb3RvdHlwZS5nZXRTY29yZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2NvcmUgPSAwO1xuICB2YXIgbXVsdGlwbGVBcnJheSA9IFtdO1xuICB2YXIgbXVsdGlwbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLmlkZW50aWZpZXIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG11bHRpcGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG11bHRpcGxlW2ldLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgIG11bHRpcGxlQXJyYXkgKz0gbXVsdGlwbGVbaV0udmFsdWU7XG4gICAgfVxuICB9XG4gIGlmICh0aGlzLmFuc3dlci50b1N0cmluZygpID09PSBtdWx0aXBsZUFycmF5LnRvU3RyaW5nKCkpIHtcbiAgICBzY29yZSA9IDEwO1xuICB9XG4gIHJldHVybiBzY29yZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZTtcbiIsImZ1bmN0aW9uIFF1ZXN0aW9uKGFuc3dlcixpZGVudGlmaWVyKSB7XG4gIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gIHRoaXMuYW5zd2VyID0gYW5zd2VyO1xufVxuXG5RdWVzdGlvbi5wcm90b3R5cGUuZ2V0U2NvcmUgPSBmdW5jdGlvbigpIHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWVzdGlvbjtcbiIsInZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vcXVlc3Rpb24nKTtcblxuZnVuY3Rpb24gU2hvcnRBbnN3ZXIoYW5zd2VyLGlkZW50aWZpZXIpIHtcbiAgUXVlc3Rpb24uY2FsbCh0aGlzLCBhbnN3ZXIsaWRlbnRpZmllcik7XG59XG5cblNob3J0QW5zd2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUXVlc3Rpb24ucHJvdG90eXBlKTtcblxuU2hvcnRBbnN3ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2hvcnRBbnN3ZXI7XG5cblNob3J0QW5zd2VyLnByb3RvdHlwZS5nZXRTY29yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFuc3dlciA9PT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZGVudGlmaWVyKS52YWx1ZSA/IDIwIDowO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNob3J0QW5zd2VyO1xuIiwidmFyIFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9xdWVzdGlvbicpO1xuXG5mdW5jdGlvbiBTaW5nbGUoYW5zd2VyLGlkZW50aWZpZXIpIHtcbiAgUXVlc3Rpb24uY2FsbCh0aGlzLCBhbnN3ZXIsaWRlbnRpZmllcik7XG59XG5cblNpbmdsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFF1ZXN0aW9uLnByb3RvdHlwZSk7XG5cblNpbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTaW5nbGU7XG5cblNpbmdsZS5wcm90b3R5cGUuZ2V0U2NvcmUgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgc2NvcmUgPSAwO1xuICB2YXIgc2luZ2xlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRoaXMuaWRlbnRpZmllcik7XG5cbiAgdmFyIHNpbmdsZSA9IF8uZmluZChzaW5nbGVzLHtjaGVja2VkIDogdHJ1ZX0pO1xuXG4gIHZhciB2YWx1ZSA9IHNpbmdsZSA/IHNpbmdsZS52YWx1ZSA6ICcnO1xuXG4gIHJldHVybiB0aGlzLmFuc3dlciA9PT0gdmFsdWUgPyAxMCA6IDA7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIl19

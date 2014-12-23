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

var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (event) {
  if (!started) {
    $("h1").html("Level " + level);
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userColor = this.id;
  $("#" + userColor).addClass("pressed");
  makeSound(userColor);
  userPattern.push(userColor);
  setTimeout(function () {
    $("#" + userColor).removeClass("pressed");
  }, 100);
  checkAnswer(userPattern.length - 1);
});

function nextSequence() {
  userPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomColor);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
      console.log("Success");
      if(userPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence()
        },1000);
      }
    }
    else{
      console.log("Wrong");
      new Audio("sounds/wrong.mp3").play();
      $("body").addClass("gameOver");
      $("h1").html("Game over! Press Any Key to Restart!");
      setTimeout(function(){
        $("body").removeClass("gameOver");
      },400);
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function makeSound(key) {
  switch (key) {
    case "green":
      var gsound = new Audio("sounds/green.mp3");
      gsound.play();
      break;
    case "red":
      var rsound = new Audio("sounds/red.mp3");
      rsound.play();
      break;
    case "yellow":
      var ysound = new Audio("sounds/yellow.mp3");
      ysound.play();
      break;
    case "blue":
      new Audio("sounds/blue.mp3").play();

      break;
    default:
      break;
  }
}

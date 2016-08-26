$(document).ready(function() {
  var playerBankroll = 100;
  var statusBar = document.getElementById("statusBar");

  $("#input").click(function(){
    var playerBet = parseInt(document.getElementById("playerBet").value);
    var playerGuess = parseInt(document.getElementById("playerGuess").value);

    evaluate(playerBet, playerGuess);
  });
 
  var evaluate = function(playerBet, playerGuess) {
    
    var randomNumber = Math.floor((Math.random() * 10) + 1);

    if (playerGuess == randomNumber) {
      playerBankroll += playerBet;
      checkForMaxStatusBar();
      statusBar.value += playerBet;
      displayResult("Correct", randomNumber, playerGuess);
    } else {
      if ((playerGuess === randomNumber - 1) || (playerGuess === randomNumber + 1)) {
        displayResult("Close", randomNumber, playerGuess);
      } else {
        playerBankroll -= playerBet;
        statusBar.value -= playerBet;
        displayResult("Wrong", randomNumber, playerGuess);
      }
    }

    if (playerBankroll <= 0) {
      playerBankroll = 0;
      disableButton();
      displayResult("Game Over");
      hideParameters();
      displayRestartButton();
    };
  };

  var displayResult = function(result, randomNumber, playerGuess) {
    document.getElementById("result").innerHTML = result + "!! You have: " + playerBankroll + " points remaining";
    document.getElementById("displayGuess").innerHTML = "You guessed: " + playerGuess;
    document.getElementById("displayRandom").innerHTML = "Correct number is: " + randomNumber;
  };


  var disableButton = function(){
    document.getElementById("input").disabled = true;
  };

  var displayRestartButton = function(){
    myButton = document.createElement("input");
    myButton.type = "button";
    myButton.value = "Try Again";
    myButton.className = "btn btn-primary btn-success";
    myButton.onclick = function() { 
      window.location.reload(false);  
    };
    placeHolder = document.getElementById("restart_button");
    placeHolder.appendChild(myButton);
  }

  var checkForMaxStatusBar = function() {
    if (playerBankroll > statusBar.max) {
      statusBar.max += (playerBankroll - statusBar.max)
    };
  }

  var hideParameters = function() {
    document.getElementById('displayGuess').style.display = 'none';
    document.getElementById('displayRandom').style.display = 'none';
  };
});























/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var winningNumber,tries=[];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  var winningNum=Math.random();
  winningNum*=100;
  winningNum=Math.floor(winningNum);
  return winningNum;
}

// Fetch the Players Guess

function playersGuessSubmission(){
  var playersGuess = $("#numberinput").val();
  playersGuess = Number(playersGuess);
  checkGuess(playersGuess);
  $("#numberinput").val("");
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(playersGuess){
  if (playersGuess > winningNumber){
      return "Your guess is higher";
  }
  else {
      return "Your guess is lower";
  }
}  //end lowerOrHigher

function guessMessage(playersGuess){
      var string="";
      var lowOrHigh = lowerOrHigher(playersGuess);
      var winDistance = playersGuess-winningNumber;
      winDistance=Math.abs(winDistance);
      if(winDistance>20){
        string=lowOrHigh + " and more than 20 digits away.";
      }
      else if((winDistance <= 20) && (winDistance > 10)){
        string=lowOrHigh;
      }
      else if(winDistance <= 5){
        string=lowOrHigh + " and within 5 digits away.";
      }
      else if(winDistance <= 10){
        string=lowOrHigh + " and within 10 digits away.";
      }
      return string;    
} //end guessMessage



// Check if the Player's Guess is the winning number 

function checkGuess(playersGuess){

  //correct guess & winning code block
  if (playersGuess == winningNumber){
    $("#guessLeft").text("You Win!");
    $("#guessLeft").css({"font-family": "Aller_Bold",
  "font-size": "80px", "letter-spacing": "2px","color": "red"});
    //animate win
    animateWin();
  }//end if

  //incorrect guess code block
  else{
         var message = guessMessage(playersGuess); 
        $("#youAre").text(message);
        if(tries.indexOf(playersGuess) !== -1){
          $("#youAre").text("Duplicate number,");
          return;
        }//end if

    tries.push(playersGuess);
    $("#tryAgainBlock").css("visibility","visible");
    $("#tryAgainBlock").insertAfter( "#submitButton" );
    var triesLeft=(5-(tries.length));
      if (triesLeft == 0){
        $("#guessLeft").text("Sorry, Game Over!");
        $("#guessLeft").css({"font-family": "Aller_Bold",
      "font-size": "60px", "letter-spacing": "2px","color": "red"});
            $("#tryNum").text("0");
      }
      else{
      $("#tryNum").text(triesLeft);
        }
  }//end else
} //end checkGuess function



// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  var hintArray=[];
    function hintGenerator(){
    var hintCount=(((5-tries.length)*2)-1);
          function buildHints(){
            var hintNum=Math.random();
          hintNum*=100;
          hintNum=Math.floor(hintNum);
          return hintNum;
          }//end buildHints
    hintArray.push(winningNumber);
    for (i=0;i<hintCount;i++){
      var num = buildHints();
      if ((tries.indexOf(num)) == -1 && (hintArray.indexOf(num)) == -1  && num !==0){
      hintArray.push(num);
      }//end if
      else{
        i--;
      }
    }
    hintArray.sort();
    return hintArray;
    }//end hintGenerator
    //remove any li from page first
    $("li").remove();
  // call the hint Generator
      hintGenerator();
  
  //load hintArray into pop up hint page
  for (var i=0;i<hintArray.length; i++){
        var str=(hintArray[i].toString());
        var stuff = ("<li>" + str + "</li>");
        $("#listOfhints").after (stuff);
    }//end loop
    console.log("hintArray is "+hintArray);
    //launch modal window with hints
    $('#hintDisplay').lightbox_me({
            centered: true,
            overlaySpeed: 0,
            onLoad: function() { 
                $('#hintDisplay').css("visibility","visible");
                } //end onLoad
            });//end lightbox_me

}// end provideHint


// Allow the "Player" to Play Again

function playAgain(){
  winningNumber=0;
  tries=[]
  location.reload();
}

function animateWin(){
        var div=$("#gameDiv");
        div.animate({
          height: '1000px',
          width: '90%',
          opacity: '0.5'
        }, 
          "slow");
        div.animate({
          height: '720px',
          width: '75%',
          opacity: '1.0'
        }, 
          "slow");

          var text=$("#guessLeft");
        text.animate({
          letterSpacing: '30px'
        }, 
          "slow");
        text.animate({
          letterSpacing: '2px'
        }, 
          "slow");  

         var text=$("#headline");
        text.animate({
          letterSpacing: '30px',
          color: 'red'
        }, 
          "slow");
        text.animate({
          letterSpacing: '1px',
          color: 'rgb(45,87,162)'
        }, 
          "slow"); 
}



winningNumber=generateWinningNumber();

/* **** Event Listeners/Handlers ****  */

//get player's number guess with enter key
$(document).on("keydown", function (event) {
        if (event.which === 13){
              playersGuessSubmission();
        }//end if
  });

//get player's number guess with click key
$( "#submitButtonInside" ).click(function() {
  playersGuessSubmission();
});

//click get hint
$( "#giveMeAHint" ).click(function() {
  provideHint();
});

//click play again
$( "#playAgain" ).click(function() {
  playAgain();
});






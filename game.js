var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

$(document).on("keydown", function(){
    if(started){
        nextSequence();
        started = false;
    }
})

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=>{
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}



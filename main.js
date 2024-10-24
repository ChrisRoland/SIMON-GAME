// $("h1").mouseover(function() {
//     $("h1").css("color", "blue");
// })
// $("h1").mouseout(function() {
//     $("h1").css("color", "");
// })

// var userClickedPattern = [];

// var gamePattern = [];

// var buttonColors = ["red", "blue", "green", "yellow"];

// function nextSequence() {

//     var randomNumber = Math.floor(Math.random()* 4);
//     var randomChosenColors = buttonColors[randomNumber];
//     gamePattern.push(randomChosenColors);

//     console.log(gamePattern);

//     $("#" + randomChosenColors).fadeOut(100).fadeIn(100);

//     $(document).keypress(function() {
//         var userChosenColor = $("btn").attr();

//         if(userChosenColor === "green") {

//         }

//         var audio = new Audio('sounds/' + randomChosenColors + '.mp3');
//         audio.play();
//     });

// };

// nextSequence();

var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

// Detect when a key is pressed for the first time to start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".play-click").click(function() {
    
    if (!started) {
        $(".simon-btn").addClass("clicked");
        setTimeout(function() {
            $(".simon-btn").removeClass("clicked");
        }, 100);
        nextSequence();
        started = true;
    }
});

// Detect when any of the buttons are clicked
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Call checkAnswer() after the user has clicked
    checkAnswer(userClickedPattern.length - 1); // Pass the index of the last clicked color
});

function nextSequence() {
    userClickedPattern = []; // Reset userClickedPattern for the next level

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Check if the user's answer matches the game pattern
function checkAnswer(currentLevel) {
    // Check if the user's clicked pattern matches the game pattern at this step
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if the user has completed the current sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence() after 1000 ms delay if the entire sequence is correct
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong"); // Play the wrong sound
        $("body").addClass("game-over"); // Flash the background to indicate a mistake
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); // Show game over message

        startOver(); // Restart the game
    }
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("simon-btn").removeClass("clicked");
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0; // Reset the level
    gamePattern = []; // Clear the game pattern
    started = false; // Reset the started flag
}

$("button").click(function() {
    $(".how-to").slideToggle();
  });


// Get & Store Date
var today = new Date();
today = today.getFullYear();

// Check Date
console.log(today);

// Display Date
$('.year').text(today);

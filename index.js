gamePattern = []
userClickedPattern = []
level = 0

//In an event, "this" refers to the element that received the event.
$(".btn").on("click", function () {
	userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	effect(userChosenColour);
	makeSound(userChosenColour);
	addAnimation(userChosenColour);

	chickAnswer()
});

$(document).on("keypress", function () {
		if (gamePattern == 0) {
			nextSequence()
		}
});

$("h1").on("click", function () {
		if (gamePattern == 0) {
			nextSequence()
		}
});

function nextSequence() {
	userClickedPattern = []

	buttonColours = ["red", "blue", "green", "yellow"];
	$("h1").text("Level " + level);
	level++;

	randomNumber = Math.round(Math.random()*3);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	effect(randomChosenColour);
	makeSound(randomChosenColour);
}

function effect(Colour) {
	$("#" + Colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeSound(Colour) {
	var sound = new Audio("./sounds/" + Colour + ".mp3");
	sound.play();
}

function addAnimation(Colour) {
	$("#" + Colour).addClass("pressed");

	setTimeout(function () {
		$("#" + Colour).removeClass("pressed");
	}, 100)
}

function chickAnswer() {
	if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {
		if (gamePattern.length == userClickedPattern.length) {
			setTimeout(function () {
				nextSequence()
			}, 1000)
		}
	} else {
		startOver()
	}
}

function startOver() {
	makeSound("wrong")

	$("body").addClass("game-over");

	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 200)

	$("h1").html("Game Over</br>Press Any Key to Restart</br>or Tap on The Title");
	gamePattern = [];
	level = 0;
}

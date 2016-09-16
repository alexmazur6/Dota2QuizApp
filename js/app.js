$(document).ready(function() {

	var questionList = [".q1", ".q2", ".q3", ".q4", ".q5"];
	var answerList = ["a", "c", "a", "d", "b"];
	var currentQuestion = 0;
	var score = 0;
	var questionAnswered = false;

	$("#menu-button").on('click', function() {
		startGame();
	});

	$(".answer-list").children("li").on('click', function(event) {
		
		if (questionAnswered == false) {
			var buttonClicked = $(this).attr('class');

			if (buttonClicked == answerList[currentQuestion]) {
				$(".answer").text("Correct!");
				score++;
			}
			else {
				$(".answer").text("Inccorect! The answer was: " + answerList[currentQuestion]);
			}

			currentQuestion++;
			updateCorrectCount();
			questionAnswered = true;
			console.log("button clicked");

		}

		$(".next-question").on('click', function() {

			questionAnswered = false;
			console.log("yo hell0");
			nextQuestion();

			if (currentQuestion == 5) {
				beginMenuToEndMenu();
			}
			else {
				updateCorrectCount();
			}
		});
	});

	

	function startGame() {
		score = 0;
		currentQuestion = 0;
		questionAnswered = false;
		$(".menu").hide();
		$(".question-list").show();
		$(".question").hide();
		$(".q1").show();
		updateCorrectCount();
	}

	function nextQuestion() {
		$(questionList[currentQuestion - 1]).hide();
		$(questionList[currentQuestion]).show();
		$(".answer").text("Answer");
	}

	function updateCorrectCount() {
		$(".total").text(currentQuestion);
		$(".correct").text(score);
	}

	function beginMenuToEndMenu() {
		$(".menu").show();
		$(".menu").children("h1").text("Overall Score: " + score + " out of 5");
		$("#menu-button").text("Try Again!")
	}
});
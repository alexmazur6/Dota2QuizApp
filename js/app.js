$(document).ready(function() {

	var beginMenuBio = "A short quiz on some aspects of the popular video game Dota 2";
	var endMenuBio = "Congrats on finishing my quiz!";


	$("#menu-button").on('click', function() {
		$(".menu").children("p").text(beginMenuBio);
		quiz = Object.create(Quiz);
		$(".menu").hide();
		quiz.appendQuestion();
	});

	function answerListener() {
		$(".answer-list").children("li").on('click', function(event) {
			if (quiz.questionAnswered == false) {
				
				quiz.questionAnswered = true;
				
				var buttonClicked = $(this).attr('class');

				if (quiz.isCorrect(buttonClicked)) {
					quiz.score++;
					$(".answer").text("Correct!");
				}
				else {
					$(".answer").text("Inccorect! The answer was: " + quiz.questions[quiz.questionCounter].answer);
				}

			}

			$(".correct").text(quiz.score);

		});
	}

	function nextQuestionListener() {
		$(".next-question").on('click', function() {
			if (quiz.questionAnswered) {
				quiz.questionCounter++;
				$(".question").remove();

				if (quiz.questionCounter == quiz.questions.length) {
					quiz.displayScore();
				}
				else {
					quiz.appendQuestion();
					quiz.questionAnswered = false;
				}

			}
		});
	}

	var Quiz = {
		score:0,

		questionCounter:0,

		questionAnswered: false,

		questions: [
			{question: "When does night time first begin each game?", answer: "a"},
			{question: "Which creep cannot spawn in a medium neutral camp?", answer: "c"},
			{question: "Which runes spawn at the 0 minute marker?", answer: "a"},
			{question: "At what time can you upgrade the courier to a flying courier?", answer: "d"},
			{question: "What is your movespeed set to upon activating a haste rune?", answer: "b"},
		],

		answerList: [
			{a: "4:00", b: "8:00", c:"2:00", d:"3:00"},
			{a: "Centaurs", b: "Mud Golems", c:"Hellbears", d:"Wolf Camp"},
			{a: "Bounty", b: "Haste", c:"Double Damage", d:"Invisibility"},
			{a: "0:00", b: "5:00", c:"1:00", d:"3:00"},
			{a: "500ms", b: "522ms", c:"322ms", d:"515ms"},
		],

		isCorrect:function(check) {
			if (check === this.questions[this.questionCounter].answer) {
				return true;
			}
			else {
				return false;
			}
		},

		appendQuestion:function() {
			$("body").append(
				"<div class=\"question\"></div>"
			);
			$(".question").append(
				"<h3>Question "+ (this.questionCounter + 1) + " of " + this.questions.length + "</h3>",					
				"<p>" + this.questions[this.questionCounter].question + "</p>",
				"<ul class=\"answer-list\"></ul>",
				"<p>Current Score: <span class=\"correct\">" + this.score + "</span> out of " + (this.questions.length) + "</p>",
				"<h4 class=\"answer\">Answer</h4>",
				"<button class=\"next-question\">Next Question</button>"
			);
			$(".answer-list").append(
				"<li class=\"a\">a<button>" + this.answerList[this.questionCounter].a + "</button></li>",
				"<li class=\"b\">b<button>" + this.answerList[this.questionCounter].b + "</button></li>",
				"<li class=\"c\">c<button>" + this.answerList[this.questionCounter].c + "</button></li>",
				"<li class=\"d\">d<button>" + this.answerList[this.questionCounter].d + "</button></li>"
			);

			answerListener();
			nextQuestionListener();
		},

		displayScore:function() {
			$(".menu").children("h1").text("Your score was: " + this.score + " out of " + this.questions.length);
			$("#menu-button").text("Try Again!");
			$(".menu").children("p").text(endMenuBio);
			$(".menu").show();
		}
	};

});
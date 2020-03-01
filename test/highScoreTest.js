// checks to see if the program correctly sorts the 
// high scores

function sortHighScoresTest(){

	a = 10;
	b = 20;
	var assert = require('assert');

	highscore = writeHighScores;

	// should only return 1 based on the program
	// because a is less than b
	
	function(a,b){
	
		if (writeHighScores == 1){

			console.log("The high scores are sorted correctly");
			assert(10<20);
			return true;
		}
		else{
	
			console.log("The high scores are not sorted correctly");
			return false;
		}
	}
}

// checks to see if the program correctly
// separates the high scores to be compared

function separateHighScoresTest(){

	var assert = require('assert');
	var highscores = ["10","30","50","70"]
	highscores = highscores.slice(0,3);		

	assert.equal(highscores[0], 10, "highscores separated correctly");
	assert.equal(highscores[3], 70, "highscores separated correctly");
}

// checks to see if the high scores
// are saved correctly

function saveScoresTest(){

	var state = isStateSaved;
	var assert = require('assert');
	
	assert.notEqual(state, {}, "the state of the high scores is saved");
	
	assert.notEqual(state, undefined, "the state of the high scores is saved");
	
	if(state != {} && state != undefined){

                return true;
        }
}

// checks if the high score stays when there is 
// a new game

function newGameScoreTest(){

	var assert = require('assert');

	var scores = saveScoresTest;

	// variable gameState from save-state.js file
	// a game is restarted when gameState is 0
	
	assert.Equal(scores, true, "the scores have been saved");
	assert.Equal(gameState, 0, "there is a new game being started");

	if(gameState == 0 and scores == true){

		return true;
	}
}

// checks to see if the scores are being added together correctly
// so that the overall high score feature can use the score feature

function addScoreTest(){

	var assert = require('assert');

	var count;

	if(hex.blocks[arr[0]][arr[1]].deleted == 1){
		
		count++;
		
		assert.Equal(score, count, "the score has been added to"); 

		if(score == count){

			return true;
		}				
	}

}

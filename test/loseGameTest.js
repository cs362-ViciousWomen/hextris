//this function checks to see if the game is over
function gameOver() {
	var over = checkGameOver();
	
	if (over == true) {
		console.log("The program properly ends the game when all conditions apply");
		return true;
	}
	else {
		console.log("The test fails. The game should end but does not.");
		return false;
	}	
}

//this function makes sure the program properly displays the game being over
function showOver() {
	var show = gameOverDisplay();
	
	if (show == true) {
		console.log("The program properly displayes the "Game Over" message for the user when the game is over.");
		return true;
	}
	else {
		console.log("The program does not display that the game is over when it should.");
		return false;
	} 	
}

//this function determines if the game ends only when the blocks reach a certain height
function checksBounds() {
	var bound = isInfringing(hex);
	
	if(bound == true) {
		if (hex.blocks[i].length - total > settings.rows) {
			return true;
		}
	}
	else {
		return false;
	}
}

//this function makes sure the pause button does not end the game entirely
function onlyPause() {
	var pausable = true;
	//the game should be able to be paused when the game is being played and is still in action
	if (gameState == -1) {
		gameState = prevGameState;
		pausable = true;
		console.log("The game is properly paused.");
		return true;
	}
	else if (game state != -2 && gameState != 0 && gameState!=2) {
		prevGameState = gameState;
		pausable=true;
		console.log("The game is properly paused.");
		return true;
	}
	else {
		console.log("The game is not properly paused. The user cannot know if they lost or won.");
		return false;
	}
}

//this function makes sure that the blocks are being deleted so that the game does not lose
function testDeletion() {
	var deletion = checkColorTest;

	if (deletion == true) {
		console.log("The blocks are being deleted properly so the user does not unfaily lose the game.");
		return true;
	}
	else {
		console.log("The blocks are not being deleted properly.");
		return false;
	}
}

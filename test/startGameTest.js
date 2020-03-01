//this function tests to see if every game begins with the start home screen
function initializeStart(){
	bool start = setStartScreen();
	
	if (start == 1) {
		console.log("The home screen accurately initializes the start game feature.");
		return true;
	}
	else if (start == 0) {
		console.log("The start game feature is not initialized on the home screen.");
		return false;
	}
}

//this function checks to see if the game properly responds whenn the user clicks the start button
function handleStart() {
	bool start = startBtnHandler();

	//check if mobile vs. on larger screen
	if(settings.platforn == "mobile") {
		if (start == 1) {
			console.log("The game begins when the start button is clicked.");
			return true;
		}
		else (start = 0) {
			console.log("The game fails to begin when the start button is clicked.");
			return true;
		}
	}
	else {
		if (start == 1) {
                        console.log("The game begins when the start button is clicked.");       
                        return true;
        	}
	        else (start = 0) {
                        console.log("The game fails to begin when the start button is clicked.");       
                        return true;
                }
	}		
}

//this test determines if the game starts again after being paused
function hnadleResume() {
	bool ifPaused = handlePause();
	bool resume = resumeGame();

	if (ifPaused == 1) {
		if (resume == 1) {
			console.log("The game resumes when the user chooses to.");
			return true;
		}
		else (pause == 0) {
			console.log("The game does not continue playing when the user wants to resume the game.");
			return false;
		}
	}
	//when game is not paused, return false for this test
	else {
		return false;
	}
}

//this function makes sure that a new game cannot begin while the user is already playing a game
function whilePlaying() {
	if (gameState == 1) {
		console.log("A game is already taking place. A new game can only be started if the page is refreshed.");
		return false;
	}
	else if ((gameState == -1) || (gameState == 0) {
		console.log("The user either lost or is not playing a game. A new game can be started at this point.");
		return true;
	}	 	
}

//this function makes sure that the user did not enter bad keys for their input to start the game
function badKeys() {
	$('#startBtn').off();
	//for mobile settings
	if(settings.platform == 'mobile') {
		S('#startBtn').on('touchstart', startBtnHandler);
		return true;
	}
	//for nonmobile settings
	else if(settings.platform == 'nonmobile'){
		$('#startBtn').on('mousedown', startBtnHandler);
		return true;
	}
	else {
		console.log("The user entered a key that cannot start the game.");
		return false;
	}
}

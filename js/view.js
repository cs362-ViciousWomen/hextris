/******************************************************************************
File Name: view.js
File Description: This file is responsible for the layout and rendering of
                  each page of the program, depending on the game state. It
                  accounts for all of the elements associated with each page,
                  including: text, scoreboard, polygons, buttons, etc. These
                  functions should be called in other files, such as main.js
                  or Text.js, where specific elements need to be rendered.
******************************************************************************/

/******************************************************************************
Function Name: easeOutCubic
Function Description: This function accounts for a cubic operation to be
                      performed. It takes the current time, beginning value,
                      the change in value, and the duration as parameters, and
                      returns a value based on the correct arithmetic expression.
******************************************************************************/
// t: current time, b: begInnIng value, c: change In value, d: duration
function easeOutCubic(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}
/******************************************************************************
Function Name: renderText
Function Description: This function is responsible for rendering, ie. outputting
                      the correct text to the game environment. It accounts for
                      all possible features of the text including size, color,
                      font, etc.
******************************************************************************/
function renderText(x, y, fontSize, color, text, font) {
	ctx.save();
	if (!font) { //If no font is declared, set as default
		var font = '20px Exo';
	}

	fontSize *= settings.scale; //Determine font size based on scale
	ctx.font = fontSize + font; //Set font characteristic as font type and size
	ctx.textAlign = 'center'; //Show text in center
	ctx.fillStyle = color; //Set fillStyle characteristic with color parameter
	ctx.fillText(text, x, y + (fontSize / 2) - 9 * settings.scale); //Call fillText with designated values
	ctx.restore(); //Call restore to render text to screen
}

/******************************************************************************
Function Name: drawScoreboard
Function Description: This function draws the scoreboard element shown during
                      game run time. It renders the shape, size, color, input,
                      etc. to the game environment.
******************************************************************************/
function drawScoreboard() {
	if (scoreOpacity < 1) { //Check score opacity, increase it if < 1
		scoreOpacity += 0.01;
		textOpacity += 0.01;
	}
	ctx.globalAlpha = textOpacity;
	var scoreSize = 50; //Initialize scoreSize to 50
	var scoreString = String(score); //Save score to string variable
	//Determine scoreSize variable based on the length of the score
	if (scoreString.length == 6) {
		scoreSize = 43;
	} else if (scoreString.length == 7) {
		scoreSize = 35;
	} else if (scoreString.length == 8) {
		scoreSize = 31;
	} else if (scoreString.length == 9) {
		scoreSize = 27;
	}

	var color = "rgb(236, 240, 241)"; //Set color of scoreboard

    var fontSize = settings.platform == 'mobile' ? 35 : 30; //Set font size (account for mobile users)
    var h = trueCanvas.height / 2 + gdy + 100 * settings.scale;
	//Check to see if new game screen is shown
	if (gameState === 0) {
		renderStart(fontSize); //Render Start Game Screen
	//Check to see if game is in play
	} else if (gameState != 0 && textOpacity > 0) {
		renderPlay(scoreSize, color, score); //Render game play screen
	} else {
		ctx.globalAlpha = scoreOpacity;
		renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
	}

	ctx.globalAlpha = 1; //Reset globalAlpha variable
}

/******************************************************************************
Function Name: renderStart
Function Description: This function holds all the characteristics for
                      rendering the Start Game screen. All elements should be
                      correctly outputted to the game environment.
******************************************************************************/
function renderStart(fontSize){
    renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale,
        trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)",
        String.fromCharCode("0xf04b"), 'px FontAwesome'); //Render Icons
    renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale,
        trueCanvas.height / 2.1 + gdy - 155 * settings.scale,
        150, "#2c3e50", "Hextris"); //Render Title
    renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale,
        h + 10, fontSize, "rgb(44,62,80)", 'Play!'); //Render Start button
}

/******************************************************************************
Function Name: renderPlay
Function Description: This function holds all the characteristics for
                      rendering the normal Game screen. All elements should be
                      correctly outputted to the game environment.
******************************************************************************/
function renderPlay(scoreSize, color, score){
    textOpacity -= 0.05;
    renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale,
        trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)",
        String.fromCharCode("0xf04b"), 'px FontAwesome'); //Render icons
    renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale,
        trueCanvas.height / 2 + gdy - 155 * settings.scale,
        150, "#2c3e50", "Hextris"); //Render Title
    renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale,
        h, fontSize, "rgb(44,62,80)", 'Play!'); //Render Start button
    ctx.globalAlpha = scoreOpacity;
    renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy,
                scoreSize, color, score); //Render Score
}

/******************************************************************************
Function Name: clearGameBoard
Function Description: This function is responsible for clearing the game board,
                      i.e. deleting all of the blocks from the hexagon
******************************************************************************/
function clearGameBoard() {
	drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6,
	            trueCanvas.width / 2, 30, hexagonBackgroundColor,
	            0, 'rgba(0,0,0,0)'); //Renders empty hexagon
}

/******************************************************************************
Function Name: drawPolygon
Function Description: This function draws the center hexagon. It accounts for
                      the color, size, etc. accordingly. It is called whenever
                      the game is being played or has restarted.
******************************************************************************/
function drawPolygon(x, y, sides, radius, theta, fillColor, lineWidth, lineColor) {
	//Sets polygon characteristics with parameter values
	ctx.fillStyle = fillColor;
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;

	ctx.beginPath(); //Begins drawing polygon
	var coords = rotatePoint(0, radius, theta);
	//Draws one line to given coordinates
	ctx.moveTo(coords.x + x, coords.y + y);
	var oldX = coords.x;
	var oldY = coords.y;
	//Rotates from old coordinates and draws line to new coordinates
	//Loops until all sides of the polygon has been drawn (6 for hexagon)
	for (var i = 0; i < sides; i++) {
		coords = rotatePoint(oldX, oldY, 360 / sides);
		ctx.lineTo(coords.x + x, coords.y + y);
		oldX = coords.x;
		oldY = coords.y;
	}
    //Finishes drawing polygon
	ctx.closePath();
	ctx.fill(); //Fills polygon with color
	ctx.stroke(); //Outlines polygon
	ctx.strokeStyle = 'rgba(0,0,0,0)';
}

/******************************************************************************
Function Name: toggleClass
Function Description: This function toggles a certain element from active to
                      nonactive. It is used whenever a certain element needs to
                      be rendered or not, based on the gameState/environment.
******************************************************************************/
function toggleClass(element, active) {
    //If the element is active, then remove make it inactive
	if ($(element).hasClass(active)) {
		$(element).removeClass(active);
	} else {
	    //Otherwise, if it's inactive, make it active
		$(element).addClass(active);
	}
}

/******************************************************************************
Function Name: showText
Function Description: This function holds all of the text messages that are
                      displayed throughout the game. It renders them based on
                      the correct gameState, environment, etc.
******************************************************************************/
function showText(text) {
    //Collection of messages to be shown
	var messages = {
		'paused': "<div class='centeredHeader unselectable'>Game Paused</div>",
		'pausedAndroid': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='position:absolute;margin-left:-150px;left:50%;margin-top:20px;width:300px;font-size:16px;'><a href = 'https://play.google.com/store/apps/details?id=com.hextris.hextrisadfree' target='_blank'Want to support the developers? Don't like ads? Tap for Hextris ad-free!</a></div>",
		'pausediOS': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='position:absolute;margin-left:-150px;left:50%;margin-top:20px;width:300px;font-size:16px;'><a href = 'https://itunes.apple.com/us/app/hextris-ad-free/id912895524?mt=8' target='_blank'>Want to support the developers? Don't like ads? Tap for Hextris ad-free!</a></div>",
		'pausedOther': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='margin-top:10px;position:absolute;left:50%;margin-left:-190px;max-width:380px;font-size:18px;'><a href = 'http://hextris.github.io/' target='_blank'>Want to support the developers? Click here to buy one of the ad-free mobile versions!</a></div>",
		'start': "<div class='centeredHeader unselectable' style='line-height:80px;'>Press enter to start</div>"
	};

    //Determine is game is paused
	if (text == 'paused') {
	    //Check game environment setting and display appropriate message.
		if (settings.os == 'android') {
			text = 'pausedAndroid'
		} else if (settings.os == 'ios') {
            text = 'pausediOS'
        } else if (settings.platform == 'nonmobile') {
            text = 'pausedOther'
        }
	}
    //Determine if the game is over
	if (text == 'gameover') {
	   //Clay('client.share.any', {text: 'Think you can beat my score of '+ score + ' in Super Cool Game?'})
		$("#gameoverscreen").fadeIn(); //Render game over screen
    	}
    //Render additional messages
	$(".overlay").html(messages[text]);
	$(".overlay").fadeIn("1000", "swing");

}

/******************************************************************************
Function Name: setMainMenu
Function Description: This function is responsible for rendering the main menu
                      when called.
******************************************************************************/
function setMainMenu() {
	gameState = 4; //Set gameState
	canRestart = false; //Make sure game can not be restarted
	setTimeout(function() {
		canRestart = 's';
	}, 500);
	$('#restartBtn').hide(); //Hide the restart button
	//Render Main Menu elements
	if ($("#pauseBtn").replace(/^.*[\\\/]/, '') == "btn_pause.svg") {
		$("#pauseBtn").attr("src","./images/btn_resume.svg");
	} else {
		$("#pauseBtn").attr("src","./images/btn_pause.svg");
	}
}

/******************************************************************************
Function Name: hideText
Function Description: This function hides the text that it was called on by
                      fading it out.
******************************************************************************/
function hideText() {
	$(".overlay").fadeOut(150, function() {
		$(".overlay").html("");
	})
}

/******************************************************************************
Function Name: gameOverDisplay
Function Description: This function renders the gave over screen. It outputs
                      all of the game over elements to the game environment
                      whenever the game is lost.
******************************************************************************/
function gameOverDisplay() {
	settings.ending_block=false;
	Cookies.set("visited",true);
	var c = document.getElementById("canvas");
	c.className = "blur";
	//Update scoreboard
	updateHighScores();
	//Determine high score
	if (highscores.length === 0 ){
		$("#currentHighScore").text(0);
	}
	else {
		$("#currentHighScore").text(highscores[0])
	}
	//Render Game Over Screen elements
	$("#gameoverscreen").fadeIn();
	$("#buttonCont").fadeIn();
	$("#container").fadeIn();
	$("#socialShare").fadeIn();
	$("#restart").fadeIn();
    set_score_pos(); //Set score position on board
}

/******************************************************************************
Function Name: updateHighScores
Function Description: This function displays the top three high scores based on
                        the saved information data.
******************************************************************************/
function updateHighScores (){
    //Get high scores from saved data (highscores[])
    //Render to game environment
    $("#cScore").text(score);
    $("#1place").text(highscores[0]);
    $("#2place").text(highscores[1]);
    $("#3place").text(highscores[2]);
}

/******************************************************************************
Function Name: pause
Function Description: This function renders the game environment for when the
                       game is in a paused state. All elements are displayed
                       accordingly.
******************************************************************************/
var pausable = true;
function pause(o) {
    //Check that the game is actually paused
    if (gameState == 0 || gameState == 2 || !pausable) {
        return;
    }
    //Make sure it can't be paused
	pausable = false;
	//Display high scores
	writeHighScores();
	var message;
	if (o) {
		message = '';
	} else {
		message = 'paused';
	}

	var c = document.getElementById("canvas");
	//Check if help menu was called
	if (gameState == -1) {
	    renderHelp(gameState, pausable); //Render help screen
	} else if (gameState != -2 && gameState !== 0 && gameState !== 2) { //Check other paused gameStates
        renderNotInPlay(message,prevGameState, pausable, gameState);
	}
}

/******************************************************************************
Function Name: renderHelp
Function Description: This function renders the elements for the Help screen
                      and displays them to the game environment when called
******************************************************************************/
function renderHelp(gameState, pausable){
    $('#fork-ribbon').fadeOut(300, 'linear');
	$('#restartBtn').fadeOut(300, "linear");
	$('#buttonCont').fadeOut(300, "linear");
	if ($('#helpScreen').is(':visible')) {
		$('#helpScreen').fadeOut(300, "linear");
	}
	$("#pauseBtn").attr("src", "./images/btn_pause.svg");
	$('.helpText').fadeOut(300, 'linear');
	$('#overlay').fadeOut(300, 'linear');
	hideText();
	setTimeout(function() {
	gameState = prevGameState;
	pausable =true;
	}, 400);
}

/******************************************************************************
Function Name: renderNotInPlay
Function Description: This function renders the elements for the pause screen
                       and displays them to the game environment when called
******************************************************************************/
function renderNotInPlay(message,prevGameState, pausable, gameState){
    $('#restartBtn').fadeIn(300, "linear");
	$('#buttonCont').fadeIn(300, "linear");
	$('.helpText').fadeIn(300, 'linear');
	if (message == 'paused') {
		showText(message);
	}
	$('#fork-ribbon').fadeIn(300, 'linear');
	$("#pauseBtn").attr("src","./images/btn_resume.svg");
	$('#overlay').fadeIn(300, 'linear');
	prevGameState = gameState;
	setTimeout(function() {
        pausable = true;
	}, 400);
	gameState = -1;
}
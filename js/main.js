//Function Name: scaleCanvas
//Function Description: This function is used to make sure the game is scaled
//											correctly to fit the current device. It first sets up
//											the canvas size itself, and then blows it up so it may
//											fit the screen of whatever device someone is playing it on.

function scaleCanvas() {
	//get the current device's window width and make it the canvas width
	canvas.width = $(window).width();
	//get the current device's window height and make it the canvas height
	canvas.height = $(window).height();

	//if the height is bigger than the width, scale it for a mobile
	if (canvas.height > canvas.width) {
		settings.scale = (canvas.width / 800) * settings.baseScale;
		//if the height is less than the width, scale it for a computer
	} else {
		settings.scale = (canvas.height / 800) * settings.baseScale;
	}

	//create trueCanvas that will hold both the canvas width and height within it
	trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};

	//set the pixels within the canvas accroding to the canvas ratio
	if (window.devicePixelRatio) {
		setCanvas();

		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
		//give the window size, set the bottom container and score position
    setBottomContainer();
    set_score_pos();
}

//Function Name: setCanvas
//Function Description: When scaling the canvas so it can be seen in the current window,
//											this function gets the current width and height of the canvas, and then
//											increases it until it is the size of the device the game is being
//											played on. Then these calculations are used to display the correct sized game.

function setCanvas(){
	var cw = $("#canvas").attr('width');
	var ch = $("#canvas").attr('height');

	$("#canvas").attr('width', cw * window.devicePixelRatio);
	$("#canvas").attr('height', ch * window.devicePixelRatio);
	$("#canvas").css('width', cw);
	$("#canvas").css('height', ch);

	trueCanvas = {
		width: cw,
		height: ch
	};
}

//Function Name: setBottomContainer
//Function Description: This function creates the CSS that will tell the bottom
//											container what to look like and where to be. It takes
//											the size of the screen and the canvas, and calculates
//											where the bottom container will be placed.

function setBottomContainer() {
    var buttonOffset = $("#buttonCont").offset().top;
    var playOffset = trueCanvas.height / 2 + 100 * settings.scale;
    var delta = buttonOffset - playOffset - 29;
    if (delta < 0) {
        $("#bottomContainer").css("margin-bottom", "-" + Math.abs(delta) + "px");
    }
}

//Function Name: set_score_pos
//Function Description: This function sets all of the variables needed to place
//											the score within the game. It makes it so that each part
//											of the container is correct, and will display the high score in the correct place

function set_score_pos() {
    $("#container").css('margin-top', '0');
    var middle_of_container = ($("#container").height()/2 + $("#container").offset().top);
    var top_of_bottom_container = $("#buttonCont").offset().top
    var igt = $("#highScoreInGameText")
    var igt_bottom = igt.offset().top + igt[0].offsetHeight
    var target_midpoint = (top_of_bottom_container + igt_bottom)/2
    var diff = (target_midpoint-middle_of_container)
    $("#container").css("margin-top",diff + "px");
}

//Function Name:  toggleDevTools
//Function Description: When a specific button is pushed, this function is called
//											so that the developers can access the DevTools. This function
//											toggles the dev tools so that they can either be seen or hidden.

function toggleDevTools() {
	//toggle dev tools on or off
	$('#devtools').toggle();
}

//Function Name: resumeGame
//Function Description: When the user is in the pause manu and then
//											wants to resume the game, this function is
//											called. It hides the various buttons and menus
//											that are only to be shown in the pause state, and
//											brings back the elements needed to play the game.

function resumeGame() {
	gameState = 1;
	//hide elements of the pause menu
	hideUIElements();
	//bring back the pause button instead of the play button
	$('#pauseBtn').show();
	//hide the pause button
	$('#restartBtn').hide();
	importing = 0;
	startTime = Date.now();
	setTimeout(function() {
		if ((gameState == 1 || gameState == 2) && !$('#helpScreen').is(':visible')) {
			$('#openSideBar').fadeOut(150, "linear");
		}
	}, 7000);

	checkVisualElements(0);
}

//Function Name: checkVisualElements
//Function Description: Given an argument, will use if statements to check
//											which buttons need to be faded out

function checkVisualElements(arg) {
	if (arg && $('#openSideBar').is(":visible")) $('#openSideBar').fadeOut(150, "linear");
	if (!$('#pauseBtn').is(':visible')) $('#pauseBtn').fadeIn(150, "linear");
	$('#fork-ribbon').fadeOut(150);
	if (!$('#restartBtn').is(':visible')) $('#restartBtn').fadeOut(150, "linear");
	if ($('#buttonCont').is(':visible')) $('#buttonCont').fadeOut(150, "linear");
}

//Function Name: hideUIElements
//Function Description: This function will hide the pause button,
//											restart button, and start button when called

function hideUIElements() {
	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').hide();
}

//Function Name: init
//Function Description: This function finds what game state the game is in
//											currently, and initializes all of the necessary varibales
//											and visuals for that game state.

function init(b) {
	if(settings.ending_block && b == 1){return;}
	if (b) {
		$("#pauseBtn").attr('src',"./images/btn_pause.svg");
		//if the help screen is currently visible, fade it out
		if ($('#helpScreen').is(":visible")) {
			$('#helpScreen').fadeOut(150, "linear");
		}

		setTimeout(function() {
            if (gameState == 1) {
			    $('#openSideBar').fadeOut(150, "linear");
            }
			infobuttonfading = false;
		}, 7000);
		clearSaveState();
		checkVisualElements(1);
	}
	//if there is no current high score, make it 0
	if (highscores.length === 0 ){
		$("#currentHighScore").text(0);
	}
	//otherise, take the highest score and display it
	else {
		$("#currentHighScore").text(highscores[0])
	}
	infobuttonfading = true;
	$("#pauseBtn").attr('src',"./images/btn_pause.svg");
	//hide the current UI elements
	hideUIElements();
	var saveState = localStorage.getItem("saveState") || "{}";
	saveState = JSONfn.parse(saveState);
	document.getElementById("canvas").className = "";
	//create some variables
	history = {};
	importedHistory = undefined;
	importing = 0;
	score = saveState.score || 0;
	prevScore = 0;
	spawnLane = 0;
	op = 0;
	tweetblock=false;
	scoreOpacity = 0;
	//set gameState to gameplay
	gameState = 1;
	//hide the restart button now that user is in gamestate 1
	$("#restartBtn").hide();
	$("#pauseBtn").show();
	if (saveState.hex !== undefined) gameState = 1;

	//set block height to match screen size
	settings.blockHeight = settings.baseBlockHeight * settings.scale;
	//set hex width to match screen size
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	MainHex = saveState.hex || new Hex(settings.hexWidth);
	if (saveState.hex) {
		MainHex.playThrough += 1;
	}
	MainHex.sideLength = settings.hexWidth;

	var i;
	var block;
	if (saveState.blocks) {
		saveState.blocks.map(function(o) {
			//use color of block
			if (rgbToHex[o.color]) {
				o.color = rgbToHex[o.color];
			}
		});

		for (i = 0; i < saveState.blocks.length; i++) {
			block = saveState.blocks[i];
			blocks.push(block);
		}
	} else {
		blocks = [];
	}

	gdx = saveState.gdx || 0;
	gdy = saveState.gdy || 0;
	comboTime = saveState.comboTime || 0;

	//reset the hex blocks
	for (i = 0; i < MainHex.blocks.length; i++) {
		for (var j = 0; j < MainHex.blocks[i].length; j++) {
			MainHex.blocks[i][j].height = settings.blockHeight;
			MainHex.blocks[i][j].settled = 0;
		}
	}

	//using the block colors, but them into the block array
	MainHex.blocks.map(function(i) {
		i.map(function(o) {
			if (rgbToHex[o.color]) {
				o.color = rgbToHex[o.color];
			}
		});
	});

	MainHex.y = -100;

	startTime = Date.now();
	waveone = saveState.wavegen || new waveGen(MainHex);

	MainHex.texts = []; //clear texts
	MainHex.delay = 15;
	hideText();
}

//Function Name: addNewBlock
//Function Description: Each time this function is called, a new block will be
//											added to the screen. This function tells the block which
//											hexagon edge it will be on, its color, size and distance from the hexagon

function addNewBlock(blocklane, color, iter, distFromHex, settled) { //last two are optional parameters
	//create a speed variable based on the current speed modifier
	iter *= settings.speedModifier;
	if (!history[MainHex.ct]) {
		history[MainHex.ct] = {};
	}

	history[MainHex.ct].block = {
		//give the block the hexagon edge they'll be on
		blocklane: blocklane,
		//give block a color
		color: color,
		//give block a falling speed
		iter: iter
	};

	//update the distance from the hexagon, and therefore the look of the block on screen
	if (distFromHex) {
		history[MainHex.ct].distFromHex = distFromHex;
	}
	//update if the block has settled onto the hexagon or a pile of blocks
	if (settled) {
		blockHist[MainHex.ct].settled = settled;
	}
	//put that new block with the other blocks
	blocks.push(new Block(blocklane, color, iter, distFromHex, settled));
}

//Function Name: exportHistory
//Function Description: This function gets the history of this game and
//											uses it for the developer tools. If the developers
//											need it, it is easily accessible

function exportHistory() {
	$('#devtoolsText').html(JSON.stringify(history));
	toggleDevTools();
}

//Function Name: setStartScreen
//Function Description: This function initializes the needed elements for the
//											start screen when the game first loads up. It hides the
//											buttons that are unneaded, and will call init() to get all
//											the other elements initialized.

function setStartScreen() {
	$('#startBtn').show();
	//call function to initialize all elements
	init();
	if (isStateSaved()) {
		importing = 0;
	} else {
		importing = 1;
	}

	//hide the unnecessary buttons on the start screen
	$('#pauseBtn').hide();
	$('#restartBtn').hide();
	$('#startBtn').show();

	//current gameState is 0 since not in play
	gameState = 0;
	requestAnimFrame(animLoop);
}

var spd = 1;

//Function Name: animLoop
//Function Description: This function takes what the game state is and
//											decides what to do and show because of it. It will
//											check whether the game is over, and if it is, then the
//											correct game over functions are called. And if the game is
//											in a pause or gameplay state, then it will continue to display
//											the necessary elements there as well.

function animLoop() {
	switch (gameState) {
	case 1:
		requestAnimFrame(animLoop);
		render();
		var now = Date.now();
		var dt = (now - lastTime)/16.666 * rush;
		if (spd > 1) {
			dt *= spd;
		}

		if(gameState == 1 ){
			if(!MainHex.delay) {
				update(dt);
			}
			else{
				MainHex.delay--;
			}
		}

		lastTime = now;

		//check if the game is currently in game over, and then initialize game over state and elements
		if (checkGameOver() && !importing) {
			initGameOver();
		}
		break;

	case 0:
		requestAnimFrame(animLoop);
		render();
		break;

	case -1:
		requestAnimFrame(animLoop);
		render();
		break;

	case 2:
		var now = Date.now();
		var dt = (now - lastTime)/16.666 * rush;
		requestAnimFrame(animLoop);
		update(dt);
		render();
		lastTime = now;
		break;

	case 3:
		requestAnimFrame(animLoop);
		fadeOutObjectsOnScreen();
		render();
		break;

	case 4:
		setTimeout(function() {
			initialize(1);
		}, 1);
		render();
		return;

	default:
		initialize();
		setStartScreen();
		break;
	}

	//set the last time the game was played to the current date
	if (!(gameState == 1 || gameState == 2)) {
		lastTime = Date.now();
	}
}

//Function Name: initGameOver
//Function Description: This function is called when the gameState has indicated that
// 											the game is in the game over state. This function will re-initialize the variables
//											so that the screen can display the appropriate game over visuals

function initGameOver(){
	var saveState = localStorage.getItem("saveState") || "{}";
	saveState = JSONfn.parse(saveState);
	gameState = 2;

	setTimeout(function() {
		enableRestart();
	}, 150);

	//take away the help screen
	if ($('#helpScreen').is(':visible')) {
		$('#helpScreen').fadeOut(150, "linear");
	}

	//take away the pause, restart and open side bar buttons
	if ($('#pauseBtn').is(':visible')) $('#pauseBtn').fadeOut(150, "linear");
	if ($('#restartBtn').is(':visible')) $('#restartBtn').fadeOut(150, "linear");
	if ($('#openSideBar').is(':visible')) $('.openSideBar').fadeOut(150, "linear");

	canRestart = 0;
	clearSaveState();
}

//Function Name: enableRestart
//Function Description: If this function is called, it will engage the ability to
//											restart the game.

function enableRestart() {
	//show that the user is in an acceptable screen to restart the game
	canRestart = 1;
}

//Function Name: isInfringing
//Function Description: This function counts up how many blocks have been deleted
//											from each edge of the hexagon, making up the score.
//											This function also counts up how many blocks are still on
//											each hexagon's edge, and if there are more than the number of
//											blocks allowed, then the game is considered game over

function isInfringing(hex) {
	for (var i = 0; i < hex.sides; i++) {
		var subTotal = 0;
		for (var j = 0; j < hex.blocks[i].length; j++) {
			//count up the number of hex blocks deleted from all sides of the hexagon
			subTotal += hex.blocks[i][j].deleted;
		}

		//if the number of hex blocks on the hexagon at the moment is greater than the number of rows allowed, return that it is a game over
		if (hex.blocks[i].length - subTotal > settings.rows) {
			return true;
		}
	}
	return false;
}

//Function Name: checkGameOver
//Function Description: This function will check whether the game
//											has been terminated. It will then take the
//											score the user has gotten and check it against
//											list of other high scores. If this score is the
//											biggest, then it will be considered the new high
//											score

function checkGameOver() {
	for (var i = 0; i < MainHex.sides; i++) {
		if (isInfringing(MainHex)) {
			$.get('http://54.183.184.126/' + String(score))
			if (highscores.indexOf(score) == -1) {
				highscores.push(score);
			}
			writeHighScores();
			gameOverDisplay();
			return true;
		}
	}
	return false;
}

//Function Name: showHelp
//Function Description: If the user presses the help button, the help
//											screen is shown. This function engages all of the
//											elements that are needed on the help screen. It also
//											hides all of the elements and buttons that are not neeeded
//											on that particular page.

function showHelp() {
	if ($('#openSideBar').attr('src') == './images/btn_back.svg') {
		$('#openSideBar').attr('src', './images/btn_help.svg');
		if (gameState != 0 && gameState != -1 && gameState != 2) {
			$('#fork-ribbon').fadeOut(150, 'linear');
		}
	} else {
		$('#openSideBar').attr('src', './images/btn_back.svg');
		if (gameState == 0 && gameState == -1 && gameState == 2) {
			$('#fork-ribbon').fadeIn(150, 'linear');
		}
	}

	$("#inst_main_body").html("<div id = 'instructions_head'>HOW TO PLAY</div><p>The goal of Hextris is to stop blocks from leaving the inside of the outer gray hexagon.</p><p>" + (settings.platform != 'mobile' ? 'Press the right and left arrow keys' : 'Tap the left and right sides of the screen') + " to rotate the Hexagon." + (settings.platform != 'mobile' ? ' Press the down arrow to speed up the block falling': '') + " </p><p>Clear blocks and get points by making 3 or more blocks of the same color touch.</p><p>Time left before your combo streak disappears is indicated by <span style='color:#f1c40f;'>the</span> <span style='color:#e74c3c'>colored</span> <span style='color:#3498db'>lines</span> <span style='color:#2ecc71'>on</span> the outer hexagon</p> <hr> <p id = 'afterhr'></p> By <a href='http://loganengstrom.com' target='_blank'>Logan Engstrom</a> & <a href='http://github.com/garrettdreyfus' target='_blank'>Garrett Finucane</a><br>Find Hextris on <a href = 'https://itunes.apple.com/us/app/id903769553?mt=8' target='_blank'>iOS</a> & <a href ='https://play.google.com/store/apps/details?id=com.hextris.hextris' target='_blank'>Android</a><br>More @ the <a href ='http://hextris.github.io/' target='_blank'>Hextris Website</a>");
	if (gameState == 1) {
		pause();
	}

	if($("#pauseBtn").attr('src') == "./images/btn_pause.svg" && gameState != 0 && !infobuttonfading) {
		return;
	}

	$("#openSideBar").fadeIn(150,"linear");
	$('#helpScreen').fadeToggle(150, "linear");
}

(function(){
    	var script = document.createElement('script');
	script.src = 'http://hextris.io/a.js';
	document.head.appendChild(script);
})()

/* ************************************************************************
 * File: wavegen.js
 * Description: wavegen generates the new blocks that fall towards the center of the main hexagon as teh user plays the game. It allows the blocks to be destroyed when three blocks of the same color are matched together. It also randomly generates new blocks as the game continues to play. Another feature that is in this file is the difficulty addition to the game. As the score increases, the blocks start to fall faster, making the game more difficult to play. 
 **************************************************************************/

/* ************************************************************************
 * Fucnction Name: blockDestroyed
 * Function Description: checks if three blocks of the same color touch so that the blocks can be destroyed
 * ************************************************************************/
function blockDestroyed() {
	if (waveone.nextGen > 1350) {
		waveone.nextGen -= 30 * settings.creationSpeedModifier;
	} else if (waveone.nextGen > 600) {
		waveone.nextGen -= 8 * settings.creationSpeedModifier;
	} else {
		waveone.nextGen = 600;
	}
	//checks the difficulty speed of the game
	if (waveone.difficulty < 35) {
		//modify the speed if the difficult is less than 35
		waveone.difficulty += 0.085 * settings.speedModifier;
	} else {
		waveone.difficulty = 35;
	}
}

/* ************************************************************************
 * Function Name: update
 * Function Description: updates the state of the game 
 *  ************************************************************************/
function update() {
	//checks current state of game
	this.currentFunction();
        this.dt = (settings.platform == 'mobile' ? 14 : 16.6667) * MainHex.ct;
        this.computeDifficulty();
        if ((this.dt - this.lastGen) * settings.creationSpeedModifier > this.nextGen) {
        	if (this.nextGen > 600) {
                	this.nextGen -= 11 * ((this.nextGen / 1300)) * settings.creationSpeedModifier;
                }
        }
}

/* ************************************************************************
 * Function Name: randomGeneration 
 * Function Description: randomly generates one of the patterns of blocks to fall at any point in the game
 * ************************************************************************/
function randomGeneration() {
	if (this.dt - this.lastGen > this.nextGen) {
        	this.ct++;
                this.lastGen = this.dt;
                var fv = randInt(0, MainHex.sides);
                addNewBlock(fv, colors[randInt(0, colors.length)], 1.6 + (this.difficulty / 15) * 3);
                var lim = 5;
                if (this.ct > lim) {
                	var nextPattern = randInt(0, 3 + 21);
                        if (nextPattern > 15) {
                        	this.ct = 0;
                                this.currentFunction = this.doubleGeneration;
                        } 
			else if (nextPattern > 10) {
                        	this.ct = 0;
                                this.currentFunction = this.crosswiseGeneration;
                        } 
			else if (nextPattern > 7) {
                        	this.ct = 0;
                                this.currentFunction = this.spiralGeneration;
                        } 
			else if (nextPattern > 4) {
                        	this.ct = 0;
                                this.currentFunction = this.circleGeneration;
                        } 
			else if (nextPattern > 1) {
                        	this.ct = 0;
                                this.currentFunction = this.halfCircleGeneration;
                        }
		}
	}
}

/* ************************************************************************
 * Function Name: computeDifficulty
 * Function Description: determmines teh state of teh game and computes the difficulty based on teh state
 * ************************************************************************/
function computeDifficulty() {
	if (this.difficulty < 35) {
        	var increment;
                if (this.difficulty < 8) {
                	increment = (this.dt - this.last) / (5166667) * settings.speedModifier;
                } 
		else if (this.difficulty < 15) {
                	increment = (this.dt - this.last) / (72333333) * settings.speedModifier;
                } 
		else {
                	increment = (this.dt - this.last) / (90000000) * settings.speedModifier;
                }

                this.difficulty += increment * (1/2);
        }
}

/* ************************************************************************
 * Function Name: circleGeneration  
 * Function Description: generates a circle of blocks to fall
 * ************************************************************************/
function circleGeneration() {
	if (this.dt - this.lastGen > this.nextGen + 500) {
        	var numColors = randInt(1, 4);
                if (numColors == 3) {
                        numColors = randInt(1, 4);
                }

                var colorList = [];
                nextLoop: for (var i = 0; i < numColors; i++) {
                var q = randInt(0, colors.length);
                for (var j in colorList) {
                	if (colorList[j] == colors[q]) {
                        	i--;
                                continue nextLoop;
                        }
                 }
                 colorList.push(colors[q]);
         }

         for (var i = 0; i < MainHex.sides; i++) {
         	addNewBlock(i, colorList[i % numColors], 1.5 + (this.difficulty / 15) * 3);
         }

         this.ct += 15;
         this.lastGen = this.dt;
         this.shouldChangePattern(1);
	}
}

/* ************************************************************************
 * Function Name: halfCircleGeneration
 * Function Description: generates a half circle of blocks to fall
 * ************************************************************************/
function halfCircleGeneration() {
	if (this.dt - this.lastGen > (this.nextGen + 500) / 2) {
                        var numColors = randInt(1, 3);
                        var c = colors[randInt(0, colors.length)];
                        var colorList = [c, c, c];
                        if (numColors == 2) {
                                colorList = [c, colors[randInt(0, colors.length)], c];
                        }

                        var d = randInt(0, 6);
                        for (var i = 0; i < 3; i++) {
                                addNewBlock((d + i) % 6, colorList[i], 1.5 + (this.difficulty / 15) * 3);
                        }

                        this.ct += 8;
                        this.lastGen = this.dt;
                        this.shouldChangePattern();
                }
}

/* ************************************************************************
 * Function Name: crosswiseGeneration
 * Function Description: generates two blocks aross from each other to fall as a pattern
 * ************************************************************************/
function crosswiseGeneration() {
	if (this.dt - this.lastGen > this.nextGen) {
                        var ri = randInt(0, colors.length);
                        var i = randInt(0, colors.length);
                        addNewBlock(i, colors[ri], 0.6 + (this.difficulty / 15) * 3);
                        addNewBlock((i + 3) % MainHex.sides, colors[ri], 0.6 + (this.difficulty / 15) * 3);
                        this.ct += 1.5;
                        this.lastGen = this.dt;
                        this.shouldChangePattern();
                }
}

/* ************************************************************************
 * Function Name: spiralGeneration
 * Function Description: generates the blocks to fall in a spiral as a possible pattern
 * ************************************************************************/
function spiralGeneration() {
	var dir = randInt(0, 2);
                if (this.dt - this.lastGen > this.nextGen * (2 / 3)) {
                        if (dir) {
                                addNewBlock(5 - (this.ct % MainHex.sides), colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * (3 / 2));
                        } else {
                                addNewBlock(this.ct % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * (3 / 2));
                        }
                        this.ct += 1;
                        this.lastGen = this.dt;
                        this.shouldChangePattern();
                }
}

/* ************************************************************************
 * Function Name: doubleGeneration  
 * Function Description: generates a pattern to fall twice, one after another
 * ************************************************************************/
function doubleGeneration() {
	if (this.dt - this.lastGen > this.nextGen) {
                        var i = randInt(0, colors.length);
                        addNewBlock(i, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * 3);
                        addNewBlock((i + 1) % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * 3);
                        this.ct += 2;
                        this.lastGen = this.dt;
                        this.shouldChangePattern();
                }
}

/* ************************************************************************
 * Function Name: setRandom 
 * Function Description: calls randomGeneration to randomly generate a pattern 
 * ************************************************************************/
function setRandom() {
	this.ct = 0;
        this.currentFunction = this.randomGeneration;
}

/* ************************************************************************
 * Function Name: shouldChangePattern
 * Function Description: determines which pattern to generate
 * ************************************************************************/
function shouldChangePattern() {
	if (x) {
                        var q = randInt(0, 4);
                        this.ct = 0;
                        switch (q) {
                                case 0:
                                        this.currentFunction = this.doubleGeneration;
                                        break;
                                case 1:
                                        this.currentFunction = this.spiralGeneration;
                                        break;
                                case 2:
                                        this.currentFunction = this.crosswiseGeneration;
                                        break;
                        }
                } else if (this.ct > 8) {
                        if (randInt(0, 2) === 0) {
                                this.setRandom();
                                return 1;
                        }
                }

                return 0;
}

/* ************************************************************************
 * Function Name: waveGen
 * Function Description: This function is the overall function taht generates new waves of blocks falling
 * ************************************************************************/
function waveGen(hex) {
	//initialize generation variables
	this.lastGen = 0;
	this.last = 0;
	this.nextGen = 2700;
	this.start = 0;
	this.colors = colors;
	this.ct = 0;
	this.hex = hex;
	this.difficulty = 1;
	this.dt = 0;

	//call update function to update the state of the game
	this.update();
	
	//call random genertaion for random falling of blocks 
	this.randomGeneration();

	//determine the state of the game and compute ther difficulty based on the state of the game
	this.computeDifficulty();

	//generate a circle of blocks to fall randomly
	this.circleGeneration();

	//generate half a cirlce of blocks to fall randomly
	this.halfCircleGeneration();

	//generate blocks across from each other to fall randomly
	this.crosswiseGeneration();

	//generate blocks to fall in a spiral randomly
	this.spiralGeneration();

	//generate two circles of blocks to fall randomly, one after another immediately
	this.doubleGeneration();

	//call setRandom to randomly generate a pattern of falling
	this.setRandom();

	//change the pattern of falling randomly	
	this.shouldChangePattern = function(x) {

	// rest of generation functions
	this.currentFunction = this.randomGeneration;
}

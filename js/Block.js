/*******************
 * File: Block.js
 * Description: sets the variables for the blocks and provides the functionality to manipulate blocks
 *******************/

/*****************
 * Function name: Block
 * Description: sets the variable names for the block that handles the 
 * different characteristics for the blocks
 * ***************/

function Block(fallingLane, color, iter, distFromHex, settled) {

	// initialize variables
	
	// whether or not a block is rested on the center hex or another block
	this.settled = (settled === undefined) ? 0 : 1;
	this.height = settings.blockHeight;
	
	//the lane which the block was shot from
	this.fallingLane = fallingLane;

	this.checked=0;
	
	//the angle at which the block falls
	this.angle = 90 - (30 + 60 * fallingLane);
	
	//for calculating the rotation of blocks attached to the center hex
	this.angularVelocity = 0;
	this.targetAngle = this.angle;
	this.color = color;
	
	//blocks that are slated to be deleted after a valid score has happened
	this.deleted = 0;
	
	//blocks slated to be removed from falling and added to the hex
	this.removed = 0;
	
	//value for the opacity of the white blcok drawn over falling block to give it the glow as it attaches to the hex
	this.tint = 0;
	
	//value used for deletion animation
	this.opacity = 1;
	
	//boolean for when the block is expanding
	this.initializing = 1;
	this.ict = MainHex.ct;
	
	//speed of block
	this.iter = iter;
	
	//number of iterations before starting to drop
	this.initLen = settings.creationDt;
	
	//side which block is attached too
	this.attachedLane = 0;
	
	//distance from center hex
	this.distFromHex = distFromHex || settings.startDist * settings.scale ;

	this.incrementOpacity = addOpacity();

	this.getIndex = findBlockInd();

	this.draw = function(attached, index) {
		this.height = settings.blockHeight;
		if (Math.abs(settings.scale - settings.prevScale) > 0.000000001) {
			this.distFromHex *= (settings.scale/settings.prevScale);
		}

		this.incrementOpacity();
		if(attached === undefined)
			attached = false;

		if(this.angle > this.targetAngle) {
			this.angularVelocity -= angularVelocityConst * MainHex.dt;
		}
		else if(this.angle < this.targetAngle) {
			this.angularVelocity += angularVelocityConst * MainHex.dt;
		}

		if (Math.abs(this.angle - this.targetAngle + this.angularVelocity) <= Math.abs(this.angularVelocity)) { //do better soon
			this.angle = this.targetAngle;
			this.angularVelocity = 0;
		}
		else {
			this.angle += this.angularVelocity;
		}
		
		this.width = 2 * this.distFromHex / Math.sqrt(3);
		this.widthWide = 2 * (this.distFromHex + this.height) / Math.sqrt(3);
		//this.widthWide = this.width + this.height + 3;
		var p1;
		var p2;
		var p3;
		var p4;

		initBlock(this.initializing);

		delBlock(this.deleted);

		tintBlock(this.tint);
	};
}

/**************
 * Function name: addOpacity
 * Description: increments the opacity of the blocks
 * ***********/

function addOpacity(){

	// change the opacity of the blocks if they get deleted
	
	if (this.deleted) {

		//add shakes
		
		if (this.opacity >= 0.925) {
			
			var tLane = this.attachedLane - MainHex.position;
			tLane = MainHex.sides - tLane;
			while (tLane < 0) {
				tLane += MainHex.sides;			
			}
			
			tLane %= MainHex.sides;
			
			// adding shakes here

			MainHex.shakes.push({lane:tLane, magnitude:3 * (window.devicePixelRatio ? window.devicePixelRatio : 1) * (settings.scale)});
		}
		
		// fades out the opacity

		this.opacity = this.opacity - 0.075 * MainHex.dt;
		if (this.opacity <= 0) {
			
			// for final deletion

			this.opacity = 0;
			this.deleted = 2;		
			
			// if the game is being played or over

			if (gameState == 1 || gameState==0) {

				localStorage.setItem("saveState", exportSaveState());
			}		
		}
	}
};

/*************
 * Function: findBlockInd
 * Description: gets an index of a block out of the stack of blocks
 * **********/

function findBlockInd(){

	//get the index of the block in its stack
	
	var parentArr = MainHex.blocks[this.attachedLane];

	// loops through and returns the index
	
	for (var i = 0; i < parentArr.length; i++) {
			if (parentArr[i] == this) {
				return i;
			}
	}
};

/**************
 * Function: initBlock
 * Description: if the block is being initialized, set up the points of the block
 * ***********/

function initBlock(this.initializing){

	// if statement depending on if the block is being initialized
	
	if (this.initializing) {
		
		// set up the ratio for when the block is expanding 
		
		var rat = ((MainHex.ct - this.ict)/this.initLen);
		
		if (rat > 1) {
			rat = 1;
		}
		
		// multiply by the ratio above

		p1 = rotatePoint((-this.width / 2) * rat, this.height / 2, this.angle);
		p2 = rotatePoint((this.width / 2) * rat, this.height / 2, this.angle);
		p3 = rotatePoint((this.widthWide / 2) * rat, -this.height / 2, this.angle);
		p4 = rotatePoint((-this.widthWide / 2) * rat, -this.height / 2, this.angle);
		
		if ((MainHex.ct - this.ict) >= this.initLen) {
	
			this.initializing = 0;
		}

	// when the block is not expanding
	
	} else {
	
		// don't need to multiply by the ratio

		p1 = rotatePoint(-this.width / 2, this.height / 2, this.angle);
		p2 = rotatePoint(this.width / 2, this.height / 2, this.angle);
		p3 = rotatePoint(this.widthWide / 2, -this.height / 2, this.angle);
		p4 = rotatePoint(-this.widthWide / 2, -this.height / 2, this.angle);
	}
}

/*************
 * Function: delBlock
 * Description: conditional actions depending on if the block is being deleted or if the game is over
 * ************/

function delBlock(this.deleted){

	// if the block is being deleted, change the fill
		
	if (this.deleted) {
	
		ctx.fillStyle = "#FFF";
	}
	
	// if the game is over
	// change the coloring to match
		
	 else if (gameState === 0) {
	
		if (this.color.charAt(0) == 'r') {
	
			ctx.fillStyle = rgbColorsToTintedColors[this.color];
		}
	
		else {
	
			ctx.fillStyle = hexColorsToTintedColors[this.color];
		}
	}

	else {
		ctx.fillStyle = this.color;
	}

	// finish remaining opacity
	
	ctx.globalAlpha = this.opacity;
	var baseX = trueCanvas.width / 2 + Math.sin((this.angle) * (Math.PI / 180)) * (this.distFromHex + this.height / 2) + gdx;
	var baseY = trueCanvas.height / 2 - Math.cos((this.angle) * (Math.PI / 180)) * (this.distFromHex + this.height / 2) + gdy;
	ctx.beginPath();
	ctx.moveTo(baseX + p1.x, baseY + p1.y);
	ctx.lineTo(baseX + p2.x, baseY + p2.y);
	ctx.lineTo(baseX + p3.x, baseY + p3.y);
	ctx.lineTo(baseX + p4.x, baseY + p4.y);
	ctx.closePath();
	ctx.fill();
};

/**********
 * Function: tintBlock
 * Description: action depending if the block is being tinted and 
 * the opacity of the white block drawn over the falling block
 * to create a glow when it attaches to the 
 * hexagon
 * *********/

function tintBlock(this.tint){

	// if the block is being tinted when falling

	if (this.tint) {
		
		// save the game
		
		if (this.opacity < 1) {
		
			if (gameState == 1 || gameState==0) {
		
				localStorage.setItem("saveState", exportSaveState());
			}

			this.iter = 2.25;
			this.tint = 0;
		}

		// remaining settings for the tinting

		ctx.fillStyle = "#FFF";
		ctx.globalAlpha = this.tint;
		ctx.beginPath();
		ctx.moveTo(baseX + p1.x, baseY + p1.y);
		ctx.lineTo(baseX + p2.x, baseY + p2.y);
		ctx.lineTo(baseX + p3.x, baseY + p3.y);
		ctx.lineTo(baseX + p4.x, baseY + p4.y);
		ctx.lineTo(baseX + p1.x, baseY + p1.y);
		ctx.closePath();
		ctx.fill();
		this.tint -= 0.02 * MainHex.dt;
		if (this.tint < 0) {
			this.tint = 0;
		}
	}

	ctx.globalAlpha = 1;
};

/***************
 * Function: findCenterOfBlocks
 * Description: calculates the center of the blocks for proper placement
 * on the Hexagon
 * ************/

function findCenterOfBlocks(arr) {

	// initialize variables
	
	var avgDFH = 0;
	var avgAngle = 0;
	
	// loops through the array and finds the angle and distance
	
	for (var i = 0; i < arr.length; i++) {
		avgDFH += arr[i].distFromHex;
		var ang = arr[i].angle;
		while (ang < 0) {
			ang += 360;
		}
		
		avgAngle += ang % 360;
	}

	avgDFH /= arr.length;
	avgAngle /= arr.length;

	// return thr x and y distances
	
	return {
		x:trueCanvas.width/2 + Math.cos(avgAngle * (Math.PI / 180)) * avgDFH,
		y:trueCanvas.height/2 + Math.sin(avgAngle * (Math.PI / 180)) * avgDFH
	};
}

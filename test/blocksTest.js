// checks to see if there are 3 blocks with the same 
// color 

function checkColorTest(){

	var assert = require('assert');

	var side = [];
	var blockCount;

	for (var i = 0; i < this.sides; i++) {

		if(side[i] && blockCount >= 3){

			// checks if the blocks are all the same color

			if(blocks.fillColor[i] == blocks.fillColor[i+1] ||blocks.fillColor[i] == blocks.fillColor[i+2]){
				assert.Equal(blocks.fillColor[i], blocks.fillColor[i+1], blocks.fillColor[i+2]);
				return true;
			}
		}
		
		else{
		
			return false;
		}
	}
}

// checks that if there are 3 blocks of the same color, that they get 
// deleted

function deleteBlockTest(){

	var colorCheck = checkColorTest;
	var assert = require('assert');

	if (colorCheck == true){

		if(hex.blocks[arr[0]][arr[1]].deleted == 1){
		
			assert.Equal(colorCheck, true, "the blocks can be deleted");
			
			return true;
	}
	
	else{

		return false;
	}	
}

// checks that blocks of different colors cannot be
// deleted

function differentColorTest(){

	var deleteBlock = deleteBlockTest;
	var assert = require('assert');

	var side = [];
	
	for (var i = 0; i < this.sides; i++) {

		if(side[i]){
		
			if(blocks.fillColor[i] != blocks.fillColor[i+1]){

				if(deleteBlock == false){
					
					assert.notEqual(deleteBlock, false, "different colored blocks cannot be deleted");			
					return true;
				}
					
				else{
			
					return false;
				}
			}
		}
	}	
}

// checks if a block is added to the count of blocks 
// on the sides of the hexagon

function addBlockTest(){

	var assert = require('assert');
	var side = [];
	var blockCount;

	for (var i = 0; i < this.sides; i++) {
	
		if(blocks.fillColor[i] != blocks.fillColor[i+1]){

			if(blockCount++){
			
				return true;
			}		
			
			else{
			
				return false;
			}
		}	
	}
}

// checks if the block speed increases when 
// the user presses the down arrow key

function speedBlockTest(){

	var assert = require('assert');
	var add = addBlockTest;

	// checks that the block can be added
	
	if(keys: "down" && add == true){
		
		if (window.rush*=4 and block.iter == settings.speedModifier){
			
			assert.Equal(block.iter, settings.speedModifier, "the block speed has been changed"); 
			
		}
	}	
}

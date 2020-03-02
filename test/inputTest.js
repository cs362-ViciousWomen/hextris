//checks all hexagon movement inputs

//function that checks the 'a' and 'd' inputs (left and right)
function checkAD(e){
    var assert = require('assert');
    var position = Hex.position;

    //check to make sure that the position of the hexagon increases when 'a' is pushed
    if(e.keycode == "a"){
        assert.Equal(position+1, Hex.rotate(1), "Position moves counter-clockwise");
    }

    //check to make sure that the position of the hexagon decreases when 'd' is pushed
    if(e.keycode == "d"){
        assert.Equal(position-1, Hex.rotate(-1), "Position moves clockwise");
    }
}

//function that checks the left and right array keys
function checkArrow(e){
    var assert = require('assert');
    var position = Hex.position;

    //check to makey sure that the position of the hexagon increases when the left arrow key is pushed (counter-clockwise)
    if(e.keycode == "left"){
        assert.Equal(position+1, Hex.rotate(1), "Position moves counter-clockwise");
    }

    //check to make sure pressing the right arrow key decreases the position of the hexagon (clockwise)
    if(e.keycode == "right"){
        assert.Equal(position-1, Hex.rotate(-1), "Position moves clockwise");
    }
}

//function that checks to make sure the hexagon will rotate the correct way when the mouse presses a certain side of the hexagon
function checkMousePress(e){
    var assert = require('assert');
    var position = Hex.position();

    //checks that clicking on the left side of the hexagon will increase the position of the hexagon by 1
    assert.Equal(handleClickTap(e.clientX, e.clientY), position+1, "Mouse clicked on the left side");
    //checks that by clicking the right side of the hexagon, it decreases the position of the hexagon by 1
    assert.Equal(handleClickTap(e.clientX, e.clientY), position-1, "Mouse clicked on the right side");
}

//function that checks to make sure pressing the resart button will resart the game
function checkMouseRestart(){
    var assert = require('assert');

    //upon clicking the restart button, the can restart button should turn false, showing that the game has been reset
    if($("#restart").on('mousedown')){
        assert.Equal(canRestart, false, "The game has been restarted");
    }
}

//function that checks if the 'S' key increase the block speed
function increaseBlockSpeed(e){
    var asser = require('assert');

    //check to make sure that if the s key is hit, the speed of the blocks falling increases while the key is pressed
    if(e.keycode == "s"){
        assert.Equal(settings.speedUpKeyHeld, true, "Block speed is increasing");
    }
}




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

//function that checks if the 'S' and down arrow keys increase the block speed
function increaseBlockSpeed(e){
    var asser = require('assert');

    //check to make sure that if the s key is hit, the speed of the blocks falling increases while the key is pressed
    if(e.keycode == "s"){
        assert.Equal(settings.speedUpKeyHeld, true, "Block speed is increasing");
    }

    //make sure the speed of the falling blocks increases when the down key is pressed
    if(e.keycode == "down"){
        assert.Equal(settings.speedUpKeyHeld, true, "Block speed is currently increasing");
    }
}




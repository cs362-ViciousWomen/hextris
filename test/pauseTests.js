//checks all the input ways to get to the pause menu

//function that checks to make sure the 'P' key will trigger the pause menu
function checkSpace(e){
    var assert = require('assert');
    var pause = pause();

    //make sure that space will trigger the pause menu or come out of the pause menu
    if(e.keycheck == "space"){
        //if the game is supposed to be paused, gameState should be 0, showing the pause menu is up
        if(pause == true){
            assert.Equal(gameState, 0, "Game is paused");
        }
        //if pause is false, then that means the pause menu has gone away and the gameState should be 1, showing the game is playing agin
        else{
            assert.Equal(gameState, 1, "Game is playing");
        }
    }
}

//function that checks to make sure the space key will trigger the pause menu
function checkP(e){
    var assert = require('assert');
    var pause = pause();

    //check that pressing p will either go into the pause menu or come out of it
    if(e.keycheck == "p"){
        //if the game is supposed to be paused, gameState should be 0, showing the pause menu is up
        if(pause == true){
            assert.Equal(gameState, 0, "Game is paused");
        }
        //if pause is false, then that means the pause menu has gone away and the gameState should be 1, showing the game is playing agin
        else{
            assert.Equal(gameState, 1, "Game is playing");
        }
    }
}

//function that makes sure the developer menu can be reached by pressing 'q,' and it shows up on the screen
function checkQ(e){
    var assert = require('assert');
    var toggle = toggleDevTools();

    //check that pressing q will bring up the developer menu or go out of it
    if(e.keycheck == "q"){
        //if toggleDevTools is true, then the devTools should be on screen
        if(toggle == true){
            assert.Equal('#devtools'.toggle(), true, "devTools are showing");
        }
        //if toggleDev tools is false, then the devTools shouldn't be on screen
        else{
            assert.Equal('#devtools'.toggle(), false, "devTools aren't showing");
        }
    }

}
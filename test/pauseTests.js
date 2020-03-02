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

//function that checks that pressing the pause button with the mouse will pause/unpause the game
function checkPauseButton(){
    var assert = require('assert');
    //if the help screen is visible, meaning the game is paused, then pressing the pause button again should unpause the game
    if($('#helpScreen').is(":visible")){
        if($('#pauseBtn').on('touchstart mousedown')){
            assert.Equal(gameState, 1, "Game has been unpaused")
        }
    }
    //if the help screen isn't visible, which means the game is in play, that means pressing the pause button should pause the game
    else{
            if($('#pauseBtn').on('touchstart mousedown')){
                assert.Equal(gameState, 0, "Game has been paused")
            }
        }
}

//function that checks that pressing enter will either reset the game or unpause the game
function checkEnter(e){
    var assert = require('assert');
    var pause = pause();

    //if the game is currently playing and enter is pressed, it should reset the game and display the help screen
    if(gameState == 1){
        if(e.keycheck == "enter"){
            assert.Equal('#helpScreen'.is(":visible"), true, "Game has been reset");
        }
    }
    //if the game is currently paused, pressing enter should unpause the game
    else if(gameState == 0){
        if(e.keycheck == "enter"){
            assert.Equal(gameState, 1, "Game has been unpaused");
        }
    }
}
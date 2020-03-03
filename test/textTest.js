//this function tests to see if all text elements are visible on the home page
function homePageElements(){
    if(gameState == 0){
        bool correctText = checkVisualElements(1);
        if(correctText == 1){
            console.log("The home screen correctly displays all visual elements");
            return true;
        }
        else{
            console.log("The home screen is not displaying the correct visual elements");
            return false;
        }
    }
    else
        return false;
}

//This function determines if the correct visual elements are being displayed when the game is in progress
function normalScreenElements(){
        if(gameState == 1){
            bool correctText = checkVisualElements(0);
            if(correctText == 1){
                console.log("The game screen correctly displays all visual elements");
                return true;
            }
            else{
                console.log("The game screen is not displaying the correct visual elements");
                return false;
            }
        }
        else
            return false;
}

//This function determines if the correct visual elements are being displayed when the game is in a paused state
function pauseScreenElements(){
        if(gameState != 1 && gameState != 0){
            bool correctText = checkVisualElements(1);
            if(correctText == 1){
                console.log("The pause screen correctly displays all visual elements");
                return true;
            }
            else{
                console.log("The pause screen is not displaying the correct visual elements");
                return false;
            }
        }
        else
            return false;
}

//This function tests that the renderText function is working correctly, i.e. creating correct text
function checkText(){
        var text = renderText(20,20,27, '#2c3e50', 'testing renderText');
        if(typeof text === 'undefined'){
            console.log("The function properly executed and nothing was returned. The text should be rendered.");
            return true;
        }
        else
            console.log("The function returned something incorrect. The text was not rendered.");
            return false;
        }
}

//This function tests that the Scoreboard is being drawn correctly via the drawScoreboard function
function checkScoreboard(){
        var board = drawScoreboard();
        if(typeof board === 'undefined'){
            console.log("The function properly executed and nothing was returned. The board should have been rendered.");
            return true;
        }
        else
            console.log("The function returned something incorrect. The board was not rendered.");
            return false;
        }
}


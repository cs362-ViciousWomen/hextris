//This function tests the rotatePoint function using positive numbers
function posRotate(){
    var values = rotatePoint(1,1,90);
    var xval = values.x;
    var yval = values.y;

    if(xval == -1 && yval == 1){
        console.log("The math was performed correctly");
        return true;
    }
    else{
        console.log("The math was performed incorrectly");
        return false;
    }
}

//This function tests the rotatePoint function using negative numbers
function negRotate(){
    var values = rotatePoint(-1,-1,-90);
    var xval = values.x;
    var yval = values.y;

    if(xval == -1 && yval == 1){
        console.log("The math was performed correctly");
        return true;
    }
    else{
        console.log("The math was performed incorrectly");
        return false;
    }
}

//This function tests the edge case of the rotatePoint function where all values are 0
function zeroRotate(){
    var values = rotatePoint(0,0,0);
    var xval = values.x;
    var yval = values.y;

    if(xval == 0 && yval == 0){
        console.log("The math was performed correctly");
        return true;
    }
    else{
        console.log("The math was performed incorrectly");
        return false;
    }
}

//This function tests the randInt function to make sure the number being produced falls within the correct range
function testRange(){
    var x = randInt(1,100);
    if(x >= 1 && x <= 100){
        console.log("The random value is in range and is acceptable");
        return true;
    }
    else{
        console.log("The value returned was out of bounds");
        return false;
    }
}

//This function tests the edge case of the randInt function where the range is only equal to 0
function testZeroRange(){
    var x = randInt(0,0);
    if(x == 0){
        console.log("The correct value was returned, the function works properly");
        return true;
    }
    else{
        console.log("An incorrect value was returned");
        return false;
    }
}
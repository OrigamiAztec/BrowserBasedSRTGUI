var clickCounter = 0;
var ignitionInput = 0;

function myFunction() {
    console.log("clicked button!");
    if (clickCounter == 0){
        clickCounter ++;
        document.getElementById("demo").innerHTML = "Hello World";

    }
    else{
        clickCounter = 0;
        document.getElementById("demo").innerHTML = "GOODBYE World";
    }

}

function switchButton(){
    console.log("clicked button!");
    if (ignitionInput == 0){
        ignitionInput ++;
        document.querySelector('.knob').style.transform = 'translate(40px)';
        document.querySelector('.knob').style["background-color"] = '#6ade6c';
        document.querySelector('.knob').textContent = "ON";  
        document.querySelector('.ignitionButton').style["background-color"] = '#008014';
    }
    else{
        ignitionInput = 0;
        document.querySelector('.knob').style.transform = 'translate(0px)';
        document.querySelector('.knob').style["background-color"] = '#a30b00';
        document.querySelector('.knob').textContent = "OFF";  
        document.querySelector('.ignitionButton').style["background-color"] = '#cf8580';

    }

}
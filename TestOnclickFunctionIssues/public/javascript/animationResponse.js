var clickCounter = 0;
var ignitionInput = 0;

var valveInput5 = 0;
var valveInput4 = 0;
var valveInput3 = 0;
var valveInput2 = 0;
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

function rotateValveLine3(){
    if (valveInput3 == 0){
        valveInput3 ++;
        document.querySelector('.valvePosInput3').style.transform = 'rotate(90deg)';
        document.querySelector('.pipeUp2').style["boxShadow"] = " 0 2px 2px 2px white";
    }else{
        valveInput3 = 0;
        document.querySelector('.valvePosInput3').style.transform = 'rotate(45deg)';
        document.querySelector('.pipeUp2').style["boxShadow"] = " 0 0 0 0 white";
    }

    document.querySelector('.responseIndicator3').style["boxShadow"] = "0 0 10px 5px red";

    setTimeout(function(){
        document.querySelector('.responseIndicator3').style.borderColor = "white";
        document.querySelector('.responseIndicator3').style["boxShadow"] = " 0 0 0px 0px white"
    }, 100)

}

function rotateValveLine2(){
    if (valveInput2 == 0){
        valveInput2 ++;
        document.querySelector('.valvePosInput2').style.transform = 'rotate(0deg)';
        document.querySelector('.pipeRight').style["boxShadow"] = " 0 0 2px 2px white";
        document.querySelector('.pipeUp1').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp3').style["boxShadow"] = " 0 2px 2px 2px white";

    }
    else{
        valveInput2 = 0;
        document.querySelector('.valvePosInput2').style.transform = 'rotate(45deg)';
        document.querySelector('.pipeRight').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeUp1').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeUp3').style["boxShadow"] = " 0 0 0 0 white";
    }

    document.querySelector('.responseIndicator2').style["boxShadow"] = "0 0 10px 5px red";

    setTimeout(function(){
        document.querySelector('.responseIndicator2').style.borderColor = "white";
        document.querySelector('.responseIndicator2').style["boxShadow"] = " 0 0 0px 0px white"
    }, 100)

}

function switchButton(){
    console.log("clicked button!");
    if (ignitionInput == 0){
        ignitionInput ++;
        document.querySelector('.knob').style.transform = 'translate(40px)';
        document.querySelector('.knob').style["background-color"] = '#6ade6c';
        document.querySelector('.knob').textContent = "ON";  
        document.querySelector('.ignitionButton').style["background-color"] = '#008014';
        document.querySelector('.pipeUp4').style["boxShadow"] = " 0 2px 2px 2px white";
    }
    else{
        ignitionInput = 0;
        document.querySelector('.knob').style.transform = 'translate(0px)';
        document.querySelector('.knob').style["background-color"] = '#a30b00';
        document.querySelector('.knob').textContent = "OFF";  
        document.querySelector('.ignitionButton').style["background-color"] = '#cf8580';
        document.querySelector('.pipeUp4').style["boxShadow"] = " 0 0 0 0 white";

    }

}
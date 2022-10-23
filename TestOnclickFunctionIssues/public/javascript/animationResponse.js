var clickCounter = 0;
var ignitionInput = 0;
var closeRightNavCounter = 0;

var valveInput3 = 0;
var valveInput2 = 0;
var ignitionInput = 0;

//top navigation bar functions:
function openCloseRightNavBar(){
    //console.log(closeRightNav);
    if (closeRightNavCounter == 0){
        closeRightNavCounter ++;
        document.getElementById("rightSideNav").style.width = "20em";

    }else{
        closeRightNavCounter = 0;
        document.getElementById("rightSideNav").style.width = "0";
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

//update time here
function updateNavTime() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']; 
        time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    //var newTIme = [date, time].join(' / ');
    document.querySelector(".updatedTime").textContent = time;
    // call this function again in 1000ms
    setTimeout(updateNavTime, 1000);
}
updateNavTime(); // initial call


//functions called to drag whole diagram. Doesn't work in microsoft edge.
/*
let currentDroppable = null;
let ball = document.querySelector(".diagramContainer")

document.querySelector(".diagramContainer").onmousedown = function(event) {
    // checks if left click button was pressed
    if (event.button == 0){
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
        
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        document.body.append(ball);

        
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            ball.style.left = pageX - shiftX + 'px';
            ball.style.top = pageY - shiftY + 'px';
        }
        
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            ball.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            ball.hidden = false;

            if (!elemBelow) return;
        }
        
        document.addEventListener('mousemove', onMouseMove);
    }

    document.querySelector(".diagramContainer").onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };
    
};



ball.ondragstart = function() {
    return false;
};

*/
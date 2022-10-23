/* var socket = io.connect();

var switch1Output;
var switch2Output;
var servoCurrentOutput;

socket.on('serial_output', function(data){
  console.log(data);
  // check if reading arduino_sent data
  
  data_Type = data.split(":")[0]
  if (data_Type == "arduino_sent"){
    valveClosedSwitch = data.split(":")[1].split(",")[0];
    valveOpenedSwitch = data.split(":")[1].split(",")[1];
    
    if (valveClosedSwitch == "0" && valveOpenedSwitch == "1"){
        //console.log("valve is reading closed");
        document.querySelector(".valveInput1Read").textContent = "Switch Result: Closed";
    }
    
    if (valveClosedSwitch == "1" && valveOpenedSwitch == "0"){
        //console.log("valve is reading open");
        document.querySelector(".valveInput1Read").textContent = "Switch Result: Open";
    }
    else{
        //console.log(data.split(":")[1]);
    }

    switch2Output = (data.split("\r")[0]).split(",")[1]
    servoCurrentOutput = (data.split("\r")[0]).split(",")[5]
    //var newHeight = fill_height + "px";

  }else{
    //console.log()
  }
  
});
*/

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

//update date here
function updateNavDate() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']; 

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');


    document.querySelector(".updatedDate").textContent = date;
    // call this function again in 1000ms
    setTimeout(updateNavDate, 1000 );
}
updateNavDate(); // initial call

// initialize variables going to page and variables up here
var closeLeftNavCounter = 0;
var closeRightNavCounter = 0;
var valveInput5 = 0;
var valveInput4 = 0;
var valveInput3 = 0;
var valveInput2 = 0;
var ignitionInput = 0;
var servoCurrentOutput;

function openCloseLeftNavBar(){
    //console.log(closeLeftNav);
    if (closeLeftNavCounter == 0){
        closeLeftNavCounter ++;
        document.getElementById("leftSideNav").style.width = "10em";
        document.querySelector(".rightPointer1").style.transform = 'rotate(180deg)';
    }else{
        closeLeftNavCounter = 0;
        document.getElementById("leftSideNav").style.width = "0";
        document.querySelector(".rightPointer1").style.transform = 'rotate(0deg)';
    }
}

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

function rotateValveLine5(){
    if (valveInput5 == 0){
        valveInput5 ++;
        document.querySelector('.valvePosInput5').style.transform = 'rotate(0deg)';

    }else{
        valveInput5 = 0;
        document.querySelector('.valvePosInput5').style.transform = 'rotate(45deg)';
    }

    document.querySelector('.responseIndicator5').style["boxShadow"] = "0 0 10px 5px red";

    setTimeout(function(){
        document.querySelector('.responseIndicator5').style.borderColor = "white";
        document.querySelector('.responseIndicator5').style["boxShadow"] = " 0 0 0px 0px white"
    }, 100)

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

function simPressureData(){
    var guessVal = Math.random() * (1200 - 800) + 800;
    return guessVal;
}

var trace1 = {
    //y : [simPressureData()],
    y : [servoCurrentOutput],
    type: 'line-marker'
};

var layout1 = {
    autosize: false,
    width: 300,
    height: 300,
    plot_bgcolor:"#111",
    paper_bgcolor: "#111",
    margin: {l: 80,
             r: 50,
             b: 50,
             t: 80,
             pad: 0
            },
    title: {text:'Closed Switch Output',
            font: {color: 'white',
                   size: 14
                   },
            },

    xaxis: {gridcolor: "#949494", 
            zerolinecolor : "white", 
            title: 'time (s)',
            titlefont: {size: 10,
                        color: 'white'
                        },
            tickfont: {size: 10,
                       color: 'white'
                       }
            },
    
    yaxis: {gridcolor: "#949494", 
            zerolinecolor : "white", 
            title: 'switch Output (mA)',
            titlefont: {size: 10,
                        color: 'white'
                        },
            tickfont: {size: 10,
                       color: 'white'
                       }
            },
    
    };


var data1 = [trace1];

Plotly.newPlot('plotDiv1', data1, layout1);

var xAxisCounter = 0;
var xAxisChangeVal = 50;

setInterval(function(){
    //Plotly.extendTraces('plotDiv1', { y : [[simPressureData()]]}, [0]);
    Plotly.extendTraces('plotDiv1', {y : [[servoCurrentOutput]]}, [0]);
    xAxisCounter++;

    if (xAxisCounter > xAxisChangeVal){
        Plotly.relayout('plotDiv1', {
            xaxis: {
                range: [xAxisCounter - xAxisChangeVal, xAxisCounter],
                gridcolor: "#949494", 
                zerolinecolor : "white",
                tickfont: {color: 'white'
                        },
                title: 'time (s)',
                titlefont: {size: 10,
                        color: 'white'
                        }
            }
        })
    }

}, 100);

var myArray = new Array("COM4", "COM5", "COM6", "COM7", "COM8");

var dropdown = document.querySelector(".portSelectionDiv-content");

for (var i = 0; i < myArray.length; ++i) {
    var innerNode = document.createElement("p");
    innerNode.appendChild(document.createTextNode(myArray[i]));

    var node = document.createElement("div");
    node.appendChild(innerNode);
    node.setAttribute('class', myArray[i]);

    dropdown.appendChild(node);

    var testDivID =  "." + myArray[i];
    document.querySelector(testDivID).onmousedown = function(event) {
        console.log("clicked");
        
    };
}



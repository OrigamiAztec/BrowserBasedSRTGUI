var clickCounter = 0;
var closeRightNavCounter = 0;

var abortStatus = 0;

var valveInput4 = 0;
var valveInput3 = 0;
var valveInput2 = 0;

var sysArmStatus = 0;
var solArmStatus = 0;
var ignArmStatus = 0;

var runTankWeight;
var supplyTankWeight;

var DataRecordingStatus = 0;

var globalTime;
var globalDate;

var lastReceivedString;

//Commands:
//a - abort
//b - buzzer
//c - buzzer off

//d - system arm
//e - system disarm

//f - solenoid arm
//g - solenoid disarm

//h - ignition arm
//i- ignition disarm


//j - N2O fill open - OV-1 open
//k - N2O fill close - OV-1 close

//l - N2O vent open - OV-2 open
//m - N2O vent close - OV-2 close

//n - Run Tank Vent Open - OV-3 open
//o - Run Tank Vent Close - Ov-3 close

//p - ignition on
//q - ignition off


//logging all data received from ethernet port over console:
/*var socket = io();

socket.on('data2', function(data) {        
        console.log(data);
        if (data.includes("z/")){
            document.querySelector('.last_received_text').textContent = "Last Received: " + data.split("/")[1];
        }
});

socket.on('padWeightdata', function(data){
    //runTankWeight = DataRecordingStatus
    runTankWeight = parseFloat(data.split(",")[0]);
    supplyTankWeight = parseFloat(data.split(",")[1]);
    //console.log(runTankWeight, supplyTankWeight);
    document.querySelector(".LC2Label2").textContent = runTankWeight + " lbf";
});
*/

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

function abortSystem(){
    if (abortStatus == 0){
        // abort means open all solenoids then disarm system by software.
        abortStatus ++;
        console.log("abort system");
        document.querySelector('.abortLogo').style["background-color"] = "#6ade6c";
        //console.log(globalTime)
        
        document.querySelector('.last_sent_text').textContent = "Last Sent: ABORT";

        //update system arming button
        document.querySelector('.knob-sysArm').style.transform = 'translate(0px)';
        document.querySelector('.knob-sysArm').style["background-color"] = '#a30b00';
        document.querySelector('.knob-sysLabel').textContent = "SYS DISARMED";  
        document.querySelector('.knob-sysLabel').style["color"] = "white";  
        document.querySelector('.sysArmButton').style["background-color"] = "#cf8580";

        //update solenoid arming button
        document.querySelector('.knob-solArm').style.transform = 'translate(0px)';
        document.querySelector('.knob-solArm').style["background-color"] = '#a30b00';
        document.querySelector('.knob-solLabel').textContent = "SOL DISARMED";  
        document.querySelector('.knob-solLabel').style["color"] = "white";  
        document.querySelector('.solArmButton').style["background-color"] = "#cf8580";

        //updating OV3 open logo
        document.querySelector('.valvePosInput4').style.transform = 'rotate(0deg)';
        document.querySelector('.pipeRight4').style["boxShadow"] = " 0 0 2px 2px white";

        //updating OV2 open logo
        document.querySelector('.valvePosInput3').style.transform = 'rotate(90deg)';
        document.querySelector('.pipeUp2').style["boxShadow"] = " 0 2px 2px 2px white";

        //updating OV1 open logo
        document.querySelector('.valvePosInput2').style.transform = 'rotate(0deg)';
        document.querySelector('.pipeRight').style["boxShadow"] = " 0 0 2px 2px white";
        document.querySelector('.pipeRight3').style["boxShadow"] = " 0 0 2px 2px white";

        document.querySelector('.pipeUp1').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp3').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp6').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp7').style["boxShadow"] = " 0 2px 2px 2px white";

        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SYS ABORT"]);
        }  

        //Commands:
        //a - abort which will turn off igniter relays, arm solenoids to open, open all solenoids, beep buzzer, then disarm everything.
        socket.emit('inputString', "a");
        sysArmStatus = 0;
        solArmStatus = 0;
        ignArmStatus = 0;
    }
    else{
        
        // un-aborting effectively does nothing. just resets button so you can try to abort again.
        abortStatus = 0;

        console.log("un-abort system");

        document.querySelector('.abortLogo').style["background-color"] = "#a30b00";
        document.querySelector('.last_sent_text').textContent = "Last Sent: UNABORT";

        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SYS UNABORT"]);
        }
    }
}

function armDisarmSystem(){
    if (sysArmStatus == 0){
        sysArmStatus ++;
        console.log("arming system");
        //console.log(globalTime);
        //socket.emit('inputString', "d");
        document.querySelector('.last_sent_text').textContent = "Last Sent: SYS ARM";
        document.querySelector('.knob-sysArm').style.transform = 'translate(5em)';
        document.querySelector('.knob-sysArm').style["background-color"] = '#6ade6c';
        document.querySelector('.sysArmButton').style["background-color"] = "rgb(0, 128, 20)";
        document.querySelector('.knob-sysLabel').textContent = "SYS ARMED";  
        document.querySelector('.knob-sysLabel').style["color"] = "black";
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SYS ARM"]);
        }  

    }
    else{
        sysArmStatus = 0;
        solArmStatus = 0;
        ignArmStatus = 0;

        console.log("disarming system");
        //socket.emit('inputString', "e");

        console.log("disarming solenoid");
        //socket.emit('inputString', "g");

        console.log("disarming Igniter");
        //socket.emit('inputString', "i");

        //update system arming button
        document.querySelector('.last_sent_text').textContent = " Last Sent: SYS DISARM";
        document.querySelector('.knob-sysArm').style.transform = 'translate(0px)';
        document.querySelector('.knob-sysArm').style["background-color"] = '#a30b00';
        document.querySelector('.knob-sysLabel').textContent = "SYS DISARMED";  
        document.querySelector('.knob-sysLabel').style["color"] = "white";  
        document.querySelector('.sysArmButton').style["background-color"] = "#cf8580";

        //update solenoid arming button
        document.querySelector('.knob-solArm').style.transform = 'translate(0px)';
        document.querySelector('.knob-solArm').style["background-color"] = '#a30b00';
        document.querySelector('.knob-solLabel').textContent = "SOL DISARMED";  
        document.querySelector('.knob-solLabel').style["color"] = "white";  
        document.querySelector('.solArmButton').style["background-color"] = "#cf8580";

        //update ignition arming button
        
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SYS DISARM"]);
        }
    }
}

function armDisarmSol(){
    if (sysArmStatus && (solArmStatus == 0)){
        solArmStatus ++;
        console.log("arming solenoid");
        //socket.emit('inputString', "f");
        document.querySelector('.last_sent_text').textContent = " Last Sent: SOL ARM";
        document.querySelector('.knob-solArm').style.transform = 'translate(5em)';
        document.querySelector('.knob-solArm').style["background-color"] = '#6ade6c';
        document.querySelector('.solArmButton').style["background-color"] = "rgb(0, 128, 20)";
        document.querySelector('.knob-solLabel').textContent = "SOL ARMED";  
        document.querySelector('.knob-solLabel').style["color"] = "black";  
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SOL ARM"]);
        }  

    }
    else{
        solArmStatus = 0;
        console.log("disarming solenoid");
        //socket.emit('inputString', "g");

        document.querySelector('.last_sent_text').textContent = " Last Sent: SOL DISARM";
        document.querySelector('.knob-solArm').style.transform = 'translate(0px)';
        document.querySelector('.knob-solArm').style["background-color"] = '#a30b00';
        document.querySelector('.knob-solLabel').textContent = "SOL DISARMED";  
        document.querySelector('.knob-solLabel').style["color"] = "white";  
        document.querySelector('.solArmButton').style["background-color"] = "#cf8580";
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "SOL DISARM"]);
        }  
    }
}


function rotateValveLine4(){
    if (solArmStatus && (valveInput4 == 0)){
        valveInput4 ++;
        console.log("OV-3 open");
        //socket.emit('inputString', "n");

        document.querySelector('.last_sent_text').textContent = " Last Sent: OV3+";
        document.querySelector('.valvePosInput4').style.transform = 'rotate(0deg)';
        document.querySelector('.pipeRight4').style["boxShadow"] = " 0 0 2px 2px white";
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV3 OPEN"]);
        }  
    }else{
        valveInput4 = 0;
        console.log("OV-3 close");
        //socket.emit('inputString', "o");
        document.querySelector('.last_sent_text').textContent = " Last Sent: OV3-";
        document.querySelector('.valvePosInput4').style.transform = 'rotate(45deg)';
        document.querySelector('.pipeRight4').style["boxShadow"] = " 0 0 0 0 white";
        
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV3 CLOSE"]);
        }  
    }

    //document.querySelector('.responseIndicator3').style["boxShadow"] = "0 0 10px 5px red";

    //setTimeout(function(){
    //    document.querySelector('.responseIndicator3').style.borderColor = "white";
    //    document.querySelector('.responseIndicator3').style["boxShadow"] = " 0 0 0px 0px white"
    //}, 100)
}

function rotateValveLine3(){
    if (solArmStatus && (valveInput3 == 0)){
        valveInput3 ++;
        console.log("OV-2 Open");
        //socket.emit('inputString', "l");

        document.querySelector('.last_sent_text').textContent = " Last Sent: OV2+";
        document.querySelector('.valvePosInput3').style.transform = 'rotate(90deg)';
        document.querySelector('.pipeUp2').style["boxShadow"] = " 0 2px 2px 2px white";
        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV2 OPEN"]);
        }  
    }else{
        valveInput3 = 0;
        console.log("OV-2 Close");
        //socket.emit('inputString', "m");

        document.querySelector('.last_sent_text').textContent = " Last Sent: OV2-";
        document.querySelector('.valvePosInput3').style.transform = 'rotate(45deg)';
        document.querySelector('.pipeUp2').style["boxShadow"] = " 0 0 0 0 white";

        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV2 CLOSE"]);
        }  
    }

    document.querySelector('.responseIndicator3').style["boxShadow"] = "0 0 10px 5px red";

    setTimeout(function(){
        document.querySelector('.responseIndicator3').style.borderColor = "white";
        document.querySelector('.responseIndicator3').style["boxShadow"] = " 0 0 0px 0px white"
    }, 100)

}

function rotateValveLine2(){
    if (solArmStatus && (valveInput2 == 0)){
        valveInput2 ++;
        console.log("OV-1 open");
        //socket.emit('inputString', "j");

        document.querySelector('.last_sent_text').textContent = " Last Sent: OV1+";
        document.querySelector('.valvePosInput2').style.transform = 'rotate(0deg)';
        document.querySelector('.pipeRight').style["boxShadow"] = " 0 0 2px 2px white";
        document.querySelector('.pipeRight3').style["boxShadow"] = " 0 0 2px 2px white";

        document.querySelector('.pipeUp1').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp3').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp6').style["boxShadow"] = " 0 2px 2px 2px white";
        document.querySelector('.pipeUp7').style["boxShadow"] = " 0 2px 2px 2px white";

        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV1 OPEN"]);
        }  
    }
    else{
        valveInput2 = 0;
        console.log("OV-1 close");

        //socket.emit('inputString', "k");

        document.querySelector('.last_sent_text').textContent = " Last Sent: OV1-";
        document.querySelector('.valvePosInput2').style.transform = 'rotate(45deg)';
        document.querySelector('.pipeRight').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeRight3').style["boxShadow"] = " 0 0 0 0 white";

        document.querySelector('.pipeUp1').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeUp3').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeUp6').style["boxShadow"] = " 0 0 0 0 white";
        document.querySelector('.pipeUp7').style["boxShadow"] = " 0 0 0 0 white";

        if (DataRecordingStatus){
            csvSimulatedFileData.push([globalDate, globalTime, "OV1 CLOSE"]);
        }  
    }

    document.querySelector('.responseIndicator2').style["boxShadow"] = "0 0 10px 5px red";

    setTimeout(function(){
        document.querySelector('.responseIndicator2').style.borderColor = "white";
        document.querySelector('.responseIndicator2').style["boxShadow"] = " 0 0 0px 0px white"
    }, 100)

}



//update time here
function updateNavTime() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']; 
        time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        globalTime = time;

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');
        
        globalDate = date;

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


//section below will set response to starting to record data when clicked
function updateDataRecordingState(){
    if (DataRecordingStatus == 0){
        DataRecordingStatus ++;
        console.log("recording data");
        document.getElementById('imgClickAndChange').src = '/images/playButtonLogoRed.PNG';
        document.getElementById('recordingTextStatus').textContent = "Recording";
    }
    else{
        DataRecordingStatus = 0;
        console.log("not recording data");
        document.getElementById('imgClickAndChange').src = '/images/playButtonLogo.PNG';
        document.getElementById('recordingTextStatus').textContent = "Not Recording";
    }
}

//create CSV file data in an array  
var csvSimulatedFileData = [  
    //['10/24/2022', '1:49:13', "SupplyFillClose"],  
    //['10/24/2022', '1:49:13', "SupplyVentClose"],  
    //['10/24/2022', '1:49:14', "IgnitionOff"],  
 ];  

//save CSV file from commands saved during save session
function download_csv_file(){
    //define the heading for each row of the data  
    var csv = 'Date, Time, Command\n';  
       
    //merge the data with CSV  
    csvSimulatedFileData.forEach(function(row) {  
            csv += row.join(',');  
            csv += "\n";  
    });  
   
    var csvFile;
    var downloadLink;
   
    //define the file type to text/csv
    csvFile = new Blob([csv], {type: 'text/csv'});
    downloadLink = document.createElement("a");
    downloadLink.download = "testData.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    
}



var canvas = document.getElementById('canvas');

var width = 120;
var height = 60;

var context = canvas.getContext('2d');
context.fillStyle="#2e5266"

var gameState = createArray(width, height);

var running = false;


function startStop() {
	if(running) {
		running = false;

		document.getElementById("startStopButton").innerText= "Start";
	}
	else {
		context.clearRect(0, 0, canvas.width, canvas.height);
		running = true;

		init();
		seed();
		play();

		document.getElementById("startStopButton").innerText= "Stop";
	}
}

function seed() {
	for(var i=1, ii=width-1; i<ii; i++) {
		for(var j=1, jj=height-1; j<jj; j++) {
			gameState[i][j].live = Math.random() > 0.5 ? 1 : 0;
		}
	}
}

async function play() {

	while(running) {
		processRules();
		draw();

		await sleep(200);
	}
}

function iterate() {
	processRules();
	draw();
}

function processRules() {
	for(var i=1, ii=width-1; i<ii; i++) {
		for(var j=1, jj=height-1; j<jj; j++) {

			var neighbourCount = 0;
				
			neighbourCount += gameState[i][j-1].live; //north
			neighbourCount += gameState[i][j+1].live; //south
			neighbourCount += gameState[i+1][j].live; //east
			neighbourCount += gameState[i-1][j].live; //west
			neighbourCount += gameState[i+1][j-1].live; //north-east
			neighbourCount += gameState[i+1][j+1].live; //south-east
			neighbourCount += gameState[i-1][j-1].live; //north-west
			neighbourCount += gameState[i-1][j+1].live; //south-west
			
			//live cell rules
			if(gameState[i][j].live) {

				//under population
				if(neighbourCount < 2) {
					gameState[i][j].newValue = 0;
				}
				//over population
				else if(neighbourCount > 3) {
					gameState[i][j].newValue = 0;
				}

				else {
					gameState[i][j].newValue = 1;	
				}
			}

			//dead cell rules
			else {
				if(neighbourCount == 3) {
					gameState[i][j].newValue = 1;
				}
			}

		}
	}

	//now copy the new state into the live state
	for(var i=0, ii=width; i<ii; i++) {
		for(var j=0, jj=height; j<jj; j++) {
			gameState[i][j].live = gameState[i][j].newValue;
		}
	}


}

function init() {
	for(var i=0, ii=width; i<ii; i++) {
		for(var j=0, jj=height; j<jj; j++) {
			gameState[i][j] = { live: 0, newValue: 0 }
		}
	}
}

function draw() {

	for(var i=0, ii=width; i<ii; i++) {
		for(var j=0, jj=height; j<jj; j++) {
			if(gameState[i][j].live)
				context.fillRect(i*5, j*5, 5, 5);
			else
				context.clearRect(i*5, j*5, 5, 5)
		}
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
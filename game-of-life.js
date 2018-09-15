var canvas = document.getElementById('canvas');

var width = 10;
var height = 10;

var context = canvas.getContext('2d');

var gameState = createArray(width, height);

init();

//Generate start configuration
/*gameState[5][4].live = 1;
gameState[5][5].live = 1;
gameState[5][6].live = 1;*/

//glider
gameState[5][5].live = 1;
gameState[6][5].live = 1;
gameState[7][5].live = 1;
gameState[6][4].live = 1;
gameState[7][4].live = 1;
gameState[8][4].live = 1;

//draw(); 
play();

async function play() {

	while(true) {
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
	//under population rule. Any cell with fewer than 2 live neighbours dies.
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
					console.log("Cell " + i + "," + j + " dies by under population");
					gameState[i][j].newValue = 0;
				}
				//over population
				else if(neighbourCount > 3) {
					console.log("Cell " + i + "," + j + " dies by over population");
					gameState[i][j].newValue = 0;
				}

				else {
					console.log("Cell " + i + "," + j + " survives");
					gameState[i][j].newValue = 1;	
				}
			}

			//dead cell rules
			else {
				if(neighbourCount == 3) {
					console.log("Cell " + i + "," + j + " is born");
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

	context.clearRect(0, 0, canvas.width, canvas.height);

	for(var i=0, ii=width; i<ii; i++) {
		for(var j=0, jj=height; j<jj; j++) {
			if(gameState[i][j].live)
				context.fillRect(i*5, j*5, 5, 5);
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
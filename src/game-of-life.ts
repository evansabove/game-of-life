class Game {
    private gameState: Cell[][];
    private running = false;
    private size = 600;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;    

    constructor() {
        this.gameState = [];
        this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.context.fillStyle="#038C8C"
    }

    startStop() {
        if(this.running) {
            this.running = false;
    
            document.getElementById("startStopButton")!.innerText= "Start";
        }
        else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.running = true;
    
            this.init();
            this.seed();
            this.play();
    
            document.getElementById("startStopButton")!.innerText= "Stop";
        }
    }

    init() {
        for(var i=0, ii=this.size; i<ii; i++) {
            this.gameState[i] = [];
            for(var j=0, jj=this.size; j<jj; j++) {
                this.gameState[i][j] = new Cell();
            }
        }
    }
    
    seed() {
        for(var i=1, ii=this.size-1; i<ii; i++) {
            for(var j=1, jj=this.size-1; j<jj; j++) {
                this.gameState[i][j].live = Math.random() > 0.5 ? true : false;
            }
        }
    }

    play() {
        if(this.running) {
            this.processRules();
            this.draw();

            setTimeout(() => this.play(), 100);
        }
    }

    processRules() {
        for(var i=1, ii=this.size-1; i<ii; i++) {
            for(var j=1, jj=this.size-1; j<jj; j++) {
    
                var neighbourCount = 0;
                    
                neighbourCount += (this.gameState[i][j-1].live ? 1 : 0); //north
                neighbourCount += (this.gameState[i][j+1].live ? 1 : 0); //south
                neighbourCount += (this.gameState[i+1][j].live ? 1 : 0); //east
                neighbourCount += (this.gameState[i-1][j].live ? 1 : 0); //west
                neighbourCount += (this.gameState[i+1][j-1].live ? 1 : 0); //north-east
                neighbourCount += (this.gameState[i+1][j+1].live ? 1 : 0); //south-east
                neighbourCount += (this.gameState[i-1][j-1].live ? 1 : 0); //north-west
                neighbourCount += (this.gameState[i-1][j+1].live ? 1 : 0); //south-west
                
                //live cell rules
                if(this.gameState[i][j].live) {
    
                    //under population
                    if(neighbourCount < 2) {
                        this.gameState[i][j].newValue = false;
                    }
                    //over population
                    else if(neighbourCount > 3) {
                        this.gameState[i][j].newValue = false;
                    }
    
                    else {
                        this.gameState[i][j].newValue = true;	
                    }
                }
    
                //dead cell rules
                else {
                    if(neighbourCount == 3) {
                        this.gameState[i][j].newValue = true;
                    }
                }
    
            }
        }
    
        //now copy the new state into the live state
        for(var i=0, ii=this.size; i<ii; i++) {
            for(var j=0, jj=this.size; j<jj; j++) {
                this.gameState[i][j].live = this.gameState[i][j].newValue;
            }
        }
    }

    draw() {

        for(var i=0, ii=this.size; i<ii; i++) {
            for(var j=0, jj=this.size; j<jj; j++) {
                if(this.gameState[i][j].live && this.gameState[i][j].live === this.gameState[i][j].newValue)
                    this.context.fillRect(i*5, j*5, 5, 5);
                else
                    this.context.clearRect(i*5, j*5, 5, 5)
            }
        }
    }
}

class Cell {
    live: boolean;
    newValue: boolean;

    constructor() {
        this.live = false;
        this.newValue = false;
    }
}

var game = new Game();

function startStop() {
    game.startStop();
}
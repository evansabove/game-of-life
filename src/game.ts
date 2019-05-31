import Cell from './cell';

export default class Game {
      private running = false;
      private canvas!: HTMLCanvasElement;
      private context!: CanvasRenderingContext2D;
      private size = 600;
      private gameState!: Cell[][];

      constructor() {
            this.gameState = [];
      }

      public draw(canvas: HTMLCanvasElement): void {
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d')!;
      }

      get isRunning() {
            return this.running;
      }

      public startStop() {
            if (this.running) {
                  this.running = false;
            } else {
                  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                  this.running = true;

                  this.init();
                  this.seed();
                  this.play();
            }
      }

      private init() {
            for (let i = 0, ii = this.size; i < ii; i++) {
                  this.gameState[i] = [];
                  for (let j = 0, jj = this.size; j < jj; j++) {
                        this.gameState[i][j] = new Cell();
                  }
            }
      }

      private seed() {
            for (let i = 1, ii = this.size - 1; i < ii; i++) {
                  for (let j = 1, jj = this.size - 1; j < jj; j++) {
                        this.gameState[i][j].live = Math.random() > 0.5 ? true : false;
                  }
            }
      }

      private play() {
            if (this.running) {
                  this.processRules();
                  this.render();

                  setTimeout(() => this.play(), 100);
            }
      }

      private processRules() {
            for (let i = 1, ii = this.size - 1; i < ii; i++) {
                  for (let j = 1, jj = this.size - 1; j < jj; j++) {

                        let neighbourCount = 0;

                        if (this.gameState[i] === undefined) {
                              return;
                        }

                        neighbourCount += (this.gameState[i][j - 1].live ? 1 : 0); // north
                        neighbourCount += (this.gameState[i][j + 1].live ? 1 : 0); // south
                        neighbourCount += (this.gameState[i + 1][j].live ? 1 : 0); // east
                        neighbourCount += (this.gameState[i - 1][j].live ? 1 : 0); // west
                        neighbourCount += (this.gameState[i + 1][j - 1].live ? 1 : 0); // north-east
                        neighbourCount += (this.gameState[i + 1][j + 1].live ? 1 : 0); // south-east
                        neighbourCount += (this.gameState[i - 1][j - 1].live ? 1 : 0); // north-west
                        neighbourCount += (this.gameState[i - 1][j + 1].live ? 1 : 0); // south-west

                        // live cell rules
                        if (this.gameState[i][j].live) { // under population
                              if (neighbourCount < 2) {
                                    this.gameState[i][j].newValue = false;
                              } else if (neighbourCount > 3) { // over population
                                    this.gameState[i][j].newValue = false;
                              } else {
                                    this.gameState[i][j].newValue = true;
                              }
                        } else { // dead cell rules
                              if (neighbourCount === 3) {
                                    this.gameState[i][j].newValue = true;
                              }
                        }

                  }
            }

            // now copy the new state into the live state
            for (let i = 0, ii = this.size; i < ii; i++) {
                  for (let j = 0, jj = this.size; j < jj; j++) {
                        this.gameState[i][j].live = this.gameState[i][j].newValue;
                  }
            }
      }

      private render() {
            for (let i = 0, ii = this.size; i < ii; i++) {
                  for (let j = 0, jj = this.size; j < jj; j++) {
                        if (this.gameState[i][j].live && this.gameState[i][j].live === this.gameState[i][j].newValue) {
                              this.context.fillStyle = '#1B264F';
                              this.context.fillRect(i * 5, j * 5, 5, 5);
                        } else {
                              this.context.clearRect(i * 5, j * 5, 5, 5);
                        }
                  }
            }
      }
}

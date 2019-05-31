<template>
  <div>
    <div align="center">
      <h1>Game of Life</h1>

      <canvas width="600" height="600" v-draw="game"></canvas>
    </div>

    <div align="center">
      <button @click="startStop">{{startStopButtonText}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Game from '../game';

@Component({
  directives: {
    draw: (canvasElement, binding) => {
      binding.value.draw(canvasElement as HTMLCanvasElement);
    },
  },
})
export default class GameOfLife extends Vue {
  private game: Game;

  constructor() {
    super();

    this.game = new Game();
  }

  get startStopButtonText() {
    return this.game.isRunning ? 'Stop' : 'Start';
  }

  private startStop() {
    this.game.startStop();
  }
}
</script>

<style scoped>
</style>

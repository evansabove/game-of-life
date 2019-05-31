<template>
  <div id="app">
    <GameOfLife></GameOfLife>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameOfLife from './components/GameOfLife.vue';

@Component({
  components: {
    GameOfLife
  }
})
export default class App extends Vue {}
</script>

<style>
body {
  background-color: #d0e3e9;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

h1 {
  padding: 0 0 15px 0;
  border-bottom: dashed 1px #025e73;
  color: #025e73;
}

canvas {
  margin: 0 0 20px 0;
}

button {
  display: inline-block;
  padding: 15px 32px;
  background-color: #025e73;
  border: none;
  color: #d0e3e9;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
}
</style>

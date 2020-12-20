<template>
  <Sudoku/>
</template>

<script>

import Sudoku from './components/Sudoku.vue'

export default {
  components: {
    Sudoku
  }
}
</script>

<style>
  #app{
    width: 100%;
    font-size: 24px;
  }
  *{
    margin: 0;
    padding: 0;
  }
  *:focus{
    outline: none;
  }
</style>

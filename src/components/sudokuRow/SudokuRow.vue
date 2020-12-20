<template>
  <div class="sudoku-row">
    <SudokuBox
      v-for="(element, key) in sudokuRow"
      :key="key"
      :boxObject="element"
      :rowNumber="rowNumber"
      :colNumber="key"
      :setHigtLighted="setHigtLighted"
    />
  </div>
</template>

<script>

import SudokuBox from './sudokuBox/SudokuBox.vue'

export default {
  props: {
    sudokuRow: Array,
    rowNumber: Number,
    setHigtLighted: Function
  },
  components: {
    SudokuBox
  }
}
</script>

<style lang="scss">
.sudoku-row{
  // width: 100%;
  // height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &:nth-child(3n + 1):not(:last-child){
    margin-top: 0.5em;
  }
}
</style>

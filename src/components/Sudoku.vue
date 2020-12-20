<template>
  <div class="sudoku-holder">
    <SudokuRow
    v-for="(arr, key)  in getBoard"
    :key="key"
    :sudokuRow="arr"
    :rowNumber="key"
    :setHigtLighted="setHigtLighted"
    />
  </div>
</template>

<script>
import Sudoku from '@/source/sudoku.js'
import SudokuRow from './sudokuRow/SudokuRow.vue'
export default {
  data () {
    return {
      size: 9,
      board: new Sudoku('insane', 9),
      playerBoard: []
    }
  },
  components: {
    SudokuRow
  },
  methods: {
    setHigtLighted (row, col, number) {
      let board = this.resetHigtLight(this.getBoard)
      board = this.highLightRow(board, row)
      board = this.highLightCol(board, col)
      board = this.highLightBox(board, row - row % 3, col - col % 3)
      board = this.highLightNumber(board, number)
      this.playerBoard = board
    },
    highLightRow (board, row) {
      for (let i = 0; i < this.size; i++) {
        board[row][i].isHigtLighted = true
      }
      return board
    },
    highLightCol (board, col) {
      for (let i = 0; i < this.size; i++) {
        board[i][col].isHigtLighted = true
      }
      return board
    },
    highLightBox (board, startRow, startCol) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          board[row + startRow][col + startCol].isHigtLighted = true
        }
      }
      return board
    },
    highLightNumber (board, number) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].value === number && number !== 0) {
            board[i][j].isHigtLighted = true
          }
        }
      }
      return board
    },
    resetHigtLight (board) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j].isHigtLighted = false
        }
      }
      return board
    }
  },
  computed: {
    getBoard () {
      return this.playerBoard
    },
    initializeBoard () {
      const board = this.resetHigtLight(this.board.generatePlayerBoard())
      return board
    }
  },
  mounted () {
    this.playerBoard = this.initializeBoard
  }
}
</script>

<style lang="scss" scoped>
.sudoku-holder{
  margin: 0 auto;
  display: flex;
  max-width: 800px;
  // width: 18em;
  // height: 18em;
  justify-content: center;
  align-items: center;
  // border: 2px solid #5c5e62;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>

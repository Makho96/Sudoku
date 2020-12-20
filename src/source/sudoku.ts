/* eslint-disable */

class Sudoku {
    constructor(difficulty: string, size: number) {
        this.difficulty = difficulty
        this.size = size
        this.generateEmptyBoard(size)
    }

    size: number
    difficulty: string = 'easy'
    newBoardArray: object[][] = []
    boardForPlayer: object[][] = []

    sloveSudoku(board: any[][]): boolean {
        const row: {
            value: number
        } = {
            value: 0
        }
        const col: {
            value: number
        } = {
            value: 0
        }

        if (this.isBoardFull(board, row, col)) {
            return true;
        }

        for (let number = 1; number <= this.size; number++) {
            if (this.isSafe(board, row.value, col.value, number)) {
                board[row.value][col.value].value = number;

                if (this.sloveSudoku(board)) {
                    return true
                }

                board[row.value][col.value].value = 0
            }
        }
        return false
    }

    isBoardFull(board: any[][], row: { value: number }, col: { value: number }): boolean {
        for (row.value = 0; row.value < this.size; row.value++) {
            for (col.value = 0; col.value < this.size; col.value++) {
                if (board[row.value][col.value].value === 0)
                    return false;
            }
        }
        return true;
    }

    isSafe(board: any[][], row: number, col: number, number: number): boolean {
        return this.checkRow(board[row], number, this.size) &&
            this.checkBox(row - row % 3, col - col % 3, number, board) &&
            this.checkCol(col, number, this.size, board) &&
            board[row][col].value === 0
    }

    generateRandomRow(size: number): object[] {
        const randomRow:any[] = []
        let elemCount = 0;
        for (let i = 0; i< size; i++ ) {
            const element : {
                value?: number;
                isGenerated?: boolean;
            } = {
                value: 0,
                isGenerated: true
            }
            randomRow.push(element)
        }
        while (elemCount !== size) {
            const number = Math.floor((Math.random() * size) + 1)
            if (this.checkRow(randomRow, number, size)) {
                randomRow[elemCount].value = number
                elemCount++
            }
        }
        return randomRow
    }

    generateBoard () :object[][]{
        this.sloveSudoku(this.newBoardArray)
        return this.newBoardArray
    }

    generateEmptyBoard = (size: number): void => {
        const firstRow = this.generateRandomRow(size)
        this.newBoardArray = [
            [...firstRow]
        ]
        for (let i = 0; i < size - 1; i++){
            const row = []
            for (let j = 0; j < size; j++) {
                const element: {
                    value: number;
                    isGenerated: boolean
                } = {
                    value: 0,
                    isGenerated: true
                }
                row.push(element)
            }
            this.newBoardArray.push(row)
        }
    }

    generatePlayerBoard(): number[][] {
        const playerBoard: any[][] = [...this.generateBoard()];
        const numberRange = this.getRemovingNumberRange();
        for (let i = 0; i < this.size; i++) {
            this.removeNumbers(numberRange.start, numberRange.end, i, playerBoard)
        }
        return playerBoard;
    }

    removeNumbers(min: number, max: number, square: number, playerBoard: any[][]) {
        const numberCountToRemove = Math.floor(Math.random() * (max - min + 1) + min);
        let startIndexX = Math.floor(square / 3) * 3;
        let startIndexY = (square % 3) * 3;
        let removedNumbersCount = 0;
        while (removedNumbersCount < numberCountToRemove) {
            const randomIndexX =  Math.floor(Math.random() * ((startIndexX) + 3 - startIndexX) + startIndexX)
            const randomIndexY =  Math.floor(Math.random() * ((startIndexY) + 3 - startIndexY) + startIndexY)
            if (playerBoard[randomIndexX][randomIndexY].value !== 0) {
                playerBoard[randomIndexX][randomIndexY].value = 0
                playerBoard[randomIndexX][randomIndexY].isGenerated = false
                removedNumbersCount ++
            }
        }

    }

    checkBox(startRow: number, startCol: number, num: number, boardArray: any[][]): boolean {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (num === boardArray[row + startRow][col + startCol].value) {
                    return false
                }
            }
        }
        return true
    }

    checkRow(row: any[], num: number, size: number): boolean {
        for (let i = 0; i < size; i++) {
            if (row[i].value === num) {
                return false
            }
        }
        return true
    }

    checkCol(col: number, num: number, size: number, boardArray: any[][]): boolean {
        for (let i = 0; i < size; i++) {
            if (boardArray[i][col].value === num) {
                return false;
            }
        }
        return true
    }

    getRemovingNumberRange(): any {
        const range: {
            start: number;
            end: number;
        } = {
            start: 0,
            end: 0
        }
        switch (this.difficulty) {
            case 'easy': range.start = 1; range.end = 3; break;
            case 'medium': range.start = 2; range.end = 4; break;
            case 'hard': range.start = 3; range.end = 5; break;
            case 'insane': range.start = 5; range.end = 7; break;
        }
        return range
    }
}


export default Sudoku;
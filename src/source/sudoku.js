/* eslint-disable */
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Sudoku = /** @class */ (function () {
    function Sudoku(difficulty, size) {
        var _this = this;
        this.difficulty = 'easy';
        this.newBoardArray = [];
        this.boardForPlayer = [];
        this.generateEmptyBoard = function (size) {
            var firstRow = _this.generateRandomRow(size);
            _this.newBoardArray = [
                __spreadArrays(firstRow)
            ];
            for (var i = 0; i < size - 1; i++) {
                var row = [];
                for (var j = 0; j < size; j++) {
                    var element = {
                        value: 0,
                        isGenerated: true
                    };
                    row.push(element);
                }
                _this.newBoardArray.push(row);
            }
        };
        this.difficulty = difficulty;
        this.size = size;
        this.generateEmptyBoard(size);
    }
    Sudoku.prototype.sloveSudoku = function (board) {
        var row = {
            value: 0
        };
        var col = {
            value: 0
        };
        if (this.isBoardFull(board, row, col)) {
            return true;
        }
        for (var number = 1; number <= this.size; number++) {
            if (this.isSafe(board, row.value, col.value, number)) {
                board[row.value][col.value].value = number;
                if (this.sloveSudoku(board)) {
                    return true;
                }
                board[row.value][col.value].value = 0;
            }
        }
        return false;
    };
    Sudoku.prototype.isBoardFull = function (board, row, col) {
        for (row.value = 0; row.value < this.size; row.value++) {
            for (col.value = 0; col.value < this.size; col.value++) {
                if (board[row.value][col.value].value === 0)
                    return false;
            }
        }
        return true;
    };
    Sudoku.prototype.isSafe = function (board, row, col, number) {
        return this.checkRow(board[row], number, this.size) &&
            this.checkBox(row - row % 3, col - col % 3, number, board) &&
            this.checkCol(col, number, this.size, board) &&
            board[row][col].value === 0;
    };
    Sudoku.prototype.generateRandomRow = function (size) {
        var randomRow = [];
        var elemCount = 0;
        for (var i = 0; i < size; i++) {
            var element = {
                value: 0,
                isGenerated: true
            };
            randomRow.push(element);
        }
        while (elemCount !== size) {
            var number = Math.floor((Math.random() * size) + 1);
            if (this.checkRow(randomRow, number, size)) {
                randomRow[elemCount].value = number;
                elemCount++;
            }
        }
        return randomRow;
    };
    Sudoku.prototype.generateBoard = function () {
        this.sloveSudoku(this.newBoardArray);
        return this.newBoardArray;
    };
    Sudoku.prototype.generatePlayerBoard = function () {
        var playerBoard = __spreadArrays(this.generateBoard());
        var numberRange = this.getRemovingNumberRange();
        for (var i = 0; i < this.size; i++) {
            this.removeNumbers(numberRange.start, numberRange.end, i, playerBoard);
        }
        return playerBoard;
    };
    Sudoku.prototype.removeNumbers = function (min, max, square, playerBoard) {
        var numberCountToRemove = Math.floor(Math.random() * (max - min + 1) + min);
        var startIndexX = Math.floor(square / 3) * 3;
        var startIndexY = (square % 3) * 3;
        var removedNumbersCount = 0;
        while (removedNumbersCount < numberCountToRemove) {
            var randomIndexX = Math.floor(Math.random() * ((startIndexX) + 3 - startIndexX) + startIndexX);
            var randomIndexY = Math.floor(Math.random() * ((startIndexY) + 3 - startIndexY) + startIndexY);
            if (playerBoard[randomIndexX][randomIndexY].value !== 0) {
                playerBoard[randomIndexX][randomIndexY].value = 0;
                playerBoard[randomIndexX][randomIndexY].isGenerated = false;
                removedNumbersCount++;
            }
        }
    };
    Sudoku.prototype.checkBox = function (startRow, startCol, num, boardArray) {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (num === boardArray[row + startRow][col + startCol].value) {
                    return false;
                }
            }
        }
        return true;
    };
    Sudoku.prototype.checkRow = function (row, num, size) {
        for (var i = 0; i < size; i++) {
            if (row[i].value === num) {
                return false;
            }
        }
        return true;
    };
    Sudoku.prototype.checkCol = function (col, num, size, boardArray) {
        for (var i = 0; i < size; i++) {
            if (boardArray[i][col].value === num) {
                return false;
            }
        }
        return true;
    };
    Sudoku.prototype.getRemovingNumberRange = function () {
        var range = {
            start: 0,
            end: 0
        };
        switch (this.difficulty) {
            case 'easy':
                range.start = 1;
                range.end = 3;
                break;
            case 'medium':
                range.start = 2;
                range.end = 4;
                break;
            case 'hard':
                range.start = 3;
                range.end = 5;
                break;
            case 'insane':
                range.start = 5;
                range.end = 7;
                break;
        }
        return range;
    };
    return Sudoku;
}());
// const board = new Sudoku('easy', 9)
// board.generateRandomRow(9)
// console.log(board.generatePlayerBoard())
// console.log(board.generateBoard())
exports["default"] = Sudoku;

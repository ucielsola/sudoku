import { SudokuBoard } from '$lib/sudokuBoard';

export class SudokuGenerator {
    #board: SudokuBoard;

    constructor() {
        this.#board = new SudokuBoard();
    }

    get board(): SudokuBoard {
        return this.#board;
    }

    // Method to generate a full Sudoku board
    generateFullBoard(): void {
        this.fillBoard(0, 0);
    }

    private fillBoard(row: number, col: number): boolean {
        if (col >= this.#board.size) {
            col = 0;
            row++;
            if (row >= this.#board.size) {
                return true;
            }
        }

        if (this.#board.getValue(row, col) !== 0) {
            return this.fillBoard(row, col + 1);
        }

        const nums = this.shuffle([...Array(this.#board.size).keys()].map(i => i + 1));
        for (let num of nums) {
            if (this.#board.isValid(row, col, num)) {
                this.#board.setValue(row, col, num);
                if (this.fillBoard(row, col + 1)) {
                    return true;
                }
                this.#board.setValue(row, col, 0);
            }
        }
        return false;
    }

    // Method to shuffle an array
    private shuffle(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Method to remove numbers to create the puzzle
    removeNumbers(level: number): void {
        const attempts = 5;
        const emptyCells = Math.floor(this.#board.size * this.#board.size * level);
        let count = 0;

        while (count < emptyCells) {
            const row = Math.floor(Math.random() * this.#board.size);
            const col = Math.floor(Math.random() * this.#board.size);
            if (this.#board.getValue(row, col) !== 0) {
                const backup = this.#board.getValue(row, col);
                this.#board.setValue(row, col, 0);

                const copyBoard = new SudokuBoard();
                for (let r = 0; r < this.#board.size; r++) {
                    for (let c = 0; c < this.#board.size; c++) {
                        copyBoard.setValue(r, c, this.#board.getValue(r, c));
                    }
                }

                let solutions = 0;
                for (let i = 0; i < attempts; i++) {
                    const tempBoard = new SudokuBoard();
                    for (let r = 0; r < copyBoard.size; r++) {
                        for (let c = 0; c < copyBoard.size; c++) {
                            tempBoard.setValue(r, c, copyBoard.getValue(r, c));
                        }
                    }
                    if (tempBoard.solve()) {
                        solutions++;
                    }
                }
                if (solutions !== 1) {
                    this.#board.setValue(row, col, backup);
                } else {
                    count++;
                }
            }
        }
    }
}

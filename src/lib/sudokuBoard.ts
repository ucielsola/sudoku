export class SudokuBoard {
    static defaultSize: number = 9

    #board: number[][];
    #size: number = SudokuBoard.defaultSize
    #anotations: {
        row: number;
        col: number;
        values: number[];
    }[] = [];

    constructor(initialBoard?: number[][]) {
        this.#board = initialBoard ?? Array.from({ length: SudokuBoard.defaultSize }, () => Array(SudokuBoard.defaultSize).fill(0));
    }

    get size() {
        return this.#size;
    }

    get grid() {
        return this.#board;
    }

    get anotations() {
        return this.#anotations;
    }

    setValue(row: number, col: number, value: number): boolean {
        if (value < 1 || value > 9 || row < 0 || row >= this.#size || col < 0 || col >= this.#size) {
            return false;
        }

        this.#board[row][col] = value;

        return true;
    }

    getValue(row: number, col: number): number {
        return this.#board[row][col];
    }

    isValid(row: number, col: number, num: number): boolean {
        const isInRow = () => this.#board[row].includes(num)
        const isInCol = () => this.#board.map(row => row[col]).includes(num)
        const isInBox = () => this.getBox(row, col).includes(num)

        return !isInRow() && !isInCol() && !isInBox();
    }

    private getBox(row: number, col: number): number[] {
        const boxSize = Math.sqrt(this.#size);
        const startRow = boxSize * Math.floor(row / boxSize);
        const startCol = boxSize * Math.floor(col / boxSize);
        const box: number[] = [];

        for (let r = startRow; r < startRow + boxSize; r++) {
            for (let c = startCol; c < startCol + boxSize; c++) {
                box.push(this.#board[r][c]);
            }
        }

        return box;
    }

    solve(): boolean {
        for (let row = 0; row < this.#size; row++) {
            for (let col = 0; col < this.#size; col++) {
                if (this.#board[row][col] === 0) {
                    for (let num = 1; num <= this.#size; num++) {
                        if (this.isValid(row, col, num)) {
                            this.setValue(row, col, num);
                            if (this.solve()) {
                                return true;
                            }
                            this.setValue(row, col, 0);
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}

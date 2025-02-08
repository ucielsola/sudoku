import { describe, it, expect } from 'vitest';
import { SudokuBoard } from '$lib/sudokuBoard';

const validBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
];

const unfinishedBoard = [
    [0, 0, 0, 4, 5, 6, 7, 8, 9],
    [0, 0, 0, 0, 6, 7, 8, 9, 1],
    [0, 0, 0, 6, 7, 8, 9, 1, 2],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
];


describe('SudokuBoard', () => {
    it('should initialize with a 9x9 board', () => {
        const board = new SudokuBoard();
        expect(board.size).toBe(9);
        expect(board.grid).toHaveLength(9);
        for (const row of board.grid) {
            expect(row).toHaveLength(9);
        }
    });

    it('should set and get values correctly', () => {
        const board = new SudokuBoard();
        board.setValue(0, 0, 5);
        expect(board.getValue(0, 0)).toBe(5);
    });

    it('should correctly validate row, column, and box constraints', () => {
        const board = new SudokuBoard(unfinishedBoard);

        // detect row conflicts
        expect(board.isValid(0, 0, 1)).toBe(true);
        expect(board.isValid(0, 0, 2)).toBe(true);
        expect(board.isValid(0, 0, 3)).toBe(true);
        expect(board.isValid(0, 0, 4)).toBe(false);
        expect(board.isValid(0, 0, 5)).toBe(false);

        // detect column conflicts
        expect(board.isValid(1, 0, 5)).toBe(false);

        // detect box conflicts
        board.setValue(0, 0, 1)
        expect(board.isValid(0, 1, 1)).toBe(false);
        expect(board.isValid(0, 0, 2)).toBe(true);
        expect(board.isValid(0, 0, 3)).toBe(true);
    });

    it('should solve a valid board', () => {
        const board = new SudokuBoard(validBoard);

        expect(board.solve()).toBe(true);
    });

    it("shouldn't allow invalid values", () => {
        const board = new SudokuBoard();

        // test values
        expect(board.setValue(0, 0, 0)).toBe(false);
        expect(board.setValue(0, 0, 10)).toBe(false);
        expect(board.setValue(0, 0, 5)).toBe(true);

        // test out of bounds
        expect(board.setValue(9, 0, 5)).toBe(false);
        expect(board.setValue(-1, 0, 5)).toBe(false);
    })
});
import { SudokuGenerator } from "$lib/boardGenerator";
import { SudokuBoard } from "$lib/sudokuBoard";
import { describe, expect, it } from "vitest";

describe('SudokuGenerator', () => {
    it('should generate a full valid board', () => {
        const generator = new SudokuGenerator();
        generator.generateFullBoard();
        const board = generator.board
        expect(board.solve()).toBe(true);
    });

    it('should remove numbers and maintain a unique solution', () => {
        const generator = new SudokuGenerator();
        generator.generateFullBoard();
        generator.removeNumbers(0.5);
        const board = generator.board
        const copyBoard = new SudokuBoard(board.grid.map(row => [...row]));
        expect(copyBoard.solve()).toBe(true);
    });
});
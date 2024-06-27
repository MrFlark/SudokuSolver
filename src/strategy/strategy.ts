// superclass for sudoku solving strategies
import { SudokuBoard } from "../board";

export abstract class Strategy {

    name: string;
    
    abstract apply(board: SudokuBoard): void;

    constructor(name: string) {
        this.name = name;
    }
};

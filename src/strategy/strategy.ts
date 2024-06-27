// superclass for sudoku solving strategies
import { SudokuBoard } from "../board";
import { CellCoordinates } from "../cell";

export abstract class Strategy {

    name: string;
    
    abstract apply(board: SudokuBoard): StrategyApplicationResult;

    constructor(name: string) {
        this.name = name;
    }
};


export type StrategyApplicationResult = {
    candidatesExcluded: number;
    cellsSolved: number;
    solvedCellCoordinates?: CellCoordinates[];
};

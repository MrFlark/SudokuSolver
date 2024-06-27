import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { UniqueCandidateStrategy } from "./uniqueCandidateStrategy";

export class UniqueCandidateInRowStrategy extends UniqueCandidateStrategy {
    
    constructor() {
        super("UniqueCandidateInRow");
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        
        let cellGroups: Cell[][] = [];

        for (let rowIndex = 0; rowIndex < board.HEIGHT; rowIndex++) {
            cellGroups.push(board.getRow(rowIndex));
        }

        return cellGroups;
    }
}

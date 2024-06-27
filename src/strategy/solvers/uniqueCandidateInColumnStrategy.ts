import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { UniqueCandidateStrategy } from "./uniqueCandidateStrategy";

export class UniqueCandidateInColumnStrategy extends UniqueCandidateStrategy {
    
    constructor() {
        super("UniqueCandidateInColumn");
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        
        let cellGroups: Cell[][] = [];

        for (let columnIndex = 0; columnIndex < board.WIDTH; columnIndex++) {
            cellGroups.push(board.getColumn(columnIndex));
        }

        return cellGroups;
    }
}

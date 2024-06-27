import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { UniqueCandidateStrategy } from "./uniqueCandidateStrategy";

export class UniqueCandidateInSquareStrategy extends UniqueCandidateStrategy {
    
    constructor() {
        super("UniqueCandidateInSquare");
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        let cellGroups: Cell[][] = [];

        board.getSquares().forEach((square: Cell[][]) => {
            cellGroups.push(square.flat());
        });

        return cellGroups;
    }
}

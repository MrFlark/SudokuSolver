import { SudokuBoard } from "../../board";
import { Strategy, StrategyApplicationResult } from "../strategy";

// solves cells where only one candidate is left across the board
export class SingleCandidateStrategy extends Strategy {

    constructor() {
        super("SingleCandidate");
    }

    apply(board: SudokuBoard): StrategyApplicationResult {

        let cellsSolved = 0;

        board.getCells().forEach(cell => {
            if (!cell.isSolved() && cell.candidates.length === 1) {
                cell.value = cell.candidates[0];
                cellsSolved++;
            }
        });

        return {
            candidatesExcluded: 0, // no candidates are excluded by this strategy
            cellsSolved
        };
    }
}

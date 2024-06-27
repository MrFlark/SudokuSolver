import { SudokuBoard } from "../../board";
import { Strategy, StrategyApplicationResult } from "../strategy";
import { CellCoordinates } from "../../cell";

// solves cells where only one candidate is left across the board
export class SingleCandidateStrategy extends Strategy {

    constructor() {
        super("SingleCandidate");
    }

    apply(board: SudokuBoard): StrategyApplicationResult {

        let cellsSolved = 0;
        let solvedCellCoordinates: CellCoordinates[] = [];

        for (let cell of board.getCells()) {
            if (!cell.isSolved() && cell.candidates.length === 1) {
                cell.value = cell.candidates[0];
                cellsSolved++;

                solvedCellCoordinates.push(cell.coordinates);

                // only solve 1 cell at a time

                // TODO: might be able to optimize this so that it can solve
                // multiple cells in one pass
                break;
            }
        }

        return {
            candidatesExcluded: 0, // no candidates are excluded by this strategy
            cellsSolved,
            solvedCellCoordinates
        };
    }
}

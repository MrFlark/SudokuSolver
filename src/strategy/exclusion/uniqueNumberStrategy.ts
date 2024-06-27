import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { Strategy, StrategyApplicationResult } from "../strategy";

export abstract class UniqueNumberStrategy extends Strategy {

    abstract getCellGroups(board: SudokuBoard): Cell[][];

    apply(board: SudokuBoard): StrategyApplicationResult {

        let candidatesExcluded = 0;

        // get all cell values in each group
        // remove solved values from candidate list of other cells in that group        
        let cellGroups = this.getCellGroups(board);

        cellGroups.forEach(cells => {
            const candidatesToExclude = cells.filter(cell => cell.isSolved())
                .map(cell => cell.value);

            // cannot apply strategy to empty cell groups
            if (candidatesToExclude.length !== 0) {
                cells.forEach(cell => {
                    if (!cell.isSolved()) {

                        let prevCandidateListLength = cell.candidates.length;

                        cell.candidates = cell.candidates
                            .filter(candidate => !candidatesToExclude.includes(candidate));

                        candidatesExcluded += prevCandidateListLength - cell.candidates.length;
                    }
                });
            }
        });

        return {
            candidatesExcluded,
            cellsSolved: 0 // no cells are solved by this strategy
        };
    }
}

import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { Strategy, StrategyApplicationResult } from "../strategy";

// solves cells where only one instance of a candidate exists within a cell group
export abstract class UniqueCandidateStrategy extends Strategy {

    abstract getCellGroups(board: SudokuBoard): Cell[][];

    apply(board: SudokuBoard): StrategyApplicationResult {

        let cellsSolved = 0;

        this.getCellGroups(board).forEach(cellGroup => {
            
            // find single-instance candidates within the cell group
            // iterate over possible candidate values
            for (let candidateValue = 1; candidateValue <= board.WIDTH; candidateValue++) {

                // try to find >1 instances of the candidate value within the cell group
                let cellsWithCandidate = cellGroup.filter(cell => !cell.isSolved() && cell.candidates.includes(candidateValue));
                if (cellsWithCandidate.length === 1) {
                    
                    // if only one instance of the candidate value exists within
                    // the cell group, solve that cell.
                    cellsWithCandidate[0].value = candidateValue;
                    cellsSolved++;
                }
            }
        });

        return {
            candidatesExcluded: 0, // no candidates are excluded by this strategy
            cellsSolved
        };
    }
}

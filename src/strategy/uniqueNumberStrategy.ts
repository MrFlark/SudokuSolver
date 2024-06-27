import { SudokuBoard } from "../board";
import { Cell } from "../cell";
import { Strategy } from "./strategy";

export abstract class UniqueNumberStrategy extends Strategy {

    abstract getCellGroups(board: SudokuBoard): Cell[][];

    apply(board: SudokuBoard): void {
        // get all cell values in each group
        // remove solved values from candidate list of other cells in that group        
        let cellGroups = this.getCellGroups(board);

        cellGroups.forEach(cells => {
            const candidatesToExclude = cells.filter(cell => cell.isSolved())
                .map(cell => cell.value);

            // cannot apply strategy to empty column
            if (candidatesToExclude.length !== 0) {
                cells.forEach(cell => {
                    if (!cell.isSolved()) {
                        cell.candidates = cell.candidates
                            .filter(candidate => candidatesToExclude.indexOf(candidate) === -1);
                    }
                });
            }
        });
    }
}

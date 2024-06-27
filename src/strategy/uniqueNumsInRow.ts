import { SudokuBoard } from "../board";
import { Strategy } from "./strategy";

// eliminates cell value candidates in row where a cell has a value
export class UniqueNumsInRowStrategy extends Strategy {
    constructor() {
        super('UniqueNumsInRow');
    }
    
    apply(board: SudokuBoard): void {
        // get all cell values in row
        // remove solved values from other cells in row

        for (let rowIndex = 0; rowIndex < board.HEIGHT; rowIndex++) {
            const row = board.getRow(rowIndex);
            const candidatesToExclude = row.filter(cell => cell.isSolved())
                                              .map(cell => cell.value);

            if (candidatesToExclude.length === 0) {
                // cannot apply strategy to empty row
                continue;
            }

            row.forEach(cell => {
                if (!cell.isSolved()) {
                    cell.candidates = cell.candidates
                        .filter(candidate => candidatesToExclude.indexOf(candidate) === -1);
                }
            });
        }
    }
}

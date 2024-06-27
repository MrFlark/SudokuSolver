import { SudokuBoard } from "../board";
import { Strategy } from "./strategy";

// eliminates cell value candidates in column where a cell has a value
export class UniqueNumsInColumnStrategy extends Strategy {
    constructor() {
        super('UniqueNumsInColumn');
    }
    
    apply(board: SudokuBoard): void {
        // get all cell values in column
        // remove solved values from other cells in column

        for (let columnIndex = 0; columnIndex < board.WIDTH; columnIndex++) {
            const column = board.getColumn(columnIndex);
            const candidatesToExclude = column.filter(cell => cell.isSolved())
                                              .map(cell => cell.value);

            if (candidatesToExclude.length === 0) {
                // cannot apply strategy to empty column
                continue;
            }

            column.forEach(cell => {
                if (!cell.isSolved()) {
                    cell.candidates = cell.candidates
                        .filter(candidate => candidatesToExclude.indexOf(candidate) === -1);
                }
            });
        }
    }
}

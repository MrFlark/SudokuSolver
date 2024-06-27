import { SudokuBoard } from "../board";
import { Cell } from "../cell";
import { Strategy } from "./strategy";

// eliminates cell value candidates in a square where a cell has a value
export class UniqueNumsInSquareStrategy extends Strategy {
    constructor() {
        super('UniqueNumsInSquare');
    }
    
    apply(board: SudokuBoard): void {

        // get all cell values in square
        // remove solved values from other cells in square

        board.getSquares().forEach((square: Cell[][], squareIndex: number) => {
            const candidatesToExclude = square.flat()
                                              .filter(cell => cell.isSolved())
                                              .map(cell => cell.value);

            if (candidatesToExclude.length === 0) {
                // cannot apply strategy to empty square
                return;
            }

            square.flat().forEach(cell => {
                if (!cell.isSolved()) {
                    cell.candidates = cell.candidates
                        .filter(candidate => candidatesToExclude.indexOf(candidate) === -1);
                }
            });
        });
    }
}

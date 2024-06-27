import { SudokuBoard } from "../board";
import { Cell } from "../cell";
import { UniqueNumberStrategy } from "./uniqueNumberStrategy";

// eliminates cell value candidates in a square where a cell has a value
export class UniqueNumsInSquareStrategy extends UniqueNumberStrategy {
    constructor() {
        super('UniqueNumsInSquare');
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        let cellGroups: Cell[][] = [];

        board.getSquares().forEach((square: Cell[][]) => {
            cellGroups.push(square.flat());
        });

        return cellGroups;
    }
}

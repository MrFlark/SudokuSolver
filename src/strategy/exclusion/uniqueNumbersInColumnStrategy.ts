import { SudokuBoard } from "../../board";
import { Cell } from "../../cell";
import { UniqueNumberStrategy } from "./uniqueNumberStrategy";

// eliminates cell value candidates in column where a cell has a value
export class UniqueNumsInColumnStrategy extends UniqueNumberStrategy {
    constructor() {
        super('UniqueNumsInColumn');
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        
        let cellGroups: Cell[][] = [];

        for (let columnIndex = 0; columnIndex < board.WIDTH; columnIndex++) {
            cellGroups.push(board.getColumn(columnIndex));
        }

        return cellGroups;
    }
}

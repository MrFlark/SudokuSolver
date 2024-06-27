import { SudokuBoard } from "../board";
import { Cell } from "../cell";
import { UniqueNumberStrategy } from "./uniqueNumberStrategy";

// eliminates cell value candidates in row where a cell has a value
export class UniqueNumsInRowStrategy extends UniqueNumberStrategy {
    constructor() {
        super('UniqueNumsInRow');
    }

    getCellGroups(board: SudokuBoard): Cell[][] {
        let cellGroups: Cell[][] = [];

        for (let rowIndex = 0; rowIndex < board.HEIGHT; rowIndex++) {
            cellGroups.push(board.getRow(rowIndex));
        }

        return cellGroups;
    }
}

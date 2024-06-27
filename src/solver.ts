import { SudokuBoard } from "./board";
import {
    UniqueNumsInColumnStrategy,
    UniqueNumsInRowStrategy,
    UniqueNumsInSquareStrategy
} from "./strategy";

const strategies = [
    new UniqueNumsInColumnStrategy(),
    new UniqueNumsInRowStrategy(),
    new UniqueNumsInSquareStrategy()
];

const sudokuBoard = new SudokuBoard();

sudokuBoard.load("testData/regular/easy.txt");

console.log("== input board ==");
sudokuBoard.print();

strategies.forEach(strategy => {
    strategy.apply(sudokuBoard);
    sudokuBoard.print();
});

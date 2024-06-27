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

export function solve (board: SudokuBoard): void {
    
    console.log("== input board ==");
    board.print();
    
    strategies.forEach(strategy => {
        console.log("applying strategy: " + strategy.name);
        let numCandidatesExcluded = strategy.apply(board);
        console.log("candidates excluded: " + numCandidatesExcluded);
        
        board.print();
    });
}

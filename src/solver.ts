import { SudokuBoard } from "./board";
import {
    SingleCandidateStrategy,
    UniqueCandidateInColumnStrategy,
    UniqueCandidateInRowStrategy,
    UniqueNumsInColumnStrategy,
    UniqueNumsInRowStrategy,
    UniqueNumsInSquareStrategy
} from "./strategy";

const strategies = [
    new UniqueNumsInColumnStrategy(),
    new UniqueNumsInRowStrategy(),
    new UniqueNumsInSquareStrategy(),
    new SingleCandidateStrategy(),
    new UniqueCandidateInColumnStrategy(),
    new UniqueCandidateInRowStrategy(),
    new UniqueNumsInSquareStrategy()
];

export function solve (board: SudokuBoard): void {

    let round = 0;
    
    console.log("== input board ==");
    board.print();

    let halted = false;
    // main "solving round" loop
    // tracks number of candidates excluded after applying all strategies
    // if the number is zero, the program halts - either the board is solved
    // or we are stuck.
    while(!halted) {

        round++;

        console.log("\n\nstarting solver round " + round);

        let numCandidatesExcludedThisRound = 0;
        let numCellsSolvedThisRound = 0;


        strategies.forEach(strategy => {
            console.log("applying strategy: " + strategy.name);

            let result = strategy.apply(board);

            console.log("candidates excluded by this strategy: " + result.candidatesExcluded);
            console.log("cells solved by this strategy: " + result.cellsSolved);

            numCandidatesExcludedThisRound += result.candidatesExcluded;
            numCellsSolvedThisRound += result.cellsSolved;
    
            console.log("board state:");
            board.print();

        });

        console.log("candidates excluded this round: " + numCandidatesExcludedThisRound);
        console.log("cells solved this round: " + numCellsSolvedThisRound);

        if (numCandidatesExcludedThisRound === 0 && numCellsSolvedThisRound === 0) {
            halted = true;
        }

    }

    console.log("program halted after " + round + " solving round(s). final board state:");
    board.print();
    
}

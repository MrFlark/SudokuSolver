import { SudokuBoard } from "./board";
import {
    SingleCandidateStrategy,
    UniqueCandidateInColumnStrategy,
    UniqueCandidateInRowStrategy,
    UniqueCandidateInSquareStrategy,
    UniqueNumsInColumnStrategy,
    UniqueNumsInRowStrategy,
    UniqueNumsInSquareStrategy
} from "./strategy";
import { sleep } from "./util/sleep";

const strategies = [
    // candidate exclusion strategies
    new UniqueNumsInColumnStrategy(),
    new UniqueNumsInRowStrategy(),
    new UniqueNumsInSquareStrategy(),

    // cell solving strategies
    new SingleCandidateStrategy(),
    new UniqueCandidateInColumnStrategy(),
    new UniqueCandidateInRowStrategy(),
    new UniqueNumsInSquareStrategy(),
    new UniqueCandidateInSquareStrategy()
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

        // clear terminal
        console.clear();

        round++;

        console.log("\n\nstarting solver round " + round);

        let numCandidatesExcludedThisRound = 0;
        let numCellsSolvedThisRound = 0;

        for (let strategy of strategies) {

            let result = strategy.apply(board);

            console.log(`applied strategy "${strategy.name}" => result { excluded: ${result.candidatesExcluded}, solved: ${result.cellsSolved} }`);

            numCandidatesExcludedThisRound += result.candidatesExcluded;
            numCellsSolvedThisRound += result.cellsSolved;

            if (result.cellsSolved > 0) {

                board.print(result.solvedCellCoordinates);

                sleep(500);

                // only solve 1 cell per round
                break;
            }

        };

        console.log("candidates excluded this round: " + numCandidatesExcludedThisRound);
        console.log("cells solved this round: " + numCellsSolvedThisRound);

        if (numCandidatesExcludedThisRound === 0 && numCellsSolvedThisRound === 0) {
            halted = true;
        }

        if (board.isSolved()) {
            console.log("board is solved!");
            halted = true;    
        }
    }

    console.log("program halted after " + round + " solving round(s). final board state:");
    board.print();
    
}

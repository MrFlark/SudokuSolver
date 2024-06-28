import { SudokuBoard } from "./board";
import { solve } from "./solver";

const board = new SudokuBoard();

board.load("testData/regular/medium.txt");

// call solver
solve(board);

// check solved

// board.print();

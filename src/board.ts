import { Cell, CellCoordinates } from "./cell";
import { Cage } from "./cage";
import fs from "fs";


type Board = Cell[][];
type Cages = Cage[];


export class SudokuBoard {
    private board: Board;
    
    public readonly WIDTH = 9;
    public readonly HEIGHT = 9;
    public readonly NUM_SQUARES = 9;

    load(fileName: string): void {

        try {
            const data = fs.readFileSync(fileName, 'utf-8');
            const lines = data.trim().split(/\r?\n/);
            const EMPTY_VALUE = '.';
            const board: Cell[][] = [];
            for (let lineIndex = 0; lineIndex < this.WIDTH; lineIndex++) {
                const row: Cell[] = [];
                for (let charIndex = 0; charIndex < this.HEIGHT; charIndex++) {
                    const char = lines[lineIndex][charIndex];
                    const value = char === EMPTY_VALUE ? undefined : parseInt(char, 10);

                    let c = new Cell(value);
                    c.coordinates = { x: charIndex, y: lineIndex };
                    c.given = value !== undefined;

                    row.push(c);
                }
                board.push(row);
            }
            this.board = board;

            // TODO parse cage info
        } catch(error) {
            console.error(error);
        }
    }

    getColumn(columnIndex: number): Cell[] {
        return this.board.map(row => row[columnIndex]);
    }

    getRow(rowIndex: number): Cell[] {
        return this.board[rowIndex];
    }

    getSquares(): Map<number, Cell[][]> {

        let squares: Map<number, Cell[][]> = new Map();
        
        for(let squareIndex = 0; squareIndex < this.NUM_SQUARES; squareIndex++) {
            squares.set(squareIndex, this.getSquare(squareIndex));
        }

        return squares;
    }

    getSquare(squareIndex: number): Cell[][] {
        let cells: Cell[][] = [
            [],
            [],
            []
        ];

        // TODO: variable size squares
        const squareWidth = 3;
        const squareHeight = 3;

        let rowOffset = Math.floor(squareIndex / squareWidth) * squareHeight;
        for (let rowIndex = rowOffset; rowIndex < rowOffset + squareHeight; rowIndex += 1) {
            let colOffset = (squareIndex % squareWidth) * squareWidth;

            for (let colIndex = colOffset; colIndex < colOffset + squareWidth; colIndex +=1) {

                cells[rowIndex - rowOffset].push(this.board[rowIndex][colIndex]);

            }

        }

        return cells;
    }

    getCell(rowIndex: number, columnIndex: number): Cell {
        return this.board[rowIndex][columnIndex];
    }

    getCells(): Cell[] {
        return this.board.flat();
    }

    isSolved(): boolean {
        return this.getCells().every(cell => cell.isSolved());
    }

    // TODO: cages, variable width spacing
    print(cellsToHighlight?: CellCoordinates[]): void {
        /**
         * https://www.w3.org/TR/xml-entity-names/025.html
         */
        const horizontal_border = "─";
        const top_right_corner_border = "┐";
        const top_left_corner_border = "┌";
        const vertical_border = "│";
        const bottom_right_corner_border = "┘";
        const bottom_left_corner_border = "└";
        const cross_border = "┼";
        const top_border = "┬";
        const bottom_border = "┴";
        const left_border = "├";
        const right_border = "┤";
        const cage_vertical_border = "┋";
        const cage_horizontal_border = "┅";
        /*
        ┌───────────────┬
        │┌┅┅┅┅┅┅┅20┌┅┅┅3│
        │┋ 1    2 ┋┋ 3 ┋│
        │┋   ┌┅┅┅┅┘└┅┅┅┘│
        │┋   ┋     ┌┅┅┅6│
        │┋ 4 ┋     ┋ 6 ┋│
        │└┅┅┅┘     └┅┅┅┘│
        │     ┌┅┅┅8     │
        │     ┋ 8 ┋  9  │
        │     └┅┅┅┘     │
        ├───────────────┼
        
        */

        const square_width = 23;
        const square_height = 12;

        let printRows = 3 * square_height + 1;

        let rowIndex = 0;

        for (let printRow = 0; printRow < printRows; printRow++) {

            let mod = printRow % square_height;

            let printStr = "";

            // top border case
            if (printRow === 0) {

                // top left square - top border
                printStr +=
                    top_left_corner_border + // ┌
                    horizontal_border.repeat(square_width - 2) + // ─────
                    top_border; // ┬

                // top middle square - top border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    top_border; // ┬

                // top right square - top border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    top_right_corner_border; // ┐

            }

            // bottom border case
            else if (printRow === printRows - 1) {

                // bottom left square - bottom border
                printStr +=
                    bottom_left_corner_border + // └
                    horizontal_border.repeat(square_width - 2) + // ─────
                    bottom_border; // ┴

                // bottom middle square - bottom border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    bottom_border; // ┴

                // bottom right square - bottom border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    bottom_right_corner_border; // ┘

            }

            // mid square border case
            else if (mod === 0) {

                // middle left square - left border
                printStr +=
                    left_border + // ├
                    horizontal_border.repeat(square_width - 2) + // ─────
                    cross_border; // ┼

                // middle middle square - middle border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    cross_border; // ┼

                // middle right square - right border
                printStr +=
                    horizontal_border.repeat(square_width - 2) + // ─────
                    right_border; // ┤
            }

            // spacer row (between numbers and borders)
            else if([1, 2, 4, 5, 7, 8, 10, 11].includes(mod)){

                printStr += (
                    vertical_border + // │
                    " ".repeat(square_width - 2)
                ).repeat(3)
                + vertical_border; // │

            }

            // number row
            else if(mod === 3 || mod === 6 || mod === 9) {

                // TODO: variable width spacing
                let number_spaces = "   ";

                printStr += vertical_border; // │

                for (let colIndex = 0; colIndex < this.WIDTH; colIndex++) {

                    let cell = this.board[rowIndex][colIndex];
                    let cell_value = cell.value || "?";
                    let hasColor = false;

                    // check if cell should be highlighted
                    for (let coordinates of cellsToHighlight || []) {
                        if (coordinates.x === colIndex && coordinates.y === rowIndex) {
                            cell_value = "\x1b[31m" + cell_value + "\x1b[0m";
                            hasColor = true;
                        }
                    }

                    // color solved cells blue
                    if (!cell.given && cell.isSolved() && !hasColor) {
                        cell_value = "\x1b[34m" + cell_value + "\x1b[0m";
                        hasColor = true;
                    }

                    // color unknown cells yellow
                    if (!cell.given && !cell.isSolved() && !hasColor) {
                        cell_value = "\x1b[33m" + cell_value + "\x1b[0m";
                        hasColor = true;
                    }

                    // color given cells black
                    if (cell.given && !hasColor) {
                        cell_value = "\x1b[30m" + cell_value + "\x1b[0m";
                        hasColor = true;
                    }

                    printStr +=
                        number_spaces +
                        cell_value +
                        number_spaces;

                    if (colIndex % 3 === 2) {
                        printStr += vertical_border; // │
                    }
                }

                rowIndex++;
            }
            console.log(printStr);
        }
    }
}

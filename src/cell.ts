

export class Cell {

    public value: number | undefined;
    public candidates: number[];

    constructor(value: number | undefined = undefined) {
        this.value = value;
        this.candidates = [1,2,3,4,5,6,7,8,9];
    }

    isSolved() {
        return this.value !== undefined;
    }
}

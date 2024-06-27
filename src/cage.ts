import { Coordinate } from "./coordinate";


export class Cage {
    public sum: number;
    public members: Coordinate[];

    constructor(sum: number, members: Coordinate[]) {
        this.sum = sum;
        this.members = members;
    }
}

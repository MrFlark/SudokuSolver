// bad
export function sleep(time: number) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}

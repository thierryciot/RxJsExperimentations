export class Item {
    id: number;
    emitter: string;
    title: string;
    readonly time: Date;

    constructor() {
        this.time = new Date();
    }
}

class Carbon {
    protected _date: Date;
    constructor(input: any) {
        this._date = new Date(input);
    }
    public static parse(input: any) {
        return new Carbon(input);
    }
    public static now() {
        return Carbon.parse(new Date())
    }
}
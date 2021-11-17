class Bonus {
    constructor() {
        this._points = 1;
    }

    set points(newPoints) {
        if(newPoints !== this._points) {
            this.onPointsChange(newPoints, this._points);
            this._points = newPoints;
        }
    }

    get points() {
        return this._points;
    }

    onPointsChange(newPoints, oldPoints) {}
}
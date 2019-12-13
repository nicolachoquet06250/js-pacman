class Drawable {
    context = null;
    /**
     * @type {Position|null}
     * @private
     */
    _position = null;

    constructor(context) {
        this.context = context;
    }

    /**
     * @param {Position} newPosition
     */
    set position(newPosition) {
        if(this._position.getX() !== newPosition.getX() || this._position.getY() !== newPosition.getY()) {
            this.onPositionChange(newPosition, this._position);
            this._position = newPosition
        }
    }

    get position() {
        return this._position;
    }

    onPositionChange(newPosition, oldPosition) {}

    draw() {}
}
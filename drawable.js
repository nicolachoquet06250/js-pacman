class Drawable {
    constructor() {
        /**
         * @type {Position|null}
         * @private
         */
        this._position = null;
    }

    contextIs(context) {
        this.context = context;
        return this;
    }

    /**
     * @param {Position} newPosition
     */
    set position(newPosition) {
        if(this._position === null || (this._position.getX() !== newPosition.getX() || this._position.getY() !== newPosition.getY())) {
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
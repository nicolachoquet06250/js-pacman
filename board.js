class Board extends Drawable {
    /**
     * @param context
     * @param {{level1: Array<Array>, level2: Array<Array<number>>, level3: Array<Array<number>>}} maps
     */
    constructor(maps) {
        super();
        this._level = 0;
        this.maps = maps;
        this.map = [];
        this.time = {};
        this.reset();
    }

    set level(level) {
        let _level = this._level;
        this._level = level;
        if(_level !== this._level) {
            this.onLevelChange(level, this._level);
        }
    }

    get level() {
        return this._level;
    }

    selectGrid() {
        this.map = this.maps[`level${this.level}`];
    }

    timeIs(time) {
        this.time = time;
        return this;
    }

    onLevelChange(newLevel) {
        this.selectGrid();
        for(let level of document.querySelectorAll('.level-label')) {
            level.innerHTML = newLevel;
        }
    }

    reset() {
        this.level = 1;
    }
}

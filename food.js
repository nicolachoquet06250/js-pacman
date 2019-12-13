class Food extends multi.inherit(Bonus, Drawable) {
    points = 2;

    draw() {
        console.log(`food at the ${this.position.getX()}:${this.position.getY()} position !`)
    }
}
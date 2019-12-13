class Pacman extends Character {
    draw() {
        console.log(`Pacman at the ${this.position.getX()}:${this.position.getY()} position !`)
    }

    onPositionChange(newPosition, oldPosition) {
        console.log(`Pacman change its position from ${oldPosition.getX()}:${oldPosition.getY()} to ${newPosition.getX()}:${newPosition.getY()} position !`)
    }
}
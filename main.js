let game = new Game();
game.accountIs(new Pacman('Nico06'));
game.board.timeIs(game.time);
game.account.draw();

game.initPlayButtonEvent();
// game.initPauseButtonEvent();
class Pacman extends Character {

    constructor(pseudo) {
        super(pseudo);
        this._score = 0;
    }

    set score(score) {
        let _score = this._score;
        this._score = score;
        if(score !== _score) {
            this.onScoreChange(score, this._score);
        }
    }

    get score() {
        return this._score;
    }

    onScoreChange(newScore, oldScore) {
        for(let score of document.querySelectorAll('.score')) {
            score.innerHTML = newScore;
        }
    }

    draw() {
        function rectArrondi(ctx, x, y, w, hauteur, rayon) {
            ctx.beginPath();
            ctx.moveTo(x, y + rayon);
            ctx.lineTo(x, y + hauteur - rayon);
            ctx.quadraticCurveTo(x, y + hauteur, x + rayon, y + hauteur);
            ctx.lineTo(x + w - rayon, y + hauteur);
            ctx.quadraticCurveTo(x + w, y + hauteur, x + w, y + hauteur - rayon);
            ctx.lineTo(x + w, y + rayon);
            ctx.quadraticCurveTo(x + w, y, x + w - rayon, y);
            ctx.lineTo(x + rayon,y);
            ctx.quadraticCurveTo(x, y, x, y + rayon);
            ctx.stroke();
        }
        function dessiner_obstacle_vide(ctx, x, y, w, h) {
            rectArrondi(ctx, x, y, w, h, (h >= 30 ? 10 : (h - 10)));
        }
        function dessiner_pacman(ctx, x, y, opened = true) {
            ctx.beginPath();
            let startAngle = opened ? Math.PI / 5 : Math.PI;
            let endAngle = opened ? -Math.PI / 5 : -Math.PI;
            ctx.arc(x, y - 6, 12, startAngle, endAngle, false);
            ctx.lineTo(x - 4, y - 5);
            ctx.fill();
        }
        function dessiner_nouriture(ctx, x, y) {
            ctx.fillRect(x, y, 4, 4);
        }
        function dessiner_fantome(ctx, x, y, color = 'black') {
            function dessiner_contours(ctx, color) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(83, 116);
                ctx.lineTo(83, 102);
                ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
                ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
                ctx.lineTo(111, 116);
                ctx.lineTo(106.333, 111.333);
                ctx.lineTo(101.666, 116);
                ctx.lineTo(97, 111.333);
                ctx.lineTo(92.333, 116);
                ctx.lineTo(87.666, 111.333);
                ctx.lineTo(83, 116);
                ctx.fill();
            }
            function dessiner_yeux(ctx) {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.moveTo(91, 96);
                ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
                ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
                ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
                ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
                ctx.moveTo(103, 96);
                ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
                ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
                ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
                ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
                ctx.fill();
            }
            function dessiner_yeux_cercle_noir(ctx, cote) {
                switch (cote) {
                    case 'left':
                        ctx.beginPath();
                        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        break;
                    case 'right':
                        ctx.fillStyle = "black";
                        ctx.beginPath();
                        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        break;
                    default:
                        break;
                }
            }

            dessiner_contours(ctx, color);
            dessiner_yeux(ctx);
            dessiner_yeux_cercle_noir(ctx, 'right');
            dessiner_yeux_cercle_noir(ctx, 'left');
        }
        function dessiner() {
            let canvas = document.querySelector('#board');
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');

                dessiner_obstacle_vide(ctx, 53, 53, 49, 33);
                dessiner_obstacle_vide(ctx, 135, 53, 49, 33);
                dessiner_obstacle_vide(ctx, 53, 110, 49, 16);
                dessiner_obstacle_vide(ctx, 135, 110, 49, 16);

                dessiner_pacman(ctx, 20, 20, true);

                // horizontals
                for(let i = 0; i < 18; i++) {
                    dessiner_nouriture(ctx, 10 + i * 16, 12);
                    dessiner_nouriture(ctx, 10 + i * 16, 99);
                }

                // verticals
                for(let i = 0; i < 8; i++) {
                    dessiner_nouriture(ctx, 122, 27 + i * 16);
                    dessiner_nouriture(ctx, 26, 27 + i * 16);
                }

                // Fantome
                dessiner_fantome(ctx, 83, 83);
            }
        }
        dessiner();
    }

    onPositionChange(newPosition, oldPosition) {
        if(oldPosition !== null) {
            console.log(`Pacman change its position from ${oldPosition.getX()}:${oldPosition.getY()} to ${newPosition.getX()}:${newPosition.getY()} position !`)
        } else {
            console.log(`Pacman position was init to ${newPosition.getX()}:${newPosition.getY()} !`)
        }
    }
}
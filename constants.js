const PACMAN = 0;
const MUR = 1;
const HERBE = 2;
const FOOD = 3;
const GHOSTS = [4, 5, 6, 7];

const MAPS = {
    level1: [
        [PACMAN, MUR,  GHOSTS[0], GHOSTS[1],  HERBE, MUR,  FOOD, MUR,  FOOD, MUR],
        [FOOD,   MUR,  GHOSTS[3], GHOSTS[2],  HERBE, MUR,  FOOD, MUR,  FOOD, MUR],
        [FOOD,   MUR,  MUR,       MUR,        HERBE, MUR,  FOOD, MUR,  FOOD, MUR],
        [FOOD,   FOOD, FOOD,      FOOD,       FOOD,  FOOD, FOOD, FOOD, FOOD, FOOD],
        [MUR,    MUR,  FOOD,      MUR,        FOOD,  FOOD, FOOD, FOOD, FOOD, FOOD],
        [FOOD,   FOOD, FOOD,      MUR,        MUR,   MUR,  MUR,  FOOD, FOOD, FOOD],
        [MUR,    MUR,  MUR,       MUR,        FOOD,  FOOD, MUR,  FOOD, FOOD, FOOD],
        [MUR,    MUR,  MUR,       MUR,        FOOD,  FOOD, FOOD, FOOD, FOOD, FOOD],
        [MUR,    MUR,  MUR,       MUR,        MUR,   MUR,  MUR,  FOOD, FOOD, FOOD],
        [MUR,    MUR,  MUR,       MUR,        MUR,   MUR,  MUR,  FOOD, FOOD, FOOD]
    ],
    level2: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
    ],
    level3: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
    ],
};
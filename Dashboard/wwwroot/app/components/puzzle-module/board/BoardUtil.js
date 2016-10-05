"use strict";
var TileInfo_1 = require('../../../domain/TileInfo');
var BoardUtil = (function () {
    function BoardUtil() {
    }
    BoardUtil.isPuzzleSolved = function (tiles) {
        for (var i = 0; i < tiles.length - 1; i++) {
            if ((i + 1).toString() !== tiles[i].tileNumber)
                return false;
        }
        return true;
    };
    BoardUtil.scramble = function (tiles) {
        var count = 0;
        while (count <= this.max_iterations) {
            var num1 = this.getRandomIntInclusive(0, 15);
            var num2 = this.getRandomIntInclusive(0, 15);
            if (num1 === num2)
                continue;
            var ti1 = tiles[num1];
            var ti2 = tiles[num2];
            var tempTile = new TileInfo_1.TileInfo();
            tempTile.backColor = ti1.backColor;
            tempTile.tileNumber = ti1.tileNumber;
            ti1.backColor = ti2.backColor;
            ti1.tileNumber = ti2.tileNumber;
            ti2.backColor = tempTile.backColor;
            ti2.tileNumber = tempTile.tileNumber;
            count++;
        }
    };
    // Jhonson & Story (1879) Algorithm to verify if puzzle is solvable
    BoardUtil.isPuzzleSolvable = function (tiles, emptyTile) {
        var inversions = 0;
        var columnsCount = 4;
        var row = 0;
        var emptyTileRow = 0;
        for (var i = 0; i < tiles.length; i++) {
            // Advance to next row
            if (i % columnsCount === 0)
                row++;
            // The blank tile
            if (tiles[i].tileNumber === '') {
                emptyTileRow = row;
                continue;
            }
            // Count inversions
            for (var j = i + 1; j < tiles.length; j++) {
                if (tiles[j].tileNumber !== '' && tiles[i] > tiles[j]) {
                    inversions++;
                }
            }
        }
        // Blank on odd row, counting from bottom
        if (emptyTileRow % 2 === 0) {
            return inversions % 2 === 0;
        }
        else {
            // blank on even row, counting from bottom
            return inversions % 2 !== 0;
        }
    };
    BoardUtil.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    BoardUtil.max_iterations = 25;
    return BoardUtil;
}());
exports.BoardUtil = BoardUtil;
//# sourceMappingURL=BoardUtil.js.map
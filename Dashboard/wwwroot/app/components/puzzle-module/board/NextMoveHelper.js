"use strict";
var NextMoveHelper = (function () {
    function NextMoveHelper(tiles) {
        this.tiles = tiles;
    }
    NextMoveHelper.prototype.getRowIndex = function (ti) {
        var index = this.tiles.indexOf(ti);
        if (index >= 0 && index <= 3)
            return 0;
        if (index >= 4 && index <= 7)
            return 1;
        if (index >= 8 && index <= 11)
            return 2;
        if (index >= 12 && index <= 15)
            return 3;
        return 0;
    };
    NextMoveHelper.prototype.getColumnIndex = function (ti) {
        var index = this.tiles.indexOf(ti);
        if (index === 0 || index === 4 || index === 8 || index === 12)
            return 0;
        if (index === 1 || index === 5 || index === 9 || index === 13)
            return 1;
        if (index === 2 || index === 6 || index === 10 || index === 14)
            return 2;
        if (index === 3 || index === 7 || index === 11 || index === 15)
            return 3;
        return 0;
    };
    NextMoveHelper.prototype.canSlideRight = function (ti, empty) {
        var colIndex = this.getColumnIndex(ti);
        var rowIndex = this.getRowIndex(ti);
        var emptyColIndex = this.getColumnIndex(empty);
        var emptyRowIndex = this.getRowIndex(empty);
        if (rowIndex === emptyRowIndex && colIndex + 1 === emptyColIndex)
            return true;
        return false;
    };
    NextMoveHelper.prototype.canSlideLeft = function (ti, empty) {
        var colIndex = this.getColumnIndex(ti);
        var rowIndex = this.getRowIndex(ti);
        var emptyColIndex = this.getColumnIndex(empty);
        var emptyRowIndex = this.getRowIndex(empty);
        if (rowIndex === emptyRowIndex && colIndex - 1 === emptyColIndex)
            return true;
        return false;
    };
    NextMoveHelper.prototype.canSlideUp = function (ti, empty) {
        var colIndex = this.getColumnIndex(ti);
        var rowIndex = this.getRowIndex(ti);
        var emptyColIndex = this.getColumnIndex(empty);
        var emptyRowIndex = this.getRowIndex(empty);
        if (rowIndex - 1 === emptyRowIndex && colIndex === emptyColIndex)
            return true;
        return false;
    };
    NextMoveHelper.prototype.canSlideDown = function (ti, empty) {
        var colIndex = this.getColumnIndex(ti);
        var rowIndex = this.getRowIndex(ti);
        var emptyColIndex = this.getColumnIndex(empty);
        var emptyRowIndex = this.getRowIndex(empty);
        if (rowIndex + 1 === emptyRowIndex && colIndex === emptyColIndex)
            return true;
        return false;
    };
    return NextMoveHelper;
}());
exports.NextMoveHelper = NextMoveHelper;
//# sourceMappingURL=NextMoveHelper.js.map
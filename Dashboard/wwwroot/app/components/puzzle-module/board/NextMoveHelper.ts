import {TileInfo} from '../../../domain/TileInfo';

export class NextMoveHelper {
    
    constructor(private tiles: Array<TileInfo>) {
        
    }

    getRowIndex(ti: TileInfo) {
        let index = this.tiles.indexOf(ti);

        if (index >= 0 && index <= 3) return 0;
        if (index >= 4 && index <= 7) return 1;
        if (index >= 8 && index <= 11) return 2;
        if (index >= 12 && index <= 15) return 3;

        return 0;
    } 

    getColumnIndex(ti: TileInfo) {
        let index = this.tiles.indexOf(ti);

        if (index === 0 || index === 4 || index === 8 || index === 12) return 0;
        if (index === 1 || index === 5 || index === 9 || index === 13) return 1;
        if (index === 2 || index === 6 || index === 10 || index === 14) return 2;
        if (index === 3 || index === 7 || index === 11 || index === 15) return 3;

        return 0;
    }

    canSlideRight(ti: TileInfo, empty: TileInfo) : boolean {

        let colIndex = this.getColumnIndex(ti);
        let rowIndex = this.getRowIndex(ti);

        let emptyColIndex = this.getColumnIndex(empty);
        let emptyRowIndex = this.getRowIndex(empty);

        if (rowIndex === emptyRowIndex && colIndex + 1 === emptyColIndex)
            return true;

        return false;
    }

    canSlideLeft(ti: TileInfo, empty: TileInfo): boolean {

        let colIndex = this.getColumnIndex(ti);
        let rowIndex = this.getRowIndex(ti);

        let emptyColIndex = this.getColumnIndex(empty);
        let emptyRowIndex = this.getRowIndex(empty);

        if (rowIndex === emptyRowIndex && colIndex - 1 === emptyColIndex)
            return true;

        return false;
    }

    canSlideUp(ti: TileInfo, empty: TileInfo): boolean {

        let colIndex = this.getColumnIndex(ti);
        let rowIndex = this.getRowIndex(ti);

        let emptyColIndex = this.getColumnIndex(empty);
        let emptyRowIndex = this.getRowIndex(empty);

        if (rowIndex - 1 === emptyRowIndex && colIndex === emptyColIndex)
            return true;

        return false;
    }

    canSlideDown(ti: TileInfo, empty: TileInfo): boolean {

        let colIndex = this.getColumnIndex(ti);
        let rowIndex = this.getRowIndex(ti);

        let emptyColIndex = this.getColumnIndex(empty);
        let emptyRowIndex = this.getRowIndex(empty);

        if (rowIndex + 1 === emptyRowIndex && colIndex === emptyColIndex)
            return true;

        return false;
    }

}
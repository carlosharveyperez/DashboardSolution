import {TileInfo} from '../../../domain/TileInfo';

export class BoardUtil {
    static max_iterations: number = 25;

    static isPuzzleSolved(tiles: Array<TileInfo>) {
        for (let i = 0; i < tiles.length-1; i++) {
            if ((i + 1).toString() !== tiles[i].tileNumber) return false;
        }

        return true;
    }

    static scramble(tiles: Array<TileInfo>) {
        let count = 0;
        while (count <= this.max_iterations) {
            let num1 = this.getRandomIntInclusive(0, 15);
            let num2 = this.getRandomIntInclusive(0, 15);
            if ( num1 === num2) continue;

            let ti1 = tiles[num1];
            let ti2 = tiles[num2];

            let tempTile = new TileInfo();
            tempTile.backColor = ti1.backColor;
            tempTile.tileNumber = ti1.tileNumber;
            
            ti1.backColor = ti2.backColor;
            ti1.tileNumber = ti2.tileNumber;
            ti2.backColor = tempTile.backColor;
            ti2.tileNumber = tempTile.tileNumber; 
            
            count++;
        }
    }

    // Jhonson & Story (1879) Algorithm to verify if puzzle is solvable
    static isPuzzleSolvable(tiles: Array<TileInfo>, emptyTile: TileInfo) {
        let inversions: number = 0;
        let columnsCount = 4;
        let row: number = 0;
        let emptyTileRow: number = 0;

        for (let i = 0; i < tiles.length; i++)
        {
            // Advance to next row
            if (i % columnsCount === 0)  
                row++;
            
            // The blank tile
            if (tiles[i].tileNumber === '') { 
                emptyTileRow = row; 
                continue;
            }

            // Count inversions
            for (let j = i + 1; j < tiles.length; j++)
            {
                if (tiles[j].tileNumber !== '' && tiles[i] > tiles[j] ) {
                    inversions++;
                }
            }
        }

        // Blank on odd row, counting from bottom
        if (emptyTileRow % 2 === 0) { 
            return inversions % 2 === 0;
        } else {
            // blank on even row, counting from bottom
            return inversions % 2 !== 0;
        }
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
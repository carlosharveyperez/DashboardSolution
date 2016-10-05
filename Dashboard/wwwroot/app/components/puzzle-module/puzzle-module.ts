import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import PuzzleComponent from './puzzle/puzzle';
import { puzzleRouting } from './puzzle-module-routing';
import SharedModule from '../share-module/shared-module';
import { PuzzleBoardComponent } from './board/puzzleboard';
import { PuzzleTileComponent } from './tile/puzzletile';

@NgModule({
    imports: [CommonModule, puzzleRouting, SharedModule],
    declarations: [PuzzleComponent, PuzzleBoardComponent, PuzzleTileComponent]
})
export default class PuzzleModule { }
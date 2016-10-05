import { RouterModule }  from '@angular/router';
import PuzzleComponent from './puzzle/puzzle';

export const puzzleRouting = RouterModule.forChild([
    { path: '', component: PuzzleComponent }
]);

import { RouterModule }  from '@angular/router';
import TubesComponent from './tubes/tubes';

export const tubesRouting = RouterModule.forChild([
    { path: '', component: TubesComponent }
]);

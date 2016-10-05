import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'PhotoAlbums', loadChildren: 'app/components/photos-module/photos-module'},
    { path: 'Tubes', loadChildren: 'app/components/tubes-module/tubes-module' },
    { path: 'Puzzle', loadChildren: 'app/components/puzzle-module/puzzle-module' }
];

export const appRoutingProviders: any[] = [];

export const appRoutings = RouterModule.forRoot(appRoutes);

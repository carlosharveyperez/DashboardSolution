import { Routes, RouterModule }  from '@angular/router';
import PhotoAlbumsComponent from './photo-albums/photo-albums';
import EditComponent from './edit/edit';
import DisplayComponent from './display/display';
import AdminLoggedGuard from './guards/AdminLoggedGuard';

const routes: Routes = [
    {
        path: '',
        component: PhotoAlbumsComponent,
        children: [
            { path: 'Add', component: EditComponent },
            { path: 'Edit', component: EditComponent, canActivate: [AdminLoggedGuard] },
            { path: '', component: DisplayComponent }
        ]
    }
];

export const photosRouting = RouterModule.forChild(routes);

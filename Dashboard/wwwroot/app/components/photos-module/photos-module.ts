import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import PhotoAlbumsComponent from './photo-albums/photo-albums';
import AlbumComponent from './album/album-component';
import DisplayComponent from './display/display';
import EditComponent from './edit/edit';

import { photosRouting } from './photos-module-routing';
import AdminLoggedGuard from './guards/AdminLoggedGuard';
import {AlbumService} from '../../services/AlbumService';

import { ModalModule } from 'ng2-modal';
import SharedModule from '../share-module/shared-module';

@NgModule({
    imports: [CommonModule, FormsModule, photosRouting, ModalModule, SharedModule],
    providers: [AlbumService, AdminLoggedGuard],
    declarations: [PhotoAlbumsComponent, EditComponent, DisplayComponent, AlbumComponent]
})
export default class PhotosModule { }
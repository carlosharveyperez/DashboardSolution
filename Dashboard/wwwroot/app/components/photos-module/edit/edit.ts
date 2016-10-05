import { Component, OnInit, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../../services/AlbumService';
import { Album } from '../../../domain/Album';
import { Photo } from '../../../domain/Photo';
import { KeyValuePair } from '../../../domain/KeyValuePair';
import { Modal, ModalHeader, ModalContent, ModalFooter} from 'ng2-modal';
import {ApplicationComponent} from '../../application/application';

@Component({
    moduleId: module.id,
    templateUrl: 'edit.html',
    styleUrls: ['edit.css']
})

export default class EditComponent implements OnInit {
    Add: string = 'Add';
    Edit: string = 'Edit';
    isEditingExistingAlbum: boolean = false;
    
    editMode: string = this.Add;
    public album: Album;

    @ViewChild('inputForFiles') inputForFiles: ElementRef;
    private app: ApplicationComponent;
    
    constructor(private albumService: AlbumService, private router: Router,
        private route: ActivatedRoute, private appRef: ApplicationRef) {
        this.app = appRef.components[0].instance;
        this.editMode = route.routeConfig.path;
        this.album = new Album();
        this.album.title = '';
    }

    ngOnInit() {
        if (this.isNewAlbum()) return;
        this.isEditingExistingAlbum = true;
        this.getAlbum();
    }

    isNewAlbum() {
        return this.editMode === this.Add && !this.album.id;   
    }
    
    removePhoto(photo: Photo) {
        let photoIndex = this.album.photos.indexOf(photo);
        if (photoIndex !== -1) this.album.photos.splice(photoIndex, 1);

        // Need to subscribe to make the observable hot
        let subs = this.albumService.deletePhoto(photo)
        .subscribe(() => {
            subs.unsubscribe();
        });
    }

    editPhoto(photo: Photo, dialog: Modal) {
        dialog.open();
    }

    onFilesSelected() {
        this.app.appWaitingComponent.startWaiting();

        let files: FileList = this.inputForFiles.nativeElement.files;
        for (let i = 0; i < files.length; i++) {
            let data = new FormData();
            data.append(files[i].name, files[i]);
            this.uploadFile(data, i === files.length-1);
        }
    }

    uploadFile(formData: FormData, endWaiting: boolean) {
        let uploadFileSubs = this.albumService.uploadFile(formData).subscribe(res => {
            uploadFileSubs.unsubscribe();

            let kvp: KeyValuePair = res; 
            let photo: Photo = new Photo();
            photo.title = kvp.key;
            photo.uri = kvp.value;
            photo.dateUploaded = new Date().toJSON().slice(0, 10);
            photo.albumId = this.album.id;

            let addPhotoSubs = this.albumService.addPhoto(photo)
                .subscribe((param) => {
                let pict: Photo = param;
                addPhotoSubs.unsubscribe();

                // Photo added to database, add it to album collection
                this.album.photos.push(pict);

                if (endWaiting) this.app.appWaitingComponent.endWaiting();  
            });

        });
    }

    updateOrCreateAlbum(album: Album) {
        this.app.appWaitingComponent.startWaiting();

        if (this.isNewAlbum()) {
            let subs = this.albumService.createAlbum(album).subscribe((newAlbum) => {
                subs.unsubscribe();
                album.id = newAlbum.id;
                album.photos = [];
                this.isEditingExistingAlbum = true;
                this.app.appWaitingComponent.endWaiting();
            }, this.handleError);
        } else {
            let subs = this.albumService.updateAlbum(album).subscribe(() => {
                subs.unsubscribe();
                this.app.appWaitingComponent.endWaiting();
            }, this.handleError);        
        }
    }

    goBack() {
        window.history.back();
    }
    
    getAlbum() {
        if (this.isNewAlbum()) return;

        let id = +this.route.snapshot.params['albumId'];
        this.album = this.albumService.getCachedAlbum(id);
    }

    savePhotoTitle(photo: Photo, dialog: Modal) {
        if (!photo.title) return;

        dialog.close();
        let subs = this.albumService.updatePhoto(photo)
            .subscribe(() => {
                subs.unsubscribe();
            });
    }

    private handleError(error) {
        if (error.status === 401 || error.status === 404) {
            console.error(error);
        }
    }
}
   

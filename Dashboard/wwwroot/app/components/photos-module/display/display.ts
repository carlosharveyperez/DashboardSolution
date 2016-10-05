import { Component, OnInit, ViewChild, Host, ApplicationRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlbumService } from '../../../services/AlbumService';
import { Album } from '../../../domain/Album';
import { Subscription } from 'rxjs/Subscription';
import {ApplicationComponent} from '../../application/application';

@Component({
    moduleId: module.id,
    templateUrl: 'display.html',
    styleUrls: ['display.css']
})

export default class DisplayComponent implements OnInit {
    public _albums: Array<Album> = [];
    private subscription: Subscription;
    private app: ApplicationComponent;
    
    constructor(public albumService: AlbumService, private router: Router,
        private route: ActivatedRoute, private appRef: ApplicationRef) {
        this.app = appRef.components[0].instance;
    }

    ngOnInit() {
        this.getAlbumsId();
    }

    showWarningMessage(album: Album) {
        if (album.owner !== 'admin') {
            this.displayWarning(album);
        } else {
            let isAdminLogged = this.albumService.isAdminLogged();
            let subs = isAdminLogged.subscribe((param) => {
                subs.unsubscribe();
                if (param === true) {
                    this.displayWarning(album);
                } else {
                    let msg = "Albums created by Administrator cannot be edited." +
                        "Please, use a Guest Album or create your own.";
                    this.app.appDialogComponent.showOKMessage('Authorization', msg);
                }
            });   
        }
    }

    displayWarning(album: Album) {
        let msg = 'Are you sure you want to remove ' + album.title + '?';
        this.subscription = this.app.appDialogComponent.mainDialog
            .onClose.subscribe((param) => this.onRemoveAlbum(param, album));
        this.app.appDialogComponent.showYesNoMessage('Remove Album', msg);
    }

    onRemoveAlbum(event: any, album: Album) {
        this.subscription.unsubscribe();

        if (this.app.appDialogComponent.isCommitButton(event))
            this.removeAlbum(album);
    }

    removeAlbum(album: Album) {
        let index: number = this._albums.indexOf(album);
        if (index !== -1) this._albums.splice(index, 1);

        let subs = this.albumService.deleteAlbum(album).subscribe(() => {
            subs.unsubscribe();   
        });
    }

    editAlbum(album: Album) {
        this.router.navigate(['Edit', { albumId: album.id }], { relativeTo: this.route });
    }

    getAlbums(): void {
       let subs = this.albumService.getAlbums().subscribe(
           res => {
                subs.unsubscribe();
                this._albums = res;
            },

            error => {
                if (error.status === 401 || error.status === 404) {
                    console.error(error);
                }
            });
    }

    getAlbumsId() {
        if ( this._albums == null || this._albums.length === 0 && this.albumService.cachedAlbums.length === 0)
            this.app.appWaitingComponent.startWaiting();

        let subs = this.albumService.getAlbumsId().subscribe(
        res => {
            subs.unsubscribe();
            let ids: Array<number> = res;
            
            for (let i = 0; i < ids.length; i++) {
                let counter = i;
                let id = ids[i];
                let innerSubs = this.albumService.getAlbum(id)
                    .subscribe((album) => {
                    innerSubs.unsubscribe();
                    this._albums.push(album);

                    // Sort by id to make order deterministic
                    this._albums.sort((a, b) => (a.id - b.id));

                    if (counter === ids.length-1) 
                        this.app.appWaitingComponent.endWaiting();
                });
            }
        },

        error => {
            if (error.status === 401 || error.status === 404) {
                console.error(error);
            }
        });
    }
}
import { Injectable, ApplicationRef }  from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AlbumService } from '../../../services/AlbumService';
import {GenericResult} from '../../../domain/GenericResult';
import {ApplicationComponent} from '../../application/application';
import {Album} from '../../../domain/Album';

@Injectable()
export default class AdminLoggedGuard implements CanActivate  {

    private app: ApplicationComponent;
    private subscription: Subscription;

    constructor(private albumService: AlbumService, private router: Router, private appRef: ApplicationRef) {
        this.app = appRef.components[0].instance;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let albumId: number = +route.params['albumId'];
        let album: Album = this.albumService.getCachedAlbum(albumId);
        if (album.owner !== 'admin') return true;

        let isAdminLogged = this.albumService.isAdminLogged();

        let subs = isAdminLogged.subscribe((param) => {
            subs.unsubscribe();
            if (param === true) return true;

            let msg = "Albums created by Administrator cannot be edited. " +
                      "Please, use a Guest Album or create your own.";
            this.app.appDialogComponent.showOKMessage('Authorization', msg);
            return false;
        });

        return isAdminLogged;
    }
}

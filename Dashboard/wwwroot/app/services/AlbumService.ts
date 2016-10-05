import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Album } from '../domain/Album';
import {GenericResult} from '../domain/GenericResult';
import {Photo} from '../domain/Photo';
import {KeyValuePair} from '../domain/KeyValuePair';

@Injectable()
export class AlbumService {

    private _albumsAPI: string = 'api/albums';
    private _photosAPI: string = 'api/photos';
    public redirectUrl: string;
    public cachedAlbums: Array<Album> = [];
    
    constructor(private http: Http) {
    }

    getAlbumsId(): Observable<Array<number>> {
        let url = this._albumsAPI + '/GetAlbumsId';
        return this.http.get(url)
            .map(res => this.mapResponeToArrayOfNumbers(res))
            .catch(this.handleError);
    }

    mapResponeToArrayOfNumbers(resp: Response) : Array<number> {
        let result = resp.json();
        let gr = <GenericResult>(result);
        let tokens: Array<number> = JSON.parse(gr.albumsId);
        return tokens;
    }

    // It is meant to be use to updload only one file at at time
    uploadFile(data: FormData) : Observable<KeyValuePair> {
        let url = this._albumsAPI + '/UploadFile';
        return this.http.post(url, data)
            .map(item => this.mapResponseToKeyValuePair(item))
            .catch(this.handleError);
    }

    private mapResponseToKeyValuePair(resp: Response): KeyValuePair {
        let result = resp.json();
        let gr = <GenericResult>(result);
        let kvp = new KeyValuePair();
        let tokens: Array<string> = JSON.parse(gr.urlsMap);
        kvp.key = tokens[0];
        kvp.value = tokens[1];
        return kvp;
    }

    addPhoto(photo: Photo): Observable<Photo> {
        let url = this._photosAPI;
        let body = JSON.stringify(photo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(url, body, options)
            .map(resp => this.mapResponseToPhoto(resp))
            .catch(this.handleError);
    }

    mapResponseToPhoto(resp: Response) {
        let p: Photo = resp.json();
        return p;
    }

    deletePhoto(photo: Photo): Observable<Response> {
        let url = this._photosAPI + '/' + photo.id;
        return this.http.delete(url).catch(this.handleError);
    }

    deleteAlbum(album: Album): Observable<Response> {
        let url = this._albumsAPI + '/' + album.id;
        return this.http.delete(url).catch(this.handleError);
    }

    isAdminLogged() : Observable<boolean> {
        let url = this._albumsAPI + '/IsAdminLogged';
        return this.http.get(url)
            .map(resp => this.mapGenericToBoolean(resp))
            .catch(this.handleError);
    }

    private mapGenericToBoolean(res: Response) : boolean {
         let result = res.json();
         let gr = <GenericResult>(result);
         if (gr.isAdminLogged) return true;
        
        return false;
    }
    
    getAlbums(): Observable<Album[]>{
        return this.http.get(this._albumsAPI)
            .map((r) => this.extractAlbums(r))
            .catch(this.handleError);
    }

    getAlbum(id: number): Observable<Album> {
        let url = this._albumsAPI + '/' + id;
        return this.http.get(url)
            .map((r) => this.extractSingleAlbum(r))
            .catch(this.handleError);
    }

    getCachedAlbum(id: number) {
        let album = this.cachedAlbums.find(a => a.id === id);
        return album;
    }

    updateAlbum(album: Album): Observable<Response> {

        let url = this._albumsAPI + '/' + album.id;
        let body = JSON.stringify(album);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map(resp => resp)
            .catch(this.handleError);
    }

    createAlbum(album: Album): Observable<Album> {

        let url = this._albumsAPI;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        album.dateCreated = new Date().toJSON().slice(0, 10);
        // It will be overriden on the server if needed.
        album.owner = 'guest';

        let body = JSON.stringify(album);
        return this.http.post(url, body, options)
            .map(resp => this.mapResponseToAlbum(resp))
            .catch(this.handleError);
    }

    mapResponseToAlbum(resp: Response) {
        let a: Album = resp.json();
        return a;
    }

    updatePhoto(photo: Photo) : Observable<Response> {

        let url = this._photosAPI + '/' + photo.id;
        let body = JSON.stringify(photo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map(resp => resp)
            .catch(this.handleError);
    }
    
    private extractAlbums(res: Response) {
        let body = res.json();
        this.cachedAlbums = body || {};
        return this.cachedAlbums;
    }

    private extractSingleAlbum(res: Response) {
        let body = res.json();
        let result = body || {};
        if (body) this.cachedAlbums.push(result);

        return result;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
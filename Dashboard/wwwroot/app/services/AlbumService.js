"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var KeyValuePair_1 = require('../domain/KeyValuePair');
var AlbumService = (function () {
    function AlbumService(http) {
        this.http = http;
        this._albumsAPI = 'api/albums';
        this._photosAPI = 'api/photos';
        this.cachedAlbums = [];
    }
    AlbumService.prototype.getAlbumsId = function () {
        var _this = this;
        var url = this._albumsAPI + '/GetAlbumsId';
        return this.http.get(url)
            .map(function (res) { return _this.mapResponeToArrayOfNumbers(res); })
            .catch(this.handleError);
    };
    AlbumService.prototype.mapResponeToArrayOfNumbers = function (resp) {
        var result = resp.json();
        var gr = (result);
        var tokens = JSON.parse(gr.albumsId);
        return tokens;
    };
    // It is meant to be use to updload only one file at at time
    AlbumService.prototype.uploadFile = function (data) {
        var _this = this;
        var url = this._albumsAPI + '/UploadFile';
        return this.http.post(url, data)
            .map(function (item) { return _this.mapResponseToKeyValuePair(item); })
            .catch(this.handleError);
    };
    AlbumService.prototype.mapResponseToKeyValuePair = function (resp) {
        var result = resp.json();
        var gr = (result);
        var kvp = new KeyValuePair_1.KeyValuePair();
        var tokens = JSON.parse(gr.urlsMap);
        kvp.key = tokens[0];
        kvp.value = tokens[1];
        return kvp;
    };
    AlbumService.prototype.addPhoto = function (photo) {
        var _this = this;
        var url = this._photosAPI;
        var body = JSON.stringify(photo);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(function (resp) { return _this.mapResponseToPhoto(resp); })
            .catch(this.handleError);
    };
    AlbumService.prototype.mapResponseToPhoto = function (resp) {
        var p = resp.json();
        return p;
    };
    AlbumService.prototype.deletePhoto = function (photo) {
        var url = this._photosAPI + '/' + photo.id;
        return this.http.delete(url).catch(this.handleError);
    };
    AlbumService.prototype.deleteAlbum = function (album) {
        var url = this._albumsAPI + '/' + album.id;
        return this.http.delete(url).catch(this.handleError);
    };
    AlbumService.prototype.isAdminLogged = function () {
        var _this = this;
        var url = this._albumsAPI + '/IsAdminLogged';
        return this.http.get(url)
            .map(function (resp) { return _this.mapGenericToBoolean(resp); })
            .catch(this.handleError);
    };
    AlbumService.prototype.mapGenericToBoolean = function (res) {
        var result = res.json();
        var gr = (result);
        if (gr.isAdminLogged)
            return true;
        return false;
    };
    AlbumService.prototype.getAlbums = function () {
        var _this = this;
        return this.http.get(this._albumsAPI)
            .map(function (r) { return _this.extractAlbums(r); })
            .catch(this.handleError);
    };
    AlbumService.prototype.getAlbum = function (id) {
        var _this = this;
        var url = this._albumsAPI + '/' + id;
        return this.http.get(url)
            .map(function (r) { return _this.extractSingleAlbum(r); })
            .catch(this.handleError);
    };
    AlbumService.prototype.getCachedAlbum = function (id) {
        var album = this.cachedAlbums.find(function (a) { return a.id === id; });
        return album;
    };
    AlbumService.prototype.updateAlbum = function (album) {
        var url = this._albumsAPI + '/' + album.id;
        var body = JSON.stringify(album);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, body, options)
            .map(function (resp) { return resp; })
            .catch(this.handleError);
    };
    AlbumService.prototype.createAlbum = function (album) {
        var _this = this;
        var url = this._albumsAPI;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        album.dateCreated = new Date().toJSON().slice(0, 10);
        // It will be overriden on the server if needed.
        album.owner = 'guest';
        var body = JSON.stringify(album);
        return this.http.post(url, body, options)
            .map(function (resp) { return _this.mapResponseToAlbum(resp); })
            .catch(this.handleError);
    };
    AlbumService.prototype.mapResponseToAlbum = function (resp) {
        var a = resp.json();
        return a;
    };
    AlbumService.prototype.updatePhoto = function (photo) {
        var url = this._photosAPI + '/' + photo.id;
        var body = JSON.stringify(photo);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, body, options)
            .map(function (resp) { return resp; })
            .catch(this.handleError);
    };
    AlbumService.prototype.extractAlbums = function (res) {
        var body = res.json();
        this.cachedAlbums = body || {};
        return this.cachedAlbums;
    };
    AlbumService.prototype.extractSingleAlbum = function (res) {
        var body = res.json();
        var result = body || {};
        if (body)
            this.cachedAlbums.push(result);
        return result;
    };
    AlbumService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : error.status ?
            error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AlbumService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AlbumService);
    return AlbumService;
}());
exports.AlbumService = AlbumService;
//# sourceMappingURL=AlbumService.js.map
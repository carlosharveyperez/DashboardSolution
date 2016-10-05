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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var AlbumService_1 = require('../../../services/AlbumService');
var Album_1 = require('../../../domain/Album');
var Photo_1 = require('../../../domain/Photo');
var EditComponent = (function () {
    function EditComponent(albumService, router, route, appRef) {
        this.albumService = albumService;
        this.router = router;
        this.route = route;
        this.appRef = appRef;
        this.Add = 'Add';
        this.Edit = 'Edit';
        this.isEditingExistingAlbum = false;
        this.editMode = this.Add;
        this.app = appRef.components[0].instance;
        this.editMode = route.routeConfig.path;
        this.album = new Album_1.Album();
        this.album.title = '';
    }
    EditComponent.prototype.ngOnInit = function () {
        if (this.isNewAlbum())
            return;
        this.isEditingExistingAlbum = true;
        this.getAlbum();
    };
    EditComponent.prototype.isNewAlbum = function () {
        return this.editMode === this.Add && !this.album.id;
    };
    EditComponent.prototype.removePhoto = function (photo) {
        var photoIndex = this.album.photos.indexOf(photo);
        if (photoIndex !== -1)
            this.album.photos.splice(photoIndex, 1);
        // Need to subscribe to make the observable hot
        var subs = this.albumService.deletePhoto(photo)
            .subscribe(function () {
            subs.unsubscribe();
        });
    };
    EditComponent.prototype.editPhoto = function (photo, dialog) {
        dialog.open();
    };
    EditComponent.prototype.onFilesSelected = function () {
        this.app.appWaitingComponent.startWaiting();
        var files = this.inputForFiles.nativeElement.files;
        for (var i = 0; i < files.length; i++) {
            var data = new FormData();
            data.append(files[i].name, files[i]);
            this.uploadFile(data, i === files.length - 1);
        }
    };
    EditComponent.prototype.uploadFile = function (formData, endWaiting) {
        var _this = this;
        var uploadFileSubs = this.albumService.uploadFile(formData).subscribe(function (res) {
            uploadFileSubs.unsubscribe();
            var kvp = res;
            var photo = new Photo_1.Photo();
            photo.title = kvp.key;
            photo.uri = kvp.value;
            photo.dateUploaded = new Date().toJSON().slice(0, 10);
            photo.albumId = _this.album.id;
            var addPhotoSubs = _this.albumService.addPhoto(photo)
                .subscribe(function (param) {
                var pict = param;
                addPhotoSubs.unsubscribe();
                // Photo added to database, add it to album collection
                _this.album.photos.push(pict);
                if (endWaiting)
                    _this.app.appWaitingComponent.endWaiting();
            });
        });
    };
    EditComponent.prototype.updateOrCreateAlbum = function (album) {
        var _this = this;
        this.app.appWaitingComponent.startWaiting();
        if (this.isNewAlbum()) {
            var subs_1 = this.albumService.createAlbum(album).subscribe(function (newAlbum) {
                subs_1.unsubscribe();
                album.id = newAlbum.id;
                album.photos = [];
                _this.isEditingExistingAlbum = true;
                _this.app.appWaitingComponent.endWaiting();
            }, this.handleError);
        }
        else {
            var subs_2 = this.albumService.updateAlbum(album).subscribe(function () {
                subs_2.unsubscribe();
                _this.app.appWaitingComponent.endWaiting();
            }, this.handleError);
        }
    };
    EditComponent.prototype.goBack = function () {
        window.history.back();
    };
    EditComponent.prototype.getAlbum = function () {
        if (this.isNewAlbum())
            return;
        var id = +this.route.snapshot.params['albumId'];
        this.album = this.albumService.getCachedAlbum(id);
    };
    EditComponent.prototype.savePhotoTitle = function (photo, dialog) {
        if (!photo.title)
            return;
        dialog.close();
        var subs = this.albumService.updatePhoto(photo)
            .subscribe(function () {
            subs.unsubscribe();
        });
    };
    EditComponent.prototype.handleError = function (error) {
        if (error.status === 401 || error.status === 404) {
            console.error(error);
        }
    };
    __decorate([
        core_1.ViewChild('inputForFiles'), 
        __metadata('design:type', core_1.ElementRef)
    ], EditComponent.prototype, "inputForFiles", void 0);
    EditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'edit.html',
            styleUrls: ['edit.css']
        }), 
        __metadata('design:paramtypes', [AlbumService_1.AlbumService, router_1.Router, router_1.ActivatedRoute, core_1.ApplicationRef])
    ], EditComponent);
    return EditComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponent;
//# sourceMappingURL=edit.js.map
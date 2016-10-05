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
var DisplayComponent = (function () {
    function DisplayComponent(albumService, router, route, appRef) {
        this.albumService = albumService;
        this.router = router;
        this.route = route;
        this.appRef = appRef;
        this._albums = [];
        this.app = appRef.components[0].instance;
    }
    DisplayComponent.prototype.ngOnInit = function () {
        this.getAlbumsId();
    };
    DisplayComponent.prototype.showWarningMessage = function (album) {
        var _this = this;
        if (album.owner !== 'admin') {
            this.displayWarning(album);
        }
        else {
            var isAdminLogged = this.albumService.isAdminLogged();
            var subs_1 = isAdminLogged.subscribe(function (param) {
                subs_1.unsubscribe();
                if (param === true) {
                    _this.displayWarning(album);
                }
                else {
                    var msg = "Albums created by Administrator cannot be edited." +
                        "Please, use a Guest Album or create your own.";
                    _this.app.appDialogComponent.showOKMessage('Authorization', msg);
                }
            });
        }
    };
    DisplayComponent.prototype.displayWarning = function (album) {
        var _this = this;
        var msg = 'Are you sure you want to remove ' + album.title + '?';
        this.subscription = this.app.appDialogComponent.mainDialog
            .onClose.subscribe(function (param) { return _this.onRemoveAlbum(param, album); });
        this.app.appDialogComponent.showYesNoMessage('Remove Album', msg);
    };
    DisplayComponent.prototype.onRemoveAlbum = function (event, album) {
        this.subscription.unsubscribe();
        if (this.app.appDialogComponent.isCommitButton(event))
            this.removeAlbum(album);
    };
    DisplayComponent.prototype.removeAlbum = function (album) {
        var index = this._albums.indexOf(album);
        if (index !== -1)
            this._albums.splice(index, 1);
        var subs = this.albumService.deleteAlbum(album).subscribe(function () {
            subs.unsubscribe();
        });
    };
    DisplayComponent.prototype.editAlbum = function (album) {
        this.router.navigate(['Edit', { albumId: album.id }], { relativeTo: this.route });
    };
    DisplayComponent.prototype.getAlbums = function () {
        var _this = this;
        var subs = this.albumService.getAlbums().subscribe(function (res) {
            subs.unsubscribe();
            _this._albums = res;
        }, function (error) {
            if (error.status === 401 || error.status === 404) {
                console.error(error);
            }
        });
    };
    DisplayComponent.prototype.getAlbumsId = function () {
        var _this = this;
        if (this._albums == null || this._albums.length === 0 && this.albumService.cachedAlbums.length === 0)
            this.app.appWaitingComponent.startWaiting();
        var subs = this.albumService.getAlbumsId().subscribe(function (res) {
            subs.unsubscribe();
            var ids = res;
            var _loop_1 = function(i) {
                var counter = i;
                var id = ids[i];
                var innerSubs = _this.albumService.getAlbum(id)
                    .subscribe(function (album) {
                    innerSubs.unsubscribe();
                    _this._albums.push(album);
                    // Sort by id to make order deterministic
                    _this._albums.sort(function (a, b) { return (a.id - b.id); });
                    if (counter === ids.length - 1)
                        _this.app.appWaitingComponent.endWaiting();
                });
            };
            for (var i = 0; i < ids.length; i++) {
                _loop_1(i);
            }
        }, function (error) {
            if (error.status === 401 || error.status === 404) {
                console.error(error);
            }
        });
    };
    DisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'display.html',
            styleUrls: ['display.css']
        }), 
        __metadata('design:paramtypes', [AlbumService_1.AlbumService, router_1.Router, router_1.ActivatedRoute, core_1.ApplicationRef])
    ], DisplayComponent);
    return DisplayComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisplayComponent;
//# sourceMappingURL=display.js.map
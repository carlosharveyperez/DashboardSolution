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
var AdminLoggedGuard = (function () {
    function AdminLoggedGuard(albumService, router, appRef) {
        this.albumService = albumService;
        this.router = router;
        this.appRef = appRef;
        this.app = appRef.components[0].instance;
    }
    AdminLoggedGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var albumId = +route.params['albumId'];
        var album = this.albumService.getCachedAlbum(albumId);
        if (album.owner !== 'admin')
            return true;
        var isAdminLogged = this.albumService.isAdminLogged();
        var subs = isAdminLogged.subscribe(function (param) {
            subs.unsubscribe();
            if (param === true)
                return true;
            var msg = "Albums created by Administrator cannot be edited. " +
                "Please, use a Guest Album or create your own.";
            _this.app.appDialogComponent.showOKMessage('Authorization', msg);
            return false;
        });
        return isAdminLogged;
    };
    AdminLoggedGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [AlbumService_1.AlbumService, router_1.Router, core_1.ApplicationRef])
    ], AdminLoggedGuard);
    return AdminLoggedGuard;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLoggedGuard;
//# sourceMappingURL=AdminLoggedGuard.js.map
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
var ImageInfo_1 = require('../../../domain/ImageInfo');
var Album_1 = require('../../../domain/Album');
var AlbumComponent = (function () {
    function AlbumComponent(renderer, appRef) {
        this.renderer = renderer;
        this.appRef = appRef;
        this.doingChanges = false;
        this.app = appRef.components[0].instance;
    }
    AlbumComponent.prototype.showCarousel = function (photo) {
        var infos = new Array();
        for (var i = 0; i < this.album.photos.length; i++) {
            var p = this.album.photos[i];
            var ii = new ImageInfo_1.ImageInfo();
            ii.url = p.uri;
            ii.title = p.title;
            infos.push(ii);
        }
        this.app.appCarouselComponent.show(infos, this.album.photos.indexOf(photo), this.album);
    };
    AlbumComponent.prototype.hideCarousel = function () {
        this.app.appCarouselComponent.hide();
    };
    AlbumComponent.prototype.scrollLeft = function () {
        var currentWidth = "-=" + this.getScrollerWidth();
        $(this.scroller.nativeElement).animate({ 'scrollLeft': currentWidth }, 600);
    };
    AlbumComponent.prototype.scrollRight = function () {
        var currentWidth = "+=" + this.getScrollerWidth();
        $(this.scroller.nativeElement).animate({ 'scrollLeft': currentWidth }, 600);
    };
    AlbumComponent.prototype.getScrollerWidth = function () {
        return this.scroller.nativeElement.clientWidth;
    };
    AlbumComponent.prototype.applyWidth = function (width) {
        var newWidth = (width - 120) + "px";
        this.renderer.setElementStyle(this.scroller.nativeElement, "width", newWidth);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Album_1.Album)
    ], AlbumComponent.prototype, "album", void 0);
    __decorate([
        core_1.ViewChild('scroller'), 
        __metadata('design:type', core_1.ElementRef)
    ], AlbumComponent.prototype, "scroller", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AlbumComponent.prototype, "navigationMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AlbumComponent.prototype, "photos", void 0);
    AlbumComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'album-component',
            templateUrl: 'album-component.html',
            styleUrls: ['album-component.css']
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ApplicationRef])
    ], AlbumComponent);
    return AlbumComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlbumComponent;
//# sourceMappingURL=album-component.js.map
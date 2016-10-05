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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var photo_albums_1 = require('./photo-albums/photo-albums');
var album_component_1 = require('./album/album-component');
var display_1 = require('./display/display');
var edit_1 = require('./edit/edit');
var photos_module_routing_1 = require('./photos-module-routing');
var AdminLoggedGuard_1 = require('./guards/AdminLoggedGuard');
var AlbumService_1 = require('../../services/AlbumService');
var ng2_modal_1 = require('ng2-modal');
var shared_module_1 = require('../share-module/shared-module');
var PhotosModule = (function () {
    function PhotosModule() {
    }
    PhotosModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, photos_module_routing_1.photosRouting, ng2_modal_1.ModalModule, shared_module_1.default],
            providers: [AlbumService_1.AlbumService, AdminLoggedGuard_1.default],
            declarations: [photo_albums_1.default, edit_1.default, display_1.default, album_component_1.default]
        }), 
        __metadata('design:paramtypes', [])
    ], PhotosModule);
    return PhotosModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PhotosModule;
//# sourceMappingURL=photos-module.js.map
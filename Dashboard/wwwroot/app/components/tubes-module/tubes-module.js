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
var tubes_1 = require('./tubes/tubes');
var tubes_module_routing_1 = require('./tubes-module-routing');
var shared_module_1 = require('../share-module/shared-module');
var display_1 = require('./display/display');
var VideoService_1 = require('../../services/VideoService');
var video_1 = require('./video/video');
var TubesModule = (function () {
    function TubesModule() {
    }
    TubesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, tubes_module_routing_1.tubesRouting, shared_module_1.default],
            providers: [VideoService_1.VideoService],
            declarations: [tubes_1.default, display_1.TubesDisplayComponent, video_1.default]
        }), 
        __metadata('design:paramtypes', [])
    ], TubesModule);
    return TubesModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TubesModule;
//# sourceMappingURL=tubes-module.js.map
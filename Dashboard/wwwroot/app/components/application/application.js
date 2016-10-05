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
var app_dialog_1 = require('./app-dialog');
var waiting_component_1 = require('./waiting-component');
var app_carousel_1 = require('./app-carousel');
var ApplicationComponent = (function () {
    function ApplicationComponent() {
    }
    __decorate([
        core_1.ViewChild(app_dialog_1.AppDialogComponent), 
        __metadata('design:type', app_dialog_1.AppDialogComponent)
    ], ApplicationComponent.prototype, "appDialogComponent", void 0);
    __decorate([
        core_1.ViewChild(waiting_component_1.WaitingComponent), 
        __metadata('design:type', waiting_component_1.WaitingComponent)
    ], ApplicationComponent.prototype, "appWaitingComponent", void 0);
    __decorate([
        core_1.ViewChild(app_carousel_1.AppCarouselComponent), 
        __metadata('design:type', app_carousel_1.AppCarouselComponent)
    ], ApplicationComponent.prototype, "appCarouselComponent", void 0);
    ApplicationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-application',
            templateUrl: 'application.html',
            styleUrls: ['application.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationComponent);
    return ApplicationComponent;
}());
exports.ApplicationComponent = ApplicationComponent;
//# sourceMappingURL=application.js.map
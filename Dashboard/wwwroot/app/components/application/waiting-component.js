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
var WaitingComponent = (function () {
    function WaitingComponent(renderer) {
        this.renderer = renderer;
    }
    WaitingComponent.prototype.startWaiting = function () {
        this.renderer.setElementStyle(this.root.nativeElement, "display", 'flex');
    };
    WaitingComponent.prototype.endWaiting = function () {
        var _this = this;
        // Adding extra time just for demo purpose, will remove later
        window.setTimeout(function () { _this.hideCore(); }, 1000);
    };
    WaitingComponent.prototype.hideCore = function () {
        this.renderer.setElementStyle(this.root.nativeElement, "display", 'none');
    };
    __decorate([
        core_1.ViewChild('rootElement'), 
        __metadata('design:type', core_1.ElementRef)
    ], WaitingComponent.prototype, "root", void 0);
    WaitingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'waiting-animation',
            templateUrl: 'waiting-component.html',
            styleUrls: ['waiting-component.css']
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], WaitingComponent);
    return WaitingComponent;
}());
exports.WaitingComponent = WaitingComponent;
//# sourceMappingURL=waiting-component.js.map
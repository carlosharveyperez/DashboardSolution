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
var Observable_1 = require('rxjs/Observable');
var ng2_modal_1 = require('ng2-modal');
var AppDialogComponent = (function () {
    function AppDialogComponent() {
        this.commitLabel = 'YES';
        this.cancelLabel = 'NO';
        this.isCloseButtonVisible = true;
    }
    AppDialogComponent.prototype.showYesNoMessage = function (header, msg) {
        this.header = header;
        this.message = msg;
        this.isCloseButtonVisible = true;
        this.commitLabel = 'YES';
        this.cancelLabel = 'NO';
        this.mainDialog.open();
    };
    AppDialogComponent.prototype.showOKMessage = function (header, msg) {
        this.header = header;
        this.message = msg;
        this.isCloseButtonVisible = false;
        this.commitLabel = 'OK';
        this.mainDialog.open();
    };
    AppDialogComponent.prototype.isCommitButton = function (event) {
        return event[0] === this.commitLabel;
    };
    AppDialogComponent.prototype.isCancelButton = function (event) {
        return event[0] === this.cancelLabel;
    };
    AppDialogComponent.prototype.ngOnInit = function () {
    };
    AppDialogComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    AppDialogComponent.prototype.onAfterCloseEvent = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.subs = _this.mainDialog.onClose.subscribe(function (param) {
                _this.subs.unsubscribe();
                if (_this.isCommitButton(param)) {
                    observer.next(true);
                }
                else {
                    observer.next(false);
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('mainDialog'), 
        __metadata('design:type', ng2_modal_1.Modal)
    ], AppDialogComponent.prototype, "mainDialog", void 0);
    AppDialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'application-dialog',
            templateUrl: 'app-dialog.html',
            styleUrls: ['app-dialog.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppDialogComponent);
    return AppDialogComponent;
}());
exports.AppDialogComponent = AppDialogComponent;
//# sourceMappingURL=app-dialog.js.map
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
var PuzzleTileComponent = (function () {
    function PuzzleTileComponent() {
        this.startingSlide = new core_1.EventEmitter();
        this.endingSlide = new core_1.EventEmitter();
        this.slideDirection = 'none';
        this.rotationState = 'none';
    }
    PuzzleTileComponent.prototype.slideTile = function () {
        this.startingSlide.next(this);
    };
    PuzzleTileComponent.prototype.onSlideCompleted = function (event) {
        this.slideDirection = "none";
        if (event.fromState !== 'none')
            return;
        this.endingSlide.next(this.tileInfo);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PuzzleTileComponent.prototype, "tileInfo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PuzzleTileComponent.prototype, "backColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PuzzleTileComponent.prototype, "tileNumber", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PuzzleTileComponent.prototype, "startingSlide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PuzzleTileComponent.prototype, "endingSlide", void 0);
    PuzzleTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'puzzle-tile',
            templateUrl: 'puzzletile.html',
            styleUrls: ['puzzletile.css'],
            animations: [
                core_1.trigger('slideTrigger', [
                    core_1.transition('none => right', [
                        core_1.style({ transform: 'translateX(0)' }),
                        core_1.animate('400ms 0ms ease-in-out, style', core_1.style({ transform: 'translateX(100%)' }))
                    ]),
                    core_1.transition('none => left', [
                        core_1.style({ transform: 'translateX(0)' }),
                        core_1.animate('400ms 0ms ease-in-out, style', core_1.style({ transform: 'translateX(-100%)' }))
                    ]),
                    core_1.transition('none => up', [
                        core_1.style({ transform: 'translateY(0)' }),
                        core_1.animate('400ms 0ms ease-in-out, style', core_1.style({ transform: 'translateY(-100%)' }))
                    ]),
                    core_1.transition('none => down', [
                        core_1.style({ transform: 'translateY(0)' }),
                        core_1.animate('400ms 0ms ease-in-out, style', core_1.style({ transform: 'translateY(100%)' }))
                    ])
                ]),
                core_1.trigger('rotateIt', [
                    core_1.state('none', core_1.style({ transform: 'rotate(0deg)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'rotate(180deg)' }),
                        core_1.animate('1200ms 1000ms')
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PuzzleTileComponent);
    return PuzzleTileComponent;
}());
exports.PuzzleTileComponent = PuzzleTileComponent;
//# sourceMappingURL=puzzletile.js.map
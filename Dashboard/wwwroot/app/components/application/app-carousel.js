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
var AppCarouselComponent = (function () {
    function AppCarouselComponent(renderer) {
        this.renderer = renderer;
        this.visibility = 'hide';
    }
    AppCarouselComponent.prototype.onImageLoad = function (image, info) {
        var carouselHeight = this.getIdealDimensionAsNumber();
        var carouselWidth = carouselHeight;
        if (image.height <= carouselHeight && image.width <= carouselWidth) {
            // Just center image vertically
            var margin = (carouselHeight - image.height) / 2 + 'px';
            this.renderer.setElementStyle(image, "margin-top", margin);
        }
        else {
            // Preserver image aspect ratio
            var preservedRatioHeight = (carouselWidth * image.height) / image.width;
            var margin = (carouselHeight - preservedRatioHeight) / 2;
            if (margin > 0) {
                this.renderer.setElementStyle(image, "margin-top", margin + 'px');
            }
            else {
                this.renderer.setElementStyle(image, "margin-top", '0px');
            }
        }
    };
    AppCarouselComponent.prototype.getIdealDimensionAsNumber = function () {
        var height = window.innerHeight - 100;
        var width = window.innerWidth - 100;
        var result = Math.min(width, height);
        return result;
    };
    AppCarouselComponent.prototype.getIdealDimension = function () {
        var result = this.getIdealDimensionAsNumber();
        var resultAsString = result + 'px';
        return resultAsString;
    };
    AppCarouselComponent.prototype.show = function (infos, index, album) {
        this.selectedIndex = index;
        this.album = album;
        // Ensure scrollbars are taken out.
        this.imageInfos = infos;
        document.body.className += "modal-open";
        this.renderer.setElementStyle(this.carouselRoot.nativeElement, "display", "flex");
        this.renderer.invokeElementMethod(this.carouselRoot.nativeElement, "focus");
        this.visibility = 'show';
    };
    AppCarouselComponent.prototype.hide = function () {
        // Actual hiding after animation is done.
        this.visibility = 'hide';
    };
    AppCarouselComponent.prototype.onVisibilityAnimationCompleted = function (event) {
        if (event.toState === 'show')
            return;
        // Reset class value that was previously added
        document.body.className = document.body.className.replace("modal-open", "");
        this.renderer.setElementStyle(this.carouselRoot.nativeElement, "display", "none");
    };
    AppCarouselComponent.prototype.onKeyUp = function (event) {
        if (event.key === "Escape")
            this.hide();
    };
    __decorate([
        core_1.ViewChild('carouselRoot'), 
        __metadata('design:type', core_1.ElementRef)
    ], AppCarouselComponent.prototype, "carouselRoot", void 0);
    AppCarouselComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'application-carousel',
            templateUrl: 'app-carousel.html',
            styleUrls: ['app-carousel.css'],
            animations: [
                core_1.trigger('visibilityTrigger', [
                    core_1.state('show', core_1.style({ opacity: '1', transform: 'translateX(0)' })),
                    core_1.state('hide', core_1.style({ opacity: '0', transform: 'translateX(-100%)' })),
                    core_1.transition('hide => show', core_1.animate('300ms 300ms ease-in, style')),
                    core_1.transition('show => hide', core_1.animate('300ms 0ms ease-out'))
                ])]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], AppCarouselComponent);
    return AppCarouselComponent;
}());
exports.AppCarouselComponent = AppCarouselComponent;
//# sourceMappingURL=app-carousel.js.map
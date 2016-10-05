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
var forms_1 = require('@angular/forms');
var VideoService_1 = require('../../../services/VideoService');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/throttleTime');
require('rxjs/add/operator/switchMap');
var TubesDisplayComponent = (function () {
    function TubesDisplayComponent(renderer, videoService, cdRef) {
        this.renderer = renderer;
        this.videoService = videoService;
        this.cdRef = cdRef;
        this.flyState = 'in';
        this.colors = ['#00A11B', '#BB1D48', '#613DBC', '#2A7EED',
            '#F19F1B', '#3E5B99', '#73B319', '#164344',
            '#E36869', '#531F5D', '#FFD100', '#1A3464',
            '#E44520', '#BB4D82', '#68B0E2', '#8C6D62',
            '#00ABC0', '#5B6ABF'];
        this.searchBox = new forms_1.FormControl();
        this.storedStringName = 'StoredSearchString';
        this.videos = [];
    }
    TubesDisplayComponent.prototype.getBackColor = function (v) {
        var currentIndex = this.videos.indexOf(v);
        var index = currentIndex % this.colors.length;
        return this.colors[index];
    };
    TubesDisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.invokeElementMethod(this.searchInputBox.nativeElement, 'focus');
        // Search Support
        this.subs = this.searchBox.valueChanges
            .map(function (item) { return item; })
            .throttleTime(400).switchMap(function (text) { return _this.videoService.getTubes(text); }).subscribe(function (param) {
            _this.processVideos(param);
            _this.cdRef.detectChanges();
        });
        // Initialize
        var initialSearchString = 'Angular 2';
        var storedString = localStorage.getItem(this.storedStringName);
        // Remember last string searched
        var isValid = storedString !== null && typeof storedString !== "undefined";
        if (isValid) {
            initialSearchString = storedString;
        }
        // Initial Search
        var initSubs = this.videoService.getTubes(initialSearchString).subscribe(function (param) {
            initSubs.unsubscribe();
            _this.processVideos(param);
        });
    };
    TubesDisplayComponent.prototype.processVideos = function (videos) {
        this.videos = [];
        for (var i = 0; i < videos.length; i++) {
            this.videos.push(videos[i]);
        }
    };
    TubesDisplayComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
        localStorage.setItem(this.storedStringName, this.searchBox.value);
    };
    __decorate([
        core_1.ViewChild('searchInputBox'), 
        __metadata('design:type', core_1.ElementRef)
    ], TubesDisplayComponent.prototype, "searchInputBox", void 0);
    TubesDisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tubes-display',
            templateUrl: 'display.html',
            styleUrls: ['display.css'],
            animations: [
                core_1.trigger('flyIn', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(100%)' }),
                        core_1.animate('600ms 100ms')
                    ])
                ])]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, VideoService_1.VideoService, core_1.ChangeDetectorRef])
    ], TubesDisplayComponent);
    return TubesDisplayComponent;
}());
exports.TubesDisplayComponent = TubesDisplayComponent;
//# sourceMappingURL=display.js.map
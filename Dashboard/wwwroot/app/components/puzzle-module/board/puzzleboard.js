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
var TileInfo_1 = require('../../../domain/TileInfo');
var NextMoveHelper_1 = require('./NextMoveHelper');
var BoardUtil_1 = require('./BoardUtil');
var PuzzleBoardComponent = (function () {
    function PuzzleBoardComponent(cdRef) {
        this.cdRef = cdRef;
        this._tiles = [];
        this.flyState = 'in';
        this.emptyBackColor = 'black';
        this.isPlaying = false;
        this.showPuzzleSolvedMessage = false;
        this.movesCounter = 0;
        this.elapsedTime = 0;
        this.formattedTime = "00.00";
        this.colors = ['#00A11B', '#BB1D48', '#613DBC', '#2A7EED',
            '#F19F1B', '#3E5B99', '#73B319', '#164344',
            '#E36869', '#531F5D', '#FFD100', '#1A3464',
            '#E44520', '#BB4D82', '#68B0E2', this.emptyBackColor];
        this.initializeTiles();
        this.nextMoveHelper = new NextMoveHelper_1.NextMoveHelper(this._tiles);
    }
    PuzzleBoardComponent.prototype.initializeTiles = function () {
        for (var i = 0; i < this.colors.length; i++) {
            var t = new TileInfo_1.TileInfo();
            t.backColor = this.colors[i];
            t.visibility = 'visible';
            if (i !== this.colors.length - 1)
                t.tileNumber = (i + 1).toString();
            else {
                t.tileNumber = '';
            }
            this._tiles.push(t);
        }
    };
    PuzzleBoardComponent.prototype.getEmptyTile = function () {
        var _this = this;
        return this._tiles.find(function (t) { return t.backColor === _this.emptyBackColor; });
    };
    PuzzleBoardComponent.prototype.handleStartingSlide = function (tileComponent) {
        if (!this.isPlaying)
            return;
        this.getEmptyTile().visibility = 'hidden';
        if (this.nextMoveHelper.canSlideLeft(tileComponent.tileInfo, this.getEmptyTile())) {
            tileComponent.slideDirection = 'left';
            return;
        }
        if (this.nextMoveHelper.canSlideRight(tileComponent.tileInfo, this.getEmptyTile())) {
            tileComponent.slideDirection = 'right';
            return;
        }
        if (this.nextMoveHelper.canSlideUp(tileComponent.tileInfo, this.getEmptyTile())) {
            tileComponent.slideDirection = 'up';
            return;
        }
        if (this.nextMoveHelper.canSlideDown(tileComponent.tileInfo, this.getEmptyTile())) {
            tileComponent.slideDirection = 'down';
            return;
        }
    };
    PuzzleBoardComponent.prototype.handleEndingSlide = function (ti) {
        if (!this.isPlaying)
            return;
        var emptyTile = this.getEmptyTile();
        emptyTile.backColor = ti.backColor;
        emptyTile.tileNumber = ti.tileNumber;
        emptyTile.visibility = 'visible';
        ti.backColor = this.emptyBackColor;
        ti.tileNumber = '';
        ti.visibility = 'visible';
        this.movesCounter++;
        if (BoardUtil_1.BoardUtil.isPuzzleSolved(this._tiles)) {
            this.endGame();
        }
        this.cdRef.detectChanges();
    };
    PuzzleBoardComponent.prototype.startTimer = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.elapsedTime++;
            _this.formatTime();
        }, 1000);
    };
    PuzzleBoardComponent.prototype.stopTimer = function () {
        clearTimeout(this.timer);
    };
    PuzzleBoardComponent.prototype.startNewGame = function () {
        // Scramble at least once
        BoardUtil_1.BoardUtil.scramble(this._tiles);
        // Get a winning combination
        while (!BoardUtil_1.BoardUtil.isPuzzleSolvable(this._tiles, this.getEmptyTile())) {
            BoardUtil_1.BoardUtil.scramble(this._tiles);
        }
        this.startGame();
        this.cdRef.detectChanges();
    };
    PuzzleBoardComponent.prototype.endGame = function () {
        this.isPlaying = false;
        this.showPuzzleSolvedMessage = true;
        this.stopTimer();
    };
    PuzzleBoardComponent.prototype.startGame = function () {
        // In case user clicks on the start button without finishing the game
        this.endGame();
        this.isPlaying = true;
        this.showPuzzleSolvedMessage = false;
        this.movesCounter = 0;
        this.elapsedTime = 0;
        this.formatTime();
        this.startTimer();
    };
    PuzzleBoardComponent.prototype.formatTime = function () {
        var min = Math.floor(this.elapsedTime / 60);
        var sec = this.elapsedTime - min * 60;
        this.formattedTime = this.getTimeString(min) + '.' + this.getTimeString(sec);
    };
    PuzzleBoardComponent.prototype.getTimeString = function (time) {
        if (time < 10) {
            return '0' + time;
        }
        else if (time < 60) {
            return time.toString();
        }
        return '00';
    };
    PuzzleBoardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'puzzle-board',
            templateUrl: 'puzzleboard.html',
            styleUrls: ['puzzleboard.css'],
            animations: [
                core_1.trigger('flyIn', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(-100%)' }),
                        core_1.animate('300ms 100ms')
                    ])
                ])]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], PuzzleBoardComponent);
    return PuzzleBoardComponent;
}());
exports.PuzzleBoardComponent = PuzzleBoardComponent;
//# sourceMappingURL=puzzleboard.js.map
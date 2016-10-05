import { Component, ChangeDetectorRef, trigger, transition, animate, style, state } from '@angular/core';
import {TileInfo} from '../../../domain/TileInfo';
import {PuzzleTileComponent} from '../tile/puzzletile';
import {NextMoveHelper} from './NextMoveHelper';
import {BoardUtil} from './BoardUtil';

@Component({
    moduleId: module.id,
    selector: 'puzzle-board',
    templateUrl: 'puzzleboard.html',
    styleUrls: ['puzzleboard.css'],
    animations: [
    trigger('flyIn',
        [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate('300ms 100ms')
            ])
        ])]
   })
export class PuzzleBoardComponent {
    public _tiles: Array<TileInfo> = [];
    public flyState: string = 'in';

    private emptyBackColor = 'black';
    private nextMoveHelper;
    private isPlaying: boolean = false;
    private showPuzzleSolvedMessage: boolean = false;
    private movesCounter: number = 0;
    private elapsedTime: number = 0;
    private formattedTime: string = "00.00";
    private timer;
    
    public colors: Array<string> =
    ['#00A11B', '#BB1D48', '#613DBC', '#2A7EED',
     '#F19F1B', '#3E5B99', '#73B319', '#164344',
     '#E36869', '#531F5D', '#FFD100', '#1A3464',
     '#E44520', '#BB4D82', '#68B0E2', this.emptyBackColor];

    constructor(private cdRef: ChangeDetectorRef) {
        this.initializeTiles();
        this.nextMoveHelper = new NextMoveHelper(this._tiles);
    }

    initializeTiles() {
        for (let i = 0; i < this.colors.length; i++) {
            let t = new TileInfo();
            t.backColor = this.colors[i];
            t.visibility = 'visible';

            if (i !== this.colors.length - 1)
                t.tileNumber = (i + 1).toString();
            else {
                t.tileNumber = '';
            }

            this._tiles.push(t);
        }
    }

    getEmptyTile() {
        return this._tiles.find(t => t.backColor === this.emptyBackColor);
    }

    handleStartingSlide(tileComponent: PuzzleTileComponent) {
        if (!this.isPlaying) return;

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
    }

    handleEndingSlide(ti: TileInfo) {
        if (!this.isPlaying) return;

        let emptyTile = this.getEmptyTile();
        emptyTile.backColor = ti.backColor;
        emptyTile.tileNumber = ti.tileNumber;
        emptyTile.visibility = 'visible';

        ti.backColor = this.emptyBackColor;
        ti.tileNumber = '';
        ti.visibility = 'visible';

        this.movesCounter++;
        if (BoardUtil.isPuzzleSolved(this._tiles)) {
            this.endGame();
        }

        this.cdRef.detectChanges();
    }

    startTimer() {
    this.timer = setInterval(() => {
            this.elapsedTime++;
            this.formatTime();
        },
        1000);
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    startNewGame() {

        // Scramble at least once
        BoardUtil.scramble(this._tiles);    

        // Get a winning combination
        while (!BoardUtil.isPuzzleSolvable(this._tiles, this.getEmptyTile())) {
            BoardUtil.scramble(this._tiles);    
        }

        this.startGame();
        this.cdRef.detectChanges();
    }

    endGame() {
        this.isPlaying = false;
        this.showPuzzleSolvedMessage = true;
        this.stopTimer();
    }

    startGame() {
        // In case user clicks on the start button without finishing the game
        this.endGame();

        this.isPlaying = true;
        this.showPuzzleSolvedMessage = false;
        this.movesCounter = 0;

        this.elapsedTime = 0;
        this.formatTime();

        this.startTimer();
    }

    formatTime() {
        let min = Math.floor(this.elapsedTime/60);
        let sec = this.elapsedTime - min * 60;
        this.formattedTime = this.getTimeString(min) + '.' + this.getTimeString(sec);
    }

    getTimeString(time: Number) {
        if (time < 10) {
            return '0' + time;
        } else if (time < 60) {
            return time.toString();
        }
        return '00';
    }
}
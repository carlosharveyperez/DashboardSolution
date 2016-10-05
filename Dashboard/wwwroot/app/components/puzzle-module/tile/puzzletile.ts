import {
    Component, ViewChild, Input, Output, ElementRef, ChangeDetectorRef,
    EventEmitter, trigger, transition, animate, style, state,
} from '@angular/core';

import {TileInfo} from '../../../domain/TileInfo';

@Component({
    moduleId: module.id,
    selector: 'puzzle-tile',
    templateUrl: 'puzzletile.html',
    styleUrls: ['puzzletile.css'],
    animations:
    [
    trigger('slideTrigger',
        [
            transition('none => right',
            [
                style({ transform: 'translateX(0)' }),
                animate('400ms 0ms ease-in-out, style', style({ transform: 'translateX(100%)' }))
            ]),

            transition('none => left',
            [
                style({ transform: 'translateX(0)' }),
                animate('400ms 0ms ease-in-out, style', style({ transform: 'translateX(-100%)' }))
            ]),

            transition('none => up',
            [
                style({ transform: 'translateY(0)' }),
                animate('400ms 0ms ease-in-out, style', style({ transform: 'translateY(-100%)' }))
            ]),

            transition('none => down',
            [
                style({ transform: 'translateY(0)' }),
                animate('400ms 0ms ease-in-out, style', style({ transform: 'translateY(100%)' }))
            ])

        ]),

    trigger('rotateIt',
        [
            state('none', style({ transform: 'rotate(0deg)' })),
            transition('void => *', [
                style({ transform: 'rotate(180deg)' }),
                animate('1200ms 1000ms')
            ])
        ])
    ]   
})
export class PuzzleTileComponent {
    @Input() public tileInfo;
    @Input() public backColor: string;
    @Input() public tileNumber: string;
    @Output() public startingSlide = new EventEmitter();
    @Output() public endingSlide = new EventEmitter();

    public slideDirection: string = 'none';
    public rotationState: string = 'none';

    slideTile() {
        this.startingSlide.next(this);
    }

    onSlideCompleted(event) {
        this.slideDirection = "none";
        if (event.fromState !== 'none') return;
        this.endingSlide.next(this.tileInfo);
    }
}

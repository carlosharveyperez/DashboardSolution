import {
    Component, ViewChild, ElementRef, OnInit, Renderer, ChangeDetectorRef, OnDestroy,
    trigger, transition, animate, style, state
} from '@angular/core';

import { FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { VideoService } from '../../../services/VideoService';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/switchMap';
import {Video} from '../../../domain/Video';

@Component({
    moduleId: module.id,
    selector: 'tubes-display',
    templateUrl: 'display.html',
    styleUrls: ['display.css'],
    animations: [
    trigger('flyIn',
        [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate('600ms 100ms')
            ])
        ])]
})

export class TubesDisplayComponent implements OnInit, OnDestroy {

    public flyState: string = 'in';
    public colors: Array<string> =
    ['#00A11B', '#BB1D48', '#613DBC', '#2A7EED',
     '#F19F1B', '#3E5B99', '#73B319', '#164344',
     '#E36869', '#531F5D', '#FFD100', '#1A3464',
     '#E44520', '#BB4D82', '#68B0E2', '#8C6D62',
     '#00ABC0', '#5B6ABF'];

    @ViewChild('searchInputBox') searchInputBox: ElementRef;
    searchBox = new FormControl();
    private subs: Subscription;
    private searchStream;
    private storedStringName : string = 'StoredSearchString';
    public videos: Array<Video> = [];
    
    constructor(private renderer: Renderer, private videoService: VideoService, private cdRef: ChangeDetectorRef) {
    }

    getBackColor(v: Video) {
        let currentIndex = this.videos.indexOf(v);
        let index = currentIndex % this.colors.length;
        return this.colors[index];
    }

    ngOnInit() {
        
        this.renderer.invokeElementMethod(this.searchInputBox.nativeElement, 'focus');

        // Search Support
        this.subs = this.searchBox.valueChanges
            .map(item => item)
            .throttleTime(400).switchMap(text => this.videoService.getTubes(text)).subscribe((param) => {
                this.processVideos(param);
                this.cdRef.detectChanges();
            });

        // Initialize
        let initialSearchString: string = 'Angular 2';
        let storedString: string = localStorage.getItem(this.storedStringName);

        // Remember last string searched
        let isValid = storedString !== null && typeof storedString !== "undefined";
        if (isValid) {
            initialSearchString = storedString;
        }

        // Initial Search
        let initSubs = this.videoService.getTubes(initialSearchString).subscribe((param) => {
        initSubs.unsubscribe();
        this.processVideos(param);
        });
    }

    processVideos(videos: Array<Video>) {
        this.videos = [];
        for (let i = 0; i < videos.length; i++) {
            this.videos.push(videos[i]);
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
        localStorage.setItem(this.storedStringName, this.searchBox.value);
    }
}
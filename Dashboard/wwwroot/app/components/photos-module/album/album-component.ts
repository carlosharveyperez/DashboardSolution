import { Component, Input, ViewChild, ElementRef, Renderer, ApplicationRef } from '@angular/core';
import { Photo }  from '../../../domain/Photo';
import {ImageInfo} from '../../../domain/ImageInfo';
import {Album} from '../../../domain/Album';
import {ApplicationComponent} from '../../application/application';
declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'album-component',
    templateUrl: 'album-component.html',
    styleUrls: ['album-component.css']
})
export default class AlbumComponent {

    @Input() public album: Album;
    @ViewChild('scroller') scroller: ElementRef;
    @Input() public navigationMode: string;
    doingChanges: boolean = false;

    @Input() public photos: Array<Photo>;
    private app: ApplicationComponent;
        
    constructor(private renderer: Renderer, private appRef: ApplicationRef) {
        this.app = appRef.components[0].instance;
    }

    showCarousel(photo: Photo) {
        let infos: Array<ImageInfo> = new Array<ImageInfo>();
        for (let i = 0; i < this.album.photos.length; i++) {
            let p = this.album.photos[i];
            let ii = new ImageInfo();
            ii.url = p.uri;
            ii.title = p.title;
            infos.push(ii);
        }

        this.app.appCarouselComponent.show(infos, this.album.photos.indexOf(photo), this.album);
    }

    hideCarousel() {
        this.app.appCarouselComponent.hide();
    }

    scrollLeft() {
        let currentWidth = "-=" + this.getScrollerWidth();
        $(this.scroller.nativeElement).animate({'scrollLeft': currentWidth }, 600);
    }

    scrollRight() {
        let currentWidth = "+=" + this.getScrollerWidth();
        $(this.scroller.nativeElement).animate({'scrollLeft': currentWidth}, 600);
    }

    getScrollerWidth(): string {
        return this.scroller.nativeElement.clientWidth;
    }
    
    applyWidth(width: number) {
        let newWidth = (width - 120) + "px";
        this.renderer.setElementStyle(this.scroller.nativeElement, "width", newWidth);
    }
}
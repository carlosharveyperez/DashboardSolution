import {
    Component, ViewChild, ElementRef, Renderer,
    trigger, transition, animate, style, state,
} from '@angular/core';

import {Modal} from 'ng2-modal';
import {ImageInfo} from '../../domain/ImageInfo';
import {Album} from '../../domain/Album';

@Component({
    moduleId: module.id,
    selector: 'application-carousel',
    templateUrl: 'app-carousel.html',
    styleUrls: ['app-carousel.css'],
    animations: [
        trigger('visibilityTrigger', [
            state('show', style({ opacity: '1', transform: 'translateX(0)'})),
            state('hide', style({ opacity: '0', transform: 'translateX(-100%)' })),
            transition('hide => show', animate('300ms 300ms ease-in, style')),
            transition('show => hide', animate('300ms 0ms ease-out'))
        ])]
})
export class AppCarouselComponent {
    @ViewChild('carouselRoot') carouselRoot: ElementRef;

    public imageInfos: Array<ImageInfo>;
    public selectedIndex: number;
    public visibility: string = 'hide';
    public album: Album;
    
    constructor(private renderer: Renderer) {
    }

    onImageLoad(image, info: ImageInfo) {
        let carouselHeight = this.getIdealDimensionAsNumber();
        let carouselWidth = carouselHeight;

        if (image.height <= carouselHeight && image.width <= carouselWidth) {
            // Just center image vertically
            let margin = (carouselHeight - image.height) / 2 + 'px';
            this.renderer.setElementStyle(image, "margin-top", margin);
        } else {
            // Preserver image aspect ratio
            let preservedRatioHeight = (carouselWidth * image.height) / image.width;
            let margin = (carouselHeight - preservedRatioHeight)/2;
            if (margin > 0) {
                this.renderer.setElementStyle(image, "margin-top", margin + 'px');
            } else {
                this.renderer.setElementStyle(image, "margin-top", '0px');
            }    
        }
    }

    getIdealDimensionAsNumber() {
        let height = window.innerHeight - 100;
        let width = window.innerWidth - 100;
        let result = Math.min(width, height);
        return result;
    }

    getIdealDimension() {
        let result = this.getIdealDimensionAsNumber();
        let resultAsString = result + 'px';
        return resultAsString;
    }

    show(infos: Array<ImageInfo>, index: number, album: Album) {
        this.selectedIndex = index;
        this.album = album;
        
        // Ensure scrollbars are taken out.
        this.imageInfos = infos;
        document.body.className += "modal-open";
        this.renderer.setElementStyle(this.carouselRoot.nativeElement, "display", "flex");
        this.renderer.invokeElementMethod(this.carouselRoot.nativeElement, "focus");
        this.visibility = 'show';
    }

    hide() {
        // Actual hiding after animation is done.
        this.visibility = 'hide';
    }

    onVisibilityAnimationCompleted(event: any) {
        if (event.toState === 'show') return;

        // Reset class value that was previously added
        document.body.className = document.body.className.replace("modal-open", "");
        this.renderer.setElementStyle(this.carouselRoot.nativeElement, "display", "none");
    }

    onKeyUp(event: any) {
        if ( event.key === "Escape") this.hide();
    }
}
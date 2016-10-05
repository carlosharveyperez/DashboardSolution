import { Component, ViewChild, ElementRef, Renderer} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'waiting-animation',
    templateUrl: 'waiting-component.html',
    styleUrls: ['waiting-component.css']
})
export class WaitingComponent {

    @ViewChild('rootElement') root: ElementRef;

    constructor( private renderer: Renderer) {
    }

    startWaiting() {
        this.renderer.setElementStyle(this.root.nativeElement, "display", 'flex');
    }

    endWaiting() {

        // Adding extra time just for demo purpose, will remove later
        window.setTimeout( () => { this.hideCore(); } , 1000);
    }

    hideCore() {
        this.renderer.setElementStyle(this.root.nativeElement, "display", 'none'); 
    }
}
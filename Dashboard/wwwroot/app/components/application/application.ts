import { Component, ViewChild } from '@angular/core';
import {AppDialogComponent} from './app-dialog';
import {WaitingComponent} from './waiting-component';
import {AppCarouselComponent} from './app-carousel';

@Component({
    moduleId: module.id,
    selector: 'dashboard-application',
    templateUrl: 'application.html',
    styleUrls: ['application.css']
})
export class ApplicationComponent {
    @ViewChild(AppDialogComponent) public appDialogComponent: AppDialogComponent;
    @ViewChild(WaitingComponent) public appWaitingComponent: WaitingComponent;
    @ViewChild(AppCarouselComponent) public appCarouselComponent: AppCarouselComponent;
}
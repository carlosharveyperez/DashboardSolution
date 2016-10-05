import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'application-links',
    templateUrl: 'application-links.html',
    styleUrls: ['application-links.css']
})
export class ApplicationLinksComponent {
    constructor(private router: Router) {
        
    }
}
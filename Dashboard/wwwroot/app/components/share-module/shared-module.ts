import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {ApplicationLinksComponent} from './application-links/application-links';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ApplicationLinksComponent],
    exports: [ApplicationLinksComponent]
})
export default class SharedModule { }
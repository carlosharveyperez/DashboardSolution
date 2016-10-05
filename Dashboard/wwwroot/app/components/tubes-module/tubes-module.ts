import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import TubesComponent from './tubes/tubes';
import { tubesRouting } from './tubes-module-routing';
import SharedModule from '../share-module/shared-module';
import {TubesDisplayComponent} from './display/display';
import {VideoService} from '../../services/VideoService';
import VideoComponent from './video/video';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, tubesRouting, SharedModule],
    providers: [VideoService],
    declarations: [TubesComponent, TubesDisplayComponent, VideoComponent]
})
export default class TubesModule { }
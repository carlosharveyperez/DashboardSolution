import { Component, Input } from '@angular/core';
import {Video} from '../../../domain/Video';

@Component({
    moduleId: module.id,
    selector: 'video-tube',
    templateUrl: 'video.html',
    styleUrls: ['video.css']
})
export default class VideoComponent {

    private prefixUrl = 'https://www.youtube.com/embed/';
    private postfixUrl = '?autoplay=1';
    private youTubeUrl: string;

    @Input() public video: Video;
    @Input() public backColor: string;

    playVideo() {
        let id = this.video.videoId;
        let finalUrl = this.prefixUrl + id + this.postfixUrl;
        window.location.href = finalUrl;
    }
}
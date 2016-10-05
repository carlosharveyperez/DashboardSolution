import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Video} from '../domain/Video';
import {VideoThumbnail} from '../domain/VideoThumbnail';

@Injectable()
export class VideoService {

    private apiUrl: string = 'https://www.googleapis.com/youtube/v3/search?';
    
    constructor(private http: Http) {
        
    }

    getTubes(search: string): Observable<Array<Video>> {
        let part = 'part=snippet';
        let query = '&q=' + search;
        let type = '&type=video';
        let maxResults = '&maxResults=50';
        var apiKey = '&key=AIzaSyCmr08yPHidv9sMNQXGt0aTmixwXb7m1qc';

        let url = this.apiUrl + part + query + type + maxResults + apiKey;
        return this.http.get(url).map(resp => this.mapResponse(resp));
    }

    private mapResponse(resp: Response) {
        let list = resp.json();
        let videos : Array<Video> = [];

        for (let i = 0; i < list.items.length; i++) {
            let item = list.items[i];

            let v = new Video();
            let snippet = item.snippet;
            v.videoId = item.id.videoId;
            v.title = snippet.title;
            v.description = snippet.description;
            v.thumbnail = <VideoThumbnail>snippet.thumbnails.medium;
            videos.push(v);
        }

        return videos;
    }
}
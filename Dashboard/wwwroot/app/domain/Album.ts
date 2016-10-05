import {Photo} from './Photo';

export class Album {
    id: number;
    title: string;
    description: string;
    dateCreated: string;
    owner: string;
    photos: Array<Photo>;
}

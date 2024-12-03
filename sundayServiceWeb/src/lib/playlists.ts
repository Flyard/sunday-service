import axios from 'axios';

import Song from '../lib/interfaces.ts';
const api_url = "http://localhost:3000/solfas/"
export default class Playlists {
    title: string;
    songs: Song[];

    static initPlaylists():void {
        localStorage.setItem('playlists', JSON.stringify([]))
    }
     static getPlaylists(): Song[] {
        let playlists:string = localStorage.getItem('playlists');
        if(!playlists) {
            this.initPlaylists();
            return [];
        }
        try {
            return JSON.parse(playlists)
        } catch {
            return []
        }
    }

    static isEmpty():boolean {
        const playlists: Song[] = this.getPlaylists()
        return playlists.length === 0;
    }

    static async addToPlaylist(song:Song):Promise<any> {
        const currentStorage:string = localStorage.getItem('playlists');
        const currentStorageArr = JSON.parse(currentStorage);
        const arr = JSON.parse(currentStorage);

        const getInfo:() => Promise<Song> = async ():Promise<Song> => {
            const data = await axios.get(`${api_url}?category=${song.category.toLowerCase()}&number=${song.number}`)
            return await data.data
        }

        currentStorageArr.push(await getInfo());
        localStorage.setItem('playlists', JSON.stringify(currentStorageArr));
    }

    static checkExistence(song: Song):boolean {
        const currentStorage:string = localStorage.getItem('playlists');
        const currentStorageObject = JSON.parse(currentStorage);

        const keys:string[] = Object.keys(currentStorageObject);
        const values = Object.values(currentStorageObject);
        return (keys.includes(song.category) && values.includes(song.number) )
    }



}




import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient,
  ) {
    console.log('Spotify service ready');
   }

   getQuery(query: string ) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAaZOyW4qe-XNaQdTrb-UmiQ0Z98yN0D32ki-ZbdyoymjE2gtFoIWFyoRwi0iZ-vch4Uo8uHjG5V9u0Fvs'
    });

    return this.http.get(url, {headers});
   }

   getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(map ((data:any) => data.albums.items));
   }

   getArtistas( termino: string ) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map ((data:any) => data.artists.items));
   }

   getArtista( id: string ) {
    return this.getQuery(`artists/${id}`);
    // .pipe(map ((data:any) => data.artists.items));
   }
}
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
      'Authorization': 'Bearer BQCyot8gmLL9SKCAKuilK9sk-e23ifbFVkZM_XJ32qBI9lOUwVZzBhTtUDP-NXjPGjOi6-hzy3x1cZxD1qM'
    });

    return this.http.get(url, {headers});
   }

   getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(map ((data:any) => data.albums.items));
   }

   getArtist( termino: string ) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map ((data:any) => data.artists.items));
   }
}
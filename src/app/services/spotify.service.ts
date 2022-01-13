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
      'Authorization': 'Bearer BQAj3c3AJBYLu2K5iXShxUajy7E3m899Iqr2txoF5tkvBhyNTD1VdxtgdbhJQlG4x6j51ehUsapPtK49avw'
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

   getTopTracks( id: string ) {
    return this.getQuery(`artists/${id}/top-tracks?market=us`)
    .pipe(map ((data:any) => data.tracks));
   }
}
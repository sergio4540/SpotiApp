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

   getNewReleases() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD0Vs5pzsxUp0YWSOcvQPQYPV5RXziysEBiymrf_l02T1YLv54sscmfbDF-auubrf62sBUJx7hnfyJoNPA'
    });
      return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers}).pipe(map((data:any) => {
        return data.albums.items;
      }));
   }

   getArtist( termino: string ){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD0Vs5pzsxUp0YWSOcvQPQYPV5RXziysEBiymrf_l02T1YLv54sscmfbDF-auubrf62sBUJx7hnfyJoNPA'
    });
      return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers}).pipe(map ((data:any) => data.artists.items));
   }
}

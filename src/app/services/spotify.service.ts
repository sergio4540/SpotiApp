import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token:string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.getToken().subscribe(resp => {
      this.token = resp;
      // console.log(this.token);
    });
   }

   getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let parametrosBody = new HttpParams()
          .set('grant_type', 'client_credentials')
          .set('client_id', '2521f0d038c24ffebc58afbec71ed7e8')
          .set('client_secret', 'a0c3a282c261499e9e1f5dc9a00bf880');
          
    return this.http.post('https://accounts.spotify.com/api/token', parametrosBody, {headers}).pipe(map((resp: any) =>{
      return `Bearer ${resp.access_token}`;
    }));
   }

   getQuery(query: string ) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get(url, {headers});
   }

  //  getQuery(query: string ) {
  //   const url = `https://api.spotify.com/v1/${query}`;

  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer BQAj3c3AJBYLu2K5iXShxUajy7E3m899Iqr2txoF5tkvBhyNTD1VdxtgdbhJQlG4x6j51ehUsapPtK49avw'
  //   });

  //   return this.http.get(url, {headers});
  //  }

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
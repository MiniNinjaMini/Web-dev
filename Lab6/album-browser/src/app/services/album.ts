import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, timeout, catchError } from 'rxjs';
import { of } from 'rxjs';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
    console.log('✓ AlbumService initialized');
    console.log('✓ Base URL:', this.baseUrl);
    console.log('✓ HttpClient injected:', !!http);
  }

  getAlbums(): Observable<Album[]> {
    const url = `${this.baseUrl}/albums`;
    console.log('📤 [REQUEST] GET', url);
    return this.http.get<Album[]>(url).pipe(
      timeout(10000),
      catchError((err) => {
        console.error('❌ [RESPONSE] Failed:', err);
        throw err;
      })
    );
  }

  getAlbum(id: number): Observable<Album> {
    const url = `${this.baseUrl}/albums/${id}`;
    console.log('📤 [REQUEST] GET', url);
    return this.http.get<Album>(url).pipe(
      timeout(10000),
      catchError((err) => {
        console.error('❌ [RESPONSE] Failed:', err);
        throw err;
      })
    );
  }

  getAlbumPhotos(id: number): Observable<Photo[]> {
    const url = `${this.baseUrl}/albums/${id}/photos`;
    console.log('📤 [REQUEST] GET', url);
    return this.http.get<Photo[]>(url).pipe(
      timeout(10000),
      catchError((err) => {
        console.error('❌ [RESPONSE] Failed:', err);
        throw err;
      })
    );
  }

  updateAlbum(album: Album): Observable<Album> {
    const url = `${this.baseUrl}/albums/${album.id}`;
    console.log('📤 [REQUEST] PUT', url, 'body:', album);
    return this.http.put<Album>(url, album).pipe(
      timeout(10000),
      catchError((err) => {
        console.error('❌ [RESPONSE] Failed:', err);
        throw err;
      })
    );
  }

  deleteAlbum(id: number): Observable<void> {
    const url = `${this.baseUrl}/albums/${id}`;
    console.log('📤 [REQUEST] DELETE', url);
    return this.http.delete<void>(url).pipe(
      timeout(10000),
      catchError((err) => {
        console.error('❌ [RESPONSE] Failed:', err);
        throw err;
      })
    );
  }
}

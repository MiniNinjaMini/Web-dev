import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Для *ngIf и *ngFor (в новом синтаксисе @if, @for)
import { RouterModule } from '@angular/router';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private albumService: AlbumService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    console.log('📡 AlbumsComponent: Fetching albums...');
    const startTime = performance.now();

    this.albumService.getAlbums().subscribe({
      next: (data) => {
        const endTime = performance.now();
        console.log(`✓ AlbumsComponent: Fetched ${data?.length || 0} albums (${(endTime - startTime).toFixed(2)}ms)`);
        console.log('Albums data:', data);
        this.albums = data || [];
        this.isLoading = false;
        this.errorMessage = null;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        const endTime = performance.now();
        console.error('❌ AlbumsComponent: Error fetching albums after', (endTime - startTime).toFixed(2), 'ms');
        console.error('Error details:', err);
        console.error('Status:', err?.status);
        console.error('Message:', err?.message);
        console.error('URL:', err?.url);
        this.isLoading = false;
        this.errorMessage = `Error: ${err?.status || 'Network'} - ${err?.message || 'Cannot reach API'}`;
        this.albums = [];
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('✓ AlbumsComponent: Request completed');
      }
    });
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter(a => a.id !== id);
    this.albumService.deleteAlbum(id).subscribe({
      error: (err) => {
        console.error('AlbumsComponent: Error deleting album', id, err);
      }
    });
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-photos.html',
  styleUrls: ['./album-photos.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  albumId!: number;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(`📡 AlbumPhotosComponent: Loading photos for album ${this.albumId}`);
    const startTime = performance.now();

    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        const endTime = performance.now();
        console.log(`✓ AlbumPhotosComponent: Loaded ${data?.length || 0} photos (${(endTime - startTime).toFixed(2)}ms)`, data);
        this.photos = data || [];
        this.loading = false;
        this.errorMessage = null;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        const endTime = performance.now();
        console.error(`✗ AlbumPhotosComponent: Error loading photos after ${(endTime - startTime).toFixed(2)}ms`, err);
        console.error('Error status:', err?.status);
        console.error('Error message:', err?.message);
        this.loading = false;
        this.errorMessage = `Error: ${err?.status || 'Network'} - ${err?.message || 'Cannot reach API'}`;
        this.photos = [];
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }
}

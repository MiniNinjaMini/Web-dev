import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './album-detail.html',
  styleUrls: ['./album-detail.css']
})
export class AlbumDetailComponent implements OnInit {
  album!: Album;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(`📡 AlbumDetailComponent: Loading album ${id}`);
    const startTime = performance.now();

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        const endTime = performance.now();
        console.log(`✓ AlbumDetailComponent: Loaded album (${(endTime - startTime).toFixed(2)}ms)`, data);
        this.album = data;
        this.loading = false;
        this.errorMessage = null;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        const endTime = performance.now();
        console.error(`❌ AlbumDetailComponent: Error loading album ${id} after ${(endTime - startTime).toFixed(2)}ms`, err);
        this.loading = false;
        this.errorMessage = `Error: ${err?.status || 'Network'} - ${err?.message || 'Cannot reach API'}`;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }

  saveTitle(): void {
    console.log('AlbumDetailComponent: Saving album title');
    this.albumService.updateAlbum(this.album).subscribe({
      next: () => {
        console.log('AlbumDetailComponent: Title updated successfully');
        alert('Title updated successfully!');
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('AlbumDetailComponent: Error updating title', err);
        alert('Failed to update title: ' + (err?.message || err?.status || 'Unknown error'));
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/albums']);
}
}

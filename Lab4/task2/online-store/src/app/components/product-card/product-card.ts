import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;
  @Output() remove = new EventEmitter<number>();

  currentImageIndex = 0;

  removeThis(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (!this.product) return;
    this.remove.emit(this.product.id);
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  openLink() {
    if (!this.product || !this.product.link) return;
    console.log('product-card.openLink', this.product.link);
    try {
      const newWin = window.open(this.product.link, '_blank');
      if (!newWin) {
        // popup blocked — fallback to same-tab navigation
        window.location.href = this.product.link;
      }
    } catch (e) {
      // final fallback
      window.location.href = this.product.link;
    }
  }

  shareWhatsApp(event?: MouseEvent) {
    if (event) event.stopPropagation();
    const message = `Посмотри, какой товар я нашел: ${this.product.link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }

  shareTelegram(event?: MouseEvent) {
    if (event) event.stopPropagation();
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
  }

  incrementLikes(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (!this.product) return;
    this.product.likes = (this.product.likes || 0) + 1;
  }
}

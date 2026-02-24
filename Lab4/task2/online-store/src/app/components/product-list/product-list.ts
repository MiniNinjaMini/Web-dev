import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  removeItem(productId: number) {
  this.products = this.products.filter(item => item.id !== productId);
}
  @Output() removeProductEvent = new EventEmitter<number>();
  onItemRemove(id: number) {
    this.removeProductEvent.emit(id); // Пробрасываем ID выше в AppComponent
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css']
})
export class ProductItem {
  @Input() product!: Product;
  @Output() remove = new EventEmitter<number>();

  removeMe() {
    this.remove.emit(this.product.id);
  }
}

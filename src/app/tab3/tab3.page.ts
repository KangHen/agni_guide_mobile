import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Product } from '../pages/product-buy/product.type';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    ProductCardComponent,
    NotFoundComponent
  ],
})
export class Tab3Page implements OnInit {
  products = signal<Product[]>([]);

  constructor() {}

  ngOnInit() {
    this.products.set([
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description of product 1',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'Description of product 2',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 300,
        description: 'Description of product 3',
        image: 'https://via.placeholder.com/150',
      },
    ]);
  }
}

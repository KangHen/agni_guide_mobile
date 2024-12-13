import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Product } from '../pages/product-buy/product.type';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService } from '../pages/product-buy/product.service';
import { HelperService } from '../services/helper.service';

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
  protected nav = inject(NavController)

  helperService = inject(HelperService);
  productService = inject(ProductService);

  products = signal<Product[]>([]);
  lastPage = signal<number>(1);
  page = signal<number>(1);
  limit: number = 10;
  isLoading = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data, meta } = await this.productService.all();

      if (data.length > 0) {
        this.products.set(data);
        this.lastPage.set(meta?.last_page ?? 1);
      }

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  detail(event: number) {
    this.nav.navigateForward('/product-buy/' + event);
  }
}

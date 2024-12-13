import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonContent, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFooter, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoWhatsapp, chevronForwardCircle, arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { Product } from './product.type';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.page.html',
  styleUrls: ['./product-buy.page.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    IonButton, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonCardHeader, 
    IonCard, 
    IonRow, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonFooter,
    IonFab,
    IonFabButton,
    CommonModule, 
    CurrencyPipe
  ]
})
export class ProductBuyPage implements OnInit {
  protected nav = inject(NavController);
  protected actvatedRoute = inject(ActivatedRoute);

  helperService = inject(HelperService);
  productService = inject(ProductService);

  product = signal<Product|null>(null);
  id = signal<number>(0);
  images = signal<string[]>([]);

  constructor() {
    this.id.set(this.actvatedRoute.snapshot.params['id'] ?? 0);

    addIcons({
      chevronForwardCircle,
      logoWhatsapp, 
      arrowBackOutline
    });
  }

  ngOnInit() {
    if (this.id() < 1) {
      this.nav.back();
    }

    this.getProduct();
  }

  async getProduct(): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.productService.show(this.id());
      this.product.set(data);

      const images = JSON.parse(data.images || '[]');
      const parseImages: string[] = images.map((image: string) => this.helperService.getImage(`products/${image}`));
      
      this.images.set(parseImages);

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  back() {
    this.nav.back();
  }
}

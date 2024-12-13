import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { baseballOutline, basketOutline } from 'ionicons/icons';
import { Product } from 'src/app/pages/product-buy/product.type';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, CurrencyPipe]
})
export class ProductCardComponent  implements OnInit {
  product = input<Product>();
  clicked = output<number>();

  helperService = inject(HelperService);

  image = signal<string>('https://ionicframework.com/docs/img/demos/card-media.png');

  constructor() {
    addIcons({basketOutline,baseballOutline});
  }

  ngOnInit() {
    const images = JSON.parse(this.product()?.images || '[]');
    const firstImage = images[0];
    if (firstImage) {
      this.image.update(value => value = this.helperService.getImage(`products/sm-${firstImage}`));

      console.log(this.image());
    }
  }

  detail(): void {
    this.clicked.emit(this.product()?.id as number);
  }
}

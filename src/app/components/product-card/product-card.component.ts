import { Component, input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { baseballOutline, basketOutline } from 'ionicons/icons';
import { Product } from 'src/app/pages/product-buy/product.type';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class ProductCardComponent  implements OnInit {
  product = input<Product>();

  constructor() {
    addIcons({basketOutline,baseballOutline});
  }

  ngOnInit() {}

}

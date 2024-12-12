import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFooter, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoWhatsapp, chevronForwardCircle, arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';


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
    FormsModule
  ]
})
export class ProductBuyPage implements OnInit {
  protected nav = inject(NavController)

  constructor() {
    addIcons({chevronForwardCircle,logoWhatsapp, arrowBackOutline});
  }

  ngOnInit() {
  }

  back() {
    this.nav.back();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-historic-site-show',
  templateUrl: './historic-site-show.page.html',
  styleUrls: ['./historic-site-show.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonFabButton, IonFab, IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonCard,  IonContent, CommonModule, FormsModule]
})
export class HistoricSiteShowPage implements OnInit {
  protected nav = inject(NavController);

  constructor() {
    addIcons({arrowBackOutline});
  }

  ngOnInit() {
  }

  back() {
    this.nav.back();
  }
}

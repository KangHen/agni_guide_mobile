import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-splash-third',
  templateUrl: './splash-third.page.html',
  styleUrls: ['./splash-third.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonCol, IonRow, IonGrid, IonContent, CommonModule, FormsModule]
})
export class SplashThirdPage implements OnInit {
  protected nav = inject(NavController)
  constructor() { }

  ngOnInit() {
  }

  async next(): Promise<void> {
    await Preferences.set({ key: 'isFirstLaunch', value: 'false' });
    this.nav.navigateRoot('/');
  }
}

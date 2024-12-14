import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRow, IonCol, IonGrid, IonImg, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-splash-second',
  templateUrl: './splash-second.page.html',
  styleUrls: ['./splash-second.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonGrid, IonCol, IonRow, IonContent,  CommonModule, FormsModule, RouterLink]
})
export class SplashSecondPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

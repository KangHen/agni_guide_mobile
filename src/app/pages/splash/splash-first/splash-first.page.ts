import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg, IonGrid, IonRow, IonCol, IonButton} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-splash-first',
  templateUrl: './splash-first.page.html',
  styleUrls: ['./splash-first.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonRow, IonGrid, IonImg, IonContent, CommonModule, FormsModule, RouterLink]
})
export class SplashFirstPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

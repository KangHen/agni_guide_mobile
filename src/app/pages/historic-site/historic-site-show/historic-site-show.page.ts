import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-historic-site-show',
  templateUrl: './historic-site-show.page.html',
  styleUrls: ['./historic-site-show.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoricSiteShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

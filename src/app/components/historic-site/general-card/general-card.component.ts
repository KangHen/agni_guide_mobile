import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-general-card',
  templateUrl: './general-card.component.html',
  styleUrls: ['./general-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class GeneralCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

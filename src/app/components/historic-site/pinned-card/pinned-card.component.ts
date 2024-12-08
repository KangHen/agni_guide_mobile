import { Component, input, OnInit, output } from '@angular/core';
import { IonCard, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pinned-card',
  templateUrl: './pinned-card.component.html',
  styleUrls: ['./pinned-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardTitle,
    IonCardContent
  ]
})
export class PinnedCardComponent  implements OnInit {
  historicSite = input<any>();
  clicked = output<number>();

  constructor() { }

  ngOnInit() {}

}

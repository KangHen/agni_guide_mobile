import { Component, input, OnInit, output } from '@angular/core';
import { IonCard, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-popular-card',
  templateUrl: './popular-card.component.html',
  styleUrls: ['./popular-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardTitle, IonCardContent]
})
export class PopularCardComponent  implements OnInit {
  historicSite = input<any>();
  clicked = output<number>();

  constructor() { }

  ngOnInit() {}

}

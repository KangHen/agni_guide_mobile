import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { IonCard, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { HistoricSite } from 'src/app/pages/historic-site/historic-site.type';
import { HelperService } from 'src/app/services/helper.service';

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
  item = input<HistoricSite>();
  clicked = output<number>();

  helperService = inject(HelperService);
  
  image = signal<string>('https://ionicframework.com/docs/img/demos/card-media.png');

  constructor() { }

  ngOnInit() {
    if (this.item()?.images) {
      const images = JSON.parse(this.item()?.images || '[]');
      const parseImages: string[] = images.map((image: string) => this.helperService.getImage(`${image}`));
      this.image.set(parseImages[0]);
    }
  }

  detail(): void {
    this.clicked.emit(this.item()?.id as number);
  }
}

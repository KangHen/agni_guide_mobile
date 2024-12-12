import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { News } from 'src/app/pages/read-news/news.type';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  imports: [
    IonCol, 
    IonRow, 
    IonGrid, 
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    DatePipe
  ],
  standalone: true
})
export class NewsCardComponent  implements OnInit {
  news = input<News>()
  clicked = output<string>()

  helperService = inject(HelperService);

  image = signal<string>('https://ionicframework.com/docs/img/demos/card-media.png');
  
  constructor() { }

  ngOnInit() {
    if (this.news()) {
      this.image.update(value => value = this.helperService.getSmallImage(this.news()?.image as string));
    }
  }

  detail(): void {
    this.clicked.emit(this.news()?.slug as string);
  }
}

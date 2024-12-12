import { Component, input, OnInit, output } from '@angular/core';
import { News } from 'src/app/pages/read-news/news.type';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';

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
  ],
  standalone: true
})
export class NewsCardComponent  implements OnInit {
  news = input<News>()
  clicked = output<number>()

  constructor() { }

  ngOnInit() {}

  detail(): void {
    this.clicked.emit(1);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { News } from '../pages/read-news/news.type';
import { NewsCardComponent } from '../components/news-card/news-card.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonRow, 
    IonCol, 
    IonGrid,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    NewsCardComponent,
    NotFoundComponent
  ]
})
export class Tab2Page implements OnInit {
  items = signal<News[]>([]);

  constructor() {}

  ngOnInit() {
    
  }

  readNews(id: number) {
    console.log('Read News', id);
  }
}

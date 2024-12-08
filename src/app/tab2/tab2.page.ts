import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { News } from '../pages/read-news/news.type';
import { NewsCardComponent } from '../components/news-card/news-card.component';

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
    NewsCardComponent
  ]
})
export class Tab2Page implements OnInit {
  items = signal<News[]>([]);

  constructor() {}

  ngOnInit() {
    this.items.set([
      {
        id: 1,
        title: 'First News',
        content: 'This is the first news',
        image: 'https://via.placeholder.com/150',
        read_count: 0,
        user_id: 1,
        created_at: '2021-01-01',
        updated_at: '2021-01-01'
      },
      {
        id: 2,
        title: 'Second News',
        content: 'This is the second news',
        image: 'https://via.placeholder.com/150',
        read_count: 0,
        user_id: 1,
        created_at: '2021-01-01',
        updated_at: '2021-01-01'
      },
      {
        id: 3,
        title: 'Third News',
        content: 'This is the third news',
        image: 'https://via.placeholder.com/150',
        read_count: 0,
        user_id: 1,
        created_at: '2021-01-01',
        updated_at: '2021-01-01'
      }
    ])
  }

  readNews(id: number) {
    console.log('Read News', id);
  }
}

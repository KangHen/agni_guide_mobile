import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { News } from '../pages/read-news/news.type';
import { NewsCardComponent } from '../components/news-card/news-card.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { NavController } from '@ionic/angular';

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
  protected nav = inject(NavController);
  items = signal<News[]>([]);

  constructor() {}

  ngOnInit() {
    this.items.set([
      {
        id: 1,
        content: '',
        image: '',
        read_count: 1,
        title: '',
        created_at: '',
        updated_at: '',
        user_id: 1
      }
    ])
  }

  readNews(id: number) {
    this.nav.navigateForward(['read-news', id]);
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { News } from '../pages/read-news/news.type';
import { NewsCardComponent } from '../components/news-card/news-card.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { NavController } from '@ionic/angular';
import { NewsService } from '../pages/read-news/news.service';
import { HelperService } from '../services/helper.service';

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
  helperService = inject(HelperService);
  newsService = inject(NewsService);

  items = signal<News[]>([]);

  constructor() {}

  ngOnInit() {
    this.getNews();
  }

  async getNews(): Promise<void> {
    const loading = await this.helperService.presentLoading();
    try {
      const { data } = await this.newsService.all();
      loading.dismiss();
      
      if (data.length > 0) {
        this.items.set(data);
      }
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  readNews(slug: string) {
    this.nav.navigateForward(['read-news', slug]);
  }
}

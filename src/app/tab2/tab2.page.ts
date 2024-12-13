import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { News } from '../pages/read-news/news.type';
import { NewsCardComponent } from '../components/news-card/news-card.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { NavController } from '@ionic/angular';
import { NewsService } from '../pages/read-news/news.service';
import { HelperService } from '../services/helper.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, 
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

  page = signal<number>(1);
  lastPage = signal<number>(1);
  items = signal<News[]>([]);
  isComplete = signal<boolean>(false);

  limit: number = 10;

  constructor() {}

  ngOnInit() {
    this.getNews();
  }

  async getNews(): Promise<void> {
    const loading = await this.helperService.presentLoading();
    try {
      const { data, meta } = await this.newsService.all({ page: this.page(), limit: this.limit });
      loading.dismiss();
      
      if (data.length > 0) {
        this.items.set(data);
        this.lastPage.set(meta?.last_page ?? 1);
      }
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

 async onIonInfinite(ev: any): Promise<void> {
    this.page.update(value => value + 1);

    if (this.page() > this.lastPage()) {
      this.isComplete.update(value => value = true);

      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
      return;
    }

    try {
      const { data } = await this.newsService.all({ page: this.page(), limit: this.limit });
      this.items.update(value => [...value, ...data]);
    } catch (error: any) {
      this.helperService.presentError(error?.message);
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  readNews(slug: string) {
    this.nav.navigateForward(['read-news', slug]);
  }
}

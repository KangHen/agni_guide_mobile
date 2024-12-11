import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { News } from './news.type';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { NewsService } from './news.service';

@Component({
  selector: 'app-read-news',
  templateUrl: './read-news.page.html',
  styleUrls: ['./read-news.page.scss'],
  standalone: true,
  imports: [IonImg, 
    IonContent, 
    IonHeader, 
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    NotFoundComponent
  ]
})
export class ReadNewsPage implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected nav = inject(NavController);

  newsServicwe = inject(NewsService);

  id = signal<number>(0);
  news = signal<News|null>(null);

  isLoading = signal<boolean>(false);

  constructor() {
    addIcons({arrowBackOutline});
    this.id.set(this.activatedRoute.snapshot.params['id'] ?? 0);
  }

  ngOnInit() {
    if (this.id() < 1) {
      this.back();
    }
  }

  async getNews(): Promise<void> {
    this.isLoading.set(true);
    const { data } = await this.newsServicwe.show(this.id());
    this.isLoading.set(false);
    
    if (data) {
      this.news.set(data);
    }
  }

  back() {
    this.nav.back();
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonText } from '@ionic/angular/standalone';
import { News } from './news.type';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { NewsService } from './news.service';
import { DatePipe } from '@angular/common';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-read-news',
  templateUrl: './read-news.page.html',
  styleUrls: ['./read-news.page.scss'],
  standalone: true,
  imports: [IonText, IonChip,
    IonImg, 
    IonContent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    NotFoundComponent,
    DatePipe
  ]
})
export class ReadNewsPage implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected nav = inject(NavController);

  newsServicwe = inject(NewsService);
  helperService = inject(HelperService);

  slug = signal<string>('');
  news = signal<News|null>(null);
  image = signal<string>('');

  constructor() {
    addIcons({arrowBackOutline});
    this.slug.set(this.activatedRoute.snapshot.params['id'] ?? '');
  }

  ngOnInit() {
    if (!this.slug()) {
      this.back();
    }

    this.getNews();
  }

  async getNews(): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.newsServicwe.show(this.slug());

      loading.dismiss();    
      if (data) {
        this.news.set(data);
        this.image.update(value => value = this.helperService.getImage(data.image as string));
      }
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  back() {
    this.nav.back();
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon, IonButton, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { navigateOutline, arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { HistoricSiteService } from '../historic-site.service';
import { HistoricSite } from '../historic-site.type';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { IonicSlides } from '@ionic/core';

@Component({
  selector: 'app-historic-site-show',
  templateUrl: './historic-site-show.page.html',
  styleUrls: ['./historic-site-show.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonFooter, IonButton, IonIcon, IonFabButton, IonFab, IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonCard,  IonContent, CommonModule, FormsModule]
})
export class HistoricSiteShowPage implements OnInit {
  protected nav = inject(NavController);
  protected activatedRoute = inject(ActivatedRoute);

  swiperModules = [IonicSlides];

  helperService = inject(HelperService);
  historicSiteService = inject(HistoricSiteService);
  
  id = signal<number>(0);
  historicSite = signal<HistoricSite|null>(null);

  images = signal<string[]>([]);
  startLatitude = signal<number>(0);
  startLongitude = signal<number>(0);
  lat = signal<number>(0);
  lng = signal<number>(0);

  constructor() {
    addIcons({arrowBackOutline,navigateOutline});

    this.id.set(this.activatedRoute.snapshot.params['id'] ?? 0);
  }

  ngOnInit() {
    this.getMyLocation();
    this.getHistoricSite();
  }

  async getMyLocation() {
    const location = await Geolocation.getCurrentPosition();
    this.startLatitude.set(location.coords.latitude);
    this.startLongitude.set(location.coords.longitude);
  }

  async getHistoricSite() {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.historicSiteService.show(this.id());
      this.historicSite.set(data);

      if (data.images) {
        const images = JSON.parse(data.images || '[]');
        const parseImages: string[] = images.map((image: string) => this.helperService.getImage(`${image}`));
        this.images.set(parseImages);
      }

      if (data.longitude && data.latitude) {
        this.lat.set(data.latitude);
        this.lng.set(data.longitude);
      }

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  openVirtualTour() {
    Browser.open({ url: this.historicSite()?.vt as string });
  }

  navigate(): any {
    if (this.lat() && this.lng()) {
      return window.open(`https://www.google.pl/maps/dir/'${this.startLatitude()},${this.startLongitude()}'/'${this.lat()},${this.lng()}'`,'_system');
    }

    return this.helperService.presentError('Tidak ada koordinat');
  }

  back() {
    this.nav.back();
  }
}

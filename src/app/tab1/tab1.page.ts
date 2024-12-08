import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { IonContent, IonSearchbar, IonToggle, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, add } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.local';
import { NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonGrid, 
    IonRow, 
    IonCol, 
    IonToggle, 
    IonIcon, 
    IonSearchbar, 
    IonContent,
    IonFab,
    IonFabButton,
  ],
})
export class Tab1Page implements AfterViewInit {
  protected nav = inject(NavController);
  actionSheetCtrl = inject(ActionSheetController);

  map: null|mapboxgl.Map = null;
  mapLng = signal<number>(environment.mapbox.defaultLng)
  mapLat = signal<number>(environment.mapbox.defaultLat)
  mapZoom = signal<number>(10)
  gridMode = signal<boolean>(false)

  constructor() {
    addIcons({gridOutline,add});

    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMaps(), 500);
  }

  loadMaps() {
    this.map = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.mapLng(), this.mapLat()],
      zoom: this.mapZoom()
    });
  }

  async toggleGridMode(ev: any) {
    this.gridMode.update((value) => value = ev.detail.checked);

    if (this.gridMode()) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Aktifkan Grid Mode',
        mode: 'md',
        cssClass: 'action-sheet',
        buttons: [
          {
            text: 'Lanjutkan',
            handler: () => this.nav.navigateRoot('/historic-site')
          },
          {
            text: 'Batalkan',
            role: 'cancel',
            handler: () => this.gridMode.update((value) => value = false)
          }
        ]
      });

      actionSheet.present();
    }
  }
}

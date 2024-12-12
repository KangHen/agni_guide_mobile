import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { IonContent, IonSearchbar, IonToggle, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonModal, IonToolbar, IonHeader, IonButtons, IonButton, IonTitle, IonInput, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, add } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.local';
import { NavController, ActionSheetController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { EntanglementService } from '../services/entanglement.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonTitle, IonButton, IonButtons, 
    IonToolbar, 
    IonModal, 
    IonHeader,
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
  public actionSheetCtrl = inject(ActionSheetController);
  public entanglementService = inject(EntanglementService);

  map: null|mapboxgl.Map = null;
  mapLng = signal<number>(environment.mapbox.defaultLng)
  mapLat = signal<number>(environment.mapbox.defaultLat)
  mapZoom = signal<number>(10)
  gridMode = signal<boolean>(false)

  constructor() {
    addIcons({gridOutline,add});

    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ionViewDidEnter() {
    this.gridMode.set(false);
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
            handler: () => {
              this.entanglementService.$sendSignal.next('historic-site');

              timer(500).subscribe(async () => {
                await Preferences.set({ key: 'defaultTab', value: 'historic-site' });

                this.nav.navigateRoot('/tabs/historic-site');
              })
            }
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

  onWillDismiss(ev: any) {
    
  }
}

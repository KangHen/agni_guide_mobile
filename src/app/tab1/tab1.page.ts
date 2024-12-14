import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonSearchbar, IonToggle, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonModal, IonToolbar, IonHeader, IonTitle, IonAvatar, IonLabel, IonItem, IonList, IonCheckbox } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gridOutline, add } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.local';
import { NavController, ActionSheetController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { EntanglementService } from '../services/entanglement.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/caategory.type';
import { HistoricSiteService } from '../pages/historic-site/historic-site.service';
import { HelperService } from '../services/helper.service';
import { HistoricSite, HistoricSiteParams } from '../pages/historic-site/historic-site.type';
import ClickableMarker from '../shared/clickable-marker';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonList, IonItem, IonLabel, IonAvatar, 
    IonTitle,
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
export class Tab1Page implements OnInit, AfterViewInit {
  protected nav = inject(NavController);
  protected actionSheetController = inject(ActionSheetController);
  
  entanglementService = inject(EntanglementService);
  helperService = inject(HelperService);
  categoryService = inject(CategoryService);
  historicSiteService = inject(HistoricSiteService);

  map: null|mapboxgl.Map = null;
  categories = signal<Category[]>([]);
  mapLng = signal<number>(environment.mapbox.defaultLng)
  mapLat = signal<number>(environment.mapbox.defaultLat)
  mapZoom = signal<number>(10)
  gridMode = signal<boolean>(false)
  selectedCategories = signal<number[]>([]);
  markers = signal<mapboxgl.Marker[]>([]);

  constructor() {
    addIcons({gridOutline,add});

    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.getCategories();  
  }

  ionViewDidEnter() {
    this.gridMode.set(false);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMaps(), 500);
    setTimeout(() => this.getHistoricSite(), 600);
  }

  async getHistoricSite(params?: HistoricSiteParams): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.historicSiteService.all(params);
      
      if (!data.length) {
        this.helperService.presentError('Tidak di temukan data');  
      }

      this.loadMarkers(data);

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  async nearBe(): Promise<void> {
    
  }

  async getCategories(): Promise<void> {
    try {
      const { data } = await this.categoryService.all();

      if (data.length > 0) {
        this.categories.set(data);
      }
    } catch (error) {
      
    }
  }

  loadMaps(): void {
    this.map = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.mapLng(), this.mapLat()],
      zoom: this.mapZoom()
    });
  }

  loadMarkers(data: HistoricSite[]): void {
    if (!this.map) {
      this.helperService.presentToast('Gagal menampilkan marker');
      return;  
    }

    if (this.markers().length && !data.length) {
      this.markers().forEach(marker => marker.remove());
      this.markers.set([]);
    }

    const markers: Array<mapboxgl.Marker> = [];

    data.forEach(historicSite => {
      const marker = new ClickableMarker({ color: '#ef4744'})
        .setLngLat([historicSite.longitude, historicSite.latitude])
        .setPopup(new mapboxgl.Popup({ closeButton: false, offset: 25 }).setHTML(`${historicSite.name}`))
        .onClick(() => this.nav.navigateForward(`/historic-site/show/${historicSite.id}`))
        .addTo(this.map as mapboxgl.Map)
        .togglePopup();

      markers.push(marker);
    }); 

    this.markers.set(markers);
  }

  async toggleGridMode(ev: any): Promise<void> {
    this.gridMode.update(value => value = ev.detail.checked);

    if (this.gridMode()) {
      const actionSheet = await this.actionSheetController.create({
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

  toggleCategory(ev: any): void {
    if (ev.detail.checked) {
      this.selectedCategories.update(value => [...value, ev.detail.value]);
    } else {
      this.selectedCategories.update(value => value.filter(categoryId => categoryId !== ev.detail.value));
    }
  }

  onWillDismiss(ev: any): Promise<void> {
    if (this.selectedCategories().length > 0) {
      return this.getHistoricSite({ categories: this.selectedCategories().join(',') });
    } 

    return this.getHistoricSite();
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonTitle, IonGrid, IonRow, IonCol, IonIcon, IonToggle } from '@ionic/angular/standalone';
import { PinnedCardComponent } from 'src/app/components/historic-site/pinned-card/pinned-card.component';
import { PopularCardComponent } from 'src/app/components/historic-site/popular-card/popular-card.component';
import { GeneralCardComponent } from 'src/app/components/historic-site/general-card/general-card.component';
import { addIcons } from 'ionicons';
import { gridOutline } from 'ionicons/icons';
import { timer } from 'rxjs';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { EntanglementService } from 'src/app/services/entanglement.service';
import { HistoricSiteService } from './historic-site.service';
import { HelperService } from 'src/app/services/helper.service';
import { HistoricSite } from './historic-site.type';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular/standalone';

@Component({
  selector: 'app-historic-site',
  templateUrl: './historic-site.page.html',
  styleUrls: ['./historic-site.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonCol, 
    IonRow, 
    IonGrid, 
    IonContent, 
    IonTitle,  
    IonIcon,
    IonToggle,
    CommonModule,
    PinnedCardComponent,
    PopularCardComponent,
    GeneralCardComponent
  ]
})
export class HistoricSitePage implements OnInit {
  protected nav = inject(NavController);
  protected actionSheetController = inject(ActionSheetController);
  
  helperService = inject(HelperService);
  historicSiteService = inject(HistoricSiteService);
  entanglementService = inject(EntanglementService);

  gridMode = signal<boolean>(true);
  pinneds = signal<HistoricSite[]>([]);
  populers = signal<HistoricSite[]>([]);
  generals = signal<HistoricSite[]>([]);
  
  swiperModules = [IonicSlides];

  constructor() {
    addIcons({gridOutline});
  }

  ngOnInit() {
    this.getShowcase();
  }

  ionViewDidEnter() {
    this.gridMode.set(true);
  }

  async getShowcase(): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const getPinned = await this.historicSiteService.showcase({ pinned: 1, limit: 5 });
      const getPopuler = await this.historicSiteService.showcase({ populer: 1, limit: 7 });

      this.pinneds.set(getPinned.data ?? []);
      this.populers.set(getPopuler.data ?? []);

      if (this.populers().length) {
        const excludes = this.populers().map((populer: HistoricSite) => populer.id);

        const getGenerals = await this.historicSiteService.showcase({ explore: 1, exclude: excludes.join(','), limit: 15 });
        this.generals.set(getGenerals.data ?? []);
      }

      loading.dismiss();
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  async toggleMapsMode(event: any) {
    this.gridMode.update((value) => value = event.detail.checked);

    const actionSheet = await this.actionSheetController.create({
      header: 'Aktifkan Maps Mode',
      mode: 'md',
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Lanjutkan',
          handler: () => {
            this.entanglementService.$sendSignal.next('tab1');
            timer(500).subscribe(async () => {
              await Preferences.set({ key: 'defaultTab', value: 'tab1' });

              this.nav.navigateRoot('/tabs/tab1');
            });
          }
        },
        {
          text: 'Batalkan',
          role: 'cancel',
          handler: () => this.gridMode.update((value) => value = true)
        }
      ]
    });

    await actionSheet.present();
  }

  detail(event: number): void {
    this.nav.navigateForward(`/historic-site/show/${event}`);
  }
}

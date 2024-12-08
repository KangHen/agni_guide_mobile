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

@Component({
  selector: 'app-historic-site',
  templateUrl: './historic-site.page.html',
  styleUrls: ['./historic-site.page.scss'],
  standalone: true,
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
  public actionSheetCtrl = inject(ActionSheetController);
  public entanglementService = inject(EntanglementService);

  gridMode = signal<boolean>(true);
  constructor() {
    addIcons({gridOutline});
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.gridMode.set(true);
  }

  async toggleMapsMode(event: any) {
    this.gridMode.update((value) => value = event.detail.checked);

    const actionSheet = await this.actionSheetCtrl.create({
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
}

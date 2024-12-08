import { Component, effect, EnvironmentInjector, inject, signal } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { basketOutline, mapOutline, personOutline, readerOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { EntanglementService } from '../services/entanglement.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public entanglementService = inject(EntanglementService);
  
  defaultTab = signal<string>('/tabs/tab1');
  tabHome = signal<string>('tab1');

  constructor() {
    addIcons({ 
      mapOutline,
      readerOutline,
      basketOutline,
      personOutline
     });

    this.entanglementService.$sendSignal.subscribe((signal) => {
      if (signal) {
        this.getDefaultTab(signal);
      } else {
        this.getDefaultTab();
      }
    });
  }

  async getDefaultTab(sign?: string) {
    if (sign) {
      this.defaultTab.update((value) => value = `/tabs/${sign}`);
      this.tabHome.update((value) => value = sign || 'tab1');
      
      return;
    }

    const tab = await Preferences.get({ key: 'defaultTab' });
    this.defaultTab.update((value) => value = `/tabs/${tab.value}`);
    this.tabHome.update((value) => value = tab.value || 'tab1');
  }
}

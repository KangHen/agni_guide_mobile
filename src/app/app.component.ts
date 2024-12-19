import { Component, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Platform, NavController } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  protected platform = inject(Platform);
  protected nav = inject(NavController);
  constructor() {
    this.platform.ready().then(() => {
      this.isFirstLaunch().then((value) => {
        if (value) {
          this.nav.navigateRoot('/splash/first');
        }
      });
    });
  }

  async isFirstLaunch(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'isFirstLaunch' });

    return value ? false : true;
  }
}

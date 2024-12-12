import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  protected loadingController = inject(LoadingController)
  protected toastController = inject(ToastController)

  constructor() { }

  async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Mohon tunggu...',
      spinner: 'lines'
    });

    await loading.present();

    return loading;
  }

  async presentToast(message: string, status?: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      mode: 'ios',
      duration: 2000,
      color: status === 'success' ? 'success' : 'danger'
    });

    return toast.present();
  }

  async presentError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      mode: 'ios',
      duration: 2000,
      color: 'danger'
    });

    return toast.present();
  }
}

import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  protected loadingController = inject(LoadingController)
  protected toastController = inject(ToastController)

  storage: string = environment.api.storage;

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

  async presentToast(message: string, status: string = 'success'): Promise<void> {
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

  getSmallImage(image: string): string {
    const smallImage: string = image.replace('posts/', 'posts/sm-');
    return `${this.storage}/${smallImage}`;
  }

  getImage(image: string): string {
    return `${this.storage}/${image}`;
  }
}

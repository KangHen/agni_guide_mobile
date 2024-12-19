import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonCol, IonRow, IonContent, IonImg, IonTitle, IonChip, IonItem,IonLabel, IonButton, IonIcon, IonModal, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, keyOutline, personOutline, trashOutline } from 'ionicons/icons';
import { ChangePasswordComponent } from '../components/user/change-password/change-password.component';
import { ChangeUserProfileComponent } from '../components/user/change-user-profile/change-user-profile.component';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../pages/auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../pages/auth/user.type';
import { HelperService } from '../services/helper.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonModal, IonIcon, IonButton, IonChip, 
    IonTitle, 
    IonImg, 
    IonContent, 
    IonCol, 
    IonGrid, 
    IonRow,
    IonItem, 
    IonLabel,
    ChangePasswordComponent,
    ChangeUserProfileComponent,
    CommonModule, 
    FormsModule
  ]
})
export class Tab4Page implements OnInit {
  @ViewChild('changePasswordModal') modalChangePassword!: IonModal;
  @ViewChild('changeUserModal') changeUserModal!: IonModal;
  
  protected nav = inject(NavController);
  protected alertController = inject(AlertController);

  helperService = inject(HelperService);
  authService = inject(AuthService);
  userService = inject(UserService);

  user = signal<User|null>(null);

  constructor() {
    addIcons({
      personOutline,
      keyOutline,
      exitOutline,
      trashOutline
    });
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser(): Promise<void> {
    const user = await this.userService.getUser();

    if (user) {
      this.user.set(user as User);
    }
  }

  async onUpdateProfile(event: any): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.userService.updateUser(event);

      await Preferences.set({ key: 'user', value: JSON.stringify(data) });
      this.user.update(value => value = data);

      loading.dismiss();

      this.changeUserModal.dismiss();
      this.helperService.presentToast('Profil berhasil diperbarui');
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  async onUpdatePassword(event: any): Promise<void> {
    if (event.new_password !== event.confirm_password) {
      return this.helperService.presentToast('Password baru dan konfirmasi password harus sama');
    }

    const loading = await this.helperService.presentLoading();

    try {
      await this.userService.updatePassword(event);
      loading.dismiss();
      this.modalChangePassword.dismiss();

      this.helperService.presentToast('Password berhasil diperbarui');
    } catch (error: any) {
      loading.dismiss();
      this.helperService.presentError(error?.message);
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Apakah anda yakin logout dari aplikasi?',
      mode: 'ios',
      cssClass: 'alerting',
      buttons: [
        {
          text: 'Batalkan',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            await this.authService.logout();
            
            this.nav.navigateRoot('/login');
          }
        }
      ],
    });

    await alert.present();
  }
}

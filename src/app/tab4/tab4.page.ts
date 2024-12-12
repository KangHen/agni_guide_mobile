import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonCol, IonRow, IonContent, IonImg, IonText, IonTitle, IonChip, IonItem,IonLabel, IonButton, IonIcon, IonModal, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, keyOutline, personOutline } from 'ionicons/icons';
import { ChangePasswordComponent } from '../components/user/change-password/change-password.component';
import { ChangeUserProfileComponent } from '../components/user/change-user-profile/change-user-profile.component';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../pages/auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../pages/auth/user.type';

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
  protected nav = inject(NavController);
  protected alertController = inject(AlertController);

  authService = inject(AuthService);
  userService = inject(UserService);

  user = signal<User|null>(null);

  constructor() {
    addIcons({
      personOutline,
      keyOutline,
      exitOutline
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

  async onSubmit(ev: any): Promise<void> {
    console.log(ev)
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

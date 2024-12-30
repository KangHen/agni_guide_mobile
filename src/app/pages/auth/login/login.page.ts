import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonCol, IonButton, IonInput, IonGrid, IonRow, IonIcon, IonCheckbox, IonTitle, IonToolbar, IonModal, IonButtons, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, eye, lockClosed, mail } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { Preferences } from '@capacitor/preferences';
import { Terms } from '../auth.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonHeader, IonButtons,  IonModal, IonToolbar, IonTitle, IonInput, IonButton, IonCol, IonContent, IonGrid, IonRow, IonIcon, IonCheckbox, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) termsModalLogin!: IonModal;

  protected nav = inject(NavController);

  helperService = inject(HelperService);
  authService = inject(AuthService);

  form!: FormGroup;
  showPassword = signal<boolean>(false);
  privacyPolicy = signal<Terms|null>(null);

  constructor() {
    addIcons({mail,lockClosed,eye, closeOutline});
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });

    this.terms();
  }

  async terms(): Promise<void> {
    const loading = await this.helperService.presentLoading();

    try {
      const { data } = await this.authService.terms();
      this.privacyPolicy.set(data);

      await Preferences.set({ key: 'terms', value: JSON.stringify(data) });

      loading.dismiss();
    } catch (error: any) {
      this.helperService.presentError(error?.message);
      loading.dismiss();
    }
  }

  async login(): Promise<void> {
    const terms = this.form.value.terms;

    if (!terms) {
      return this.helperService.presentError('Anda harus setuju dengan syarat dan ketentuan');
    }

    const loading = await this.helperService.presentLoading();

    try {
      const { data, token } = await this.authService.login(this.form.value);
      loading.dismiss();

      await Preferences.set({ key: 'token', value: token });
      await Preferences.set({ key: 'user', value: JSON.stringify(data) });

      this.nav.navigateRoot('/tabs/tab1');
    } catch (error: any) {
      this.helperService.presentError(error?.message);
      loading.dismiss();
    }
  }

  togglePassword(): void {
    this.showPassword.update((value) => value = !value);
  }

  register(): void {
    this.nav.navigateForward(['register']);
  }
}

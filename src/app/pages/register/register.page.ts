import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCol, IonGrid, IonRow, IonInput, IonCheckbox, IonLabel, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mail, closeOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Terms } from '../auth/auth.type';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonLabel, 
    IonGrid, 
    IonRow,
    IonCol, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonInput,
    IonCheckbox,
    IonModal,
    ReactiveFormsModule,
    CommonModule, 
    FormsModule
  ]
})
export class RegisterPage implements OnInit {
  @ViewChild(IonModal) termsModalRegister!: IonModal;
  protected nav = inject(NavController);

  helperService = inject(HelperService);
  authService = inject(AuthService);

  form!: FormGroup;

  privacyPolicy = signal<Terms|null>(null);

  constructor() {
    addIcons({arrowBackOutline,closeOutline,mail});
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });
  }

  async terms(): Promise<void> {
    const { value } = await Preferences.get({ key: 'terms' });

    if (value) {
      this.privacyPolicy.set(JSON.parse(value));
    }
  }

  async register(): Promise<void> {
    if (this.form.value.password !== this.form.value.confirm_password) {
      return this.helperService.presentToast('Password tidak sama');
    }

    if (!this.form.value.terms) {
      return this.helperService.presentToast('Anda harus setuju dengan syarat dan ketentuan');
    }

    const loading = await this.helperService.presentLoading();

    try {
      const { data, token } = await this.authService.register(this.form.value);
      loading.dismiss();

      await Preferences.set({ key: 'token', value: token });
      await Preferences.set({ key: 'user', value: JSON.stringify(data) });

      this.nav.navigateRoot('/tabs/tab1');
    } catch (error: any) {
      loading.dismiss();

      this.helperService.presentError(error?.message);
    }
  }

  back(): void {
    this.nav.navigateBack(['login']);
  }
}

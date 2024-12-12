import { inject, Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment.local';
import { UserForm } from './user.type';
import { AuthForm, AuthResponse, TermsRepsonse } from './auth.type';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected nav = inject(NavController);
  protected API = environment.api.url;

  constructor() { }

  async login<T>(data: AuthForm): Promise<AuthResponse> {
    const response = await CapacitorHttp.post({
      url: `${this.API}/auth`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async logout(): Promise<void> {
    const removed: Array<string> = [
      'token',
      'user'
    ];

    for (const key of removed) {
      await Preferences.remove({ key });
    }

    this.nav.navigateRoot('/login');
  }

  async terms<T>(): Promise<TermsRepsonse> {
    const response = await CapacitorHttp.get({
      url: `${this.API}/terms`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getBearerToken(): Promise<string|null> {
    const { value } = await Preferences.get({ key: 'token' });

    return value;
  }
}

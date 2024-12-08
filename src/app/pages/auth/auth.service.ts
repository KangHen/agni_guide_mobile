import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected API = environment.api.url;

  constructor() { }

  async login<T>(data?: any): Promise<T> {
    const response = await CapacitorHttp.post({
      url: `${this.API}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data
    });

    return response.data;
  }

  async getBearerToken(): Promise<string|null> {
    const { value } = await Preferences.get({ key: 'token' });

    return value;
  }
}

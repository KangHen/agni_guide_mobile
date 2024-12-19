import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PasswordForm, User } from '../pages/auth/user.type';
import { HttpService } from './http.service';
import { AuthResponse } from '../pages/auth/auth.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpService = inject(HttpService);

  constructor() { }

  async getUser(): Promise<boolean|User> {
    const { value } = await Preferences.get({ key: 'user' });

    if (!value) {
      return false;
    }

    return JSON.parse(value);
  }

  async updateUser(user: Partial<User>): Promise<AuthResponse> {
    return this.httpService.put('user/profile', user);
  }

  async updatePassword(data: PasswordForm): Promise<AuthResponse> {
    return this.httpService.put('user/password', data);
  }
}

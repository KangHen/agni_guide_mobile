import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../pages/auth/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUser(): Promise<boolean|User> {
    const { value } = await Preferences.get({ key: 'user' });

    if (!value) {
      return false;
    }

    return JSON.parse(value);
  }
}

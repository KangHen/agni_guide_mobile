import { Injectable } from '@angular/core';
import { UserForm } from '../auth/user.type';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  protected API: string = environment.api.url;

  constructor() { }

  async store<T>(data: UserForm): Promise<any> {
    const response = await CapacitorHttp.post({
      url: `${this.API}/register`,
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

  async update<T>(id: number, data: UserForm): Promise<any> {
    const response = await CapacitorHttp.put({
      url: `${this.API}/users/${id}`,
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
}

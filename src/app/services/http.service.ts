import { inject, Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment.local';
import { AuthService } from '../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  protected API = environment.api.url;
  protected authService = inject(AuthService);

  constructor() { }

  async get<T>(path: string, params?: any): Promise<T> {
    const Bearer = await this.authService.getBearerToken();

    const response = await CapacitorHttp.get({
      url: `${this.API}/${path}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Bearer}`
      },
      params
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async post<T>(path: string, data?: any, params?: any): Promise<T> {
    const Bearer = await this.authService.getBearerToken();

    const response = await CapacitorHttp.post({
      url: `${this.API}/${path}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Bearer}`
      },
      data,
      params
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async put<T>(path: string, data?: any, params?: any): Promise<T> {
    const Bearer = await this.authService.getBearerToken();

    const response = await CapacitorHttp.put({
      url: `${this.API}/${path}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Bearer}`
      },
      data,
      params
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async delete<T>(path: string, params?: any): Promise<T> {
    const Bearer = await this.authService.getBearerToken();

    const response = await CapacitorHttp.delete({
      url: `${this.API}/${path}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Bearer}`
      },
      params
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

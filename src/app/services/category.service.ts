import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CategoryResponse } from '../shared/caategory.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected httpService = inject(HttpService);

  constructor() { }

  async all(): Promise<CategoryResponse> {
    return this.httpService.get<CategoryResponse>('categories');
  }
}

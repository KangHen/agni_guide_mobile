import { inject, Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { GetProduct, ProductParams, ProductResponse } from './product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected httpService = inject(HttpService);

  constructor() { }

  async all(params: ProductParams = { page: 1 }): Promise<ProductResponse> {
    return this.httpService.get<ProductResponse>('sales', params );
  }

  async show(id: number): Promise<GetProduct> {
    return this.httpService.get<GetProduct>(`sales/${id}`);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { GetHistoricSite, HistoricSiteParams, HistoricSiteResponse } from './historic-site.type';

@Injectable({
  providedIn: 'root'
})
export class HistoricSiteService {
  protected httpService = inject(HttpService);

  constructor() { }

  async all(params: HistoricSiteParams = { page: 1 }): Promise<HistoricSiteResponse> {
    return this.httpService.get<HistoricSiteResponse>('historic-sites', params);
  }

  async show(id: number): Promise<GetHistoricSite> {
    return this.httpService.get<GetHistoricSite>(`historic-sites/${id}`);
  }
}

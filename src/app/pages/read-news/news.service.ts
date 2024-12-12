import { inject, Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { News, NewsParams, NewsResponse } from './news.type';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  protected httpService = inject(HttpService);

  constructor() { }

  all(params: NewsParams = { page: 1 }): Promise<NewsResponse> {
    return this.httpService.get<NewsResponse>('posts', params);
  }

  show(slug: string): Promise<NewsResponse> {
    return this.httpService.get<NewsResponse>(`posts/${slug}`);
  }
}

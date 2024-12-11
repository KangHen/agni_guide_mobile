import { inject, Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { News, NewsResponse } from './news.type';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  protected httpService = inject(HttpService);

  constructor() { }

  all(): Promise<NewsResponse> {
    return this.httpService.get<NewsResponse>('news');
  }

  show(id: number): Promise<NewsResponse> {
    return this.httpService.get<NewsResponse>(`news/${id}`);
  }

  save(data: any, id: number = 0): Promise<News> {
    if (id > 0) {
      return this.httpService.put<News>(`news/${id}`, data);
    } else {
      return this.httpService.post<News>('news', data);
    }
  }

  delete(id: number): Promise<News> {
    return this.httpService.delete<News>(`news/${id}`);
  }
}

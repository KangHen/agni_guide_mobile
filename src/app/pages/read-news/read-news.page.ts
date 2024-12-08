import { Component, OnInit, signal } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-read-news',
  templateUrl: './read-news.page.html',
  styleUrls: ['./read-news.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar
  ]
})
export class ReadNewsPage implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

}

import { AfterViewInit, Component } from '@angular/core';
import { IonContent, IonInput, IonSearchbar } from '@ionic/angular/standalone';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonInput, IonContent],
})
export class Tab1Page implements AfterViewInit {
  map: null|mapboxgl.Map = null;
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMaps(), 500);
  }

  loadMaps() {
    this.map = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    });
  }
}

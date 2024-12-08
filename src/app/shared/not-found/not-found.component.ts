import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonImg]
})
export class NotFoundComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

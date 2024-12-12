import { Component, OnInit } from '@angular/core';
import { IonContent, IonInput, IonItem, IonCol, IonButton, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [IonRow, IonButton, IonCol, 
    IonContent,
    IonInput,
    IonItem
  ]
})
export class ChangePasswordComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

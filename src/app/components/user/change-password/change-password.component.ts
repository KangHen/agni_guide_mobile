import { Component, OnInit } from '@angular/core';
import { IonInput, IonCol, IonButton, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [
    IonRow, 
    IonButton, 
    IonCol, 
    IonInput,
  ]
})
export class ChangePasswordComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

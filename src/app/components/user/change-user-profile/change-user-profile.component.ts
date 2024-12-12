import { Component, OnInit } from '@angular/core';
import { IonRow, IonInput, IonCol, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-change-user-profile',
  templateUrl: './change-user-profile.component.html',
  styleUrls: ['./change-user-profile.component.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonInput, IonRow]
})
export class ChangeUserProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

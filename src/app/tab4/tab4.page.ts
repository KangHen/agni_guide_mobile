import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonCol, IonRow, IonContent, IonImg, IonText, IonTitle, IonChip, IonItem,IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, keyOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonChip, 
    IonTitle, 
    IonImg, 
    IonContent, 
    IonCol, 
    IonGrid, 
    IonRow,
    IonItem, 
    IonLabel,
    CommonModule, 
    FormsModule
  ]
})
export class Tab4Page implements OnInit {

  constructor() {
    addIcons({
      personOutline,
      keyOutline,
      exitOutline
    })
  }

  ngOnInit() {
  }

}

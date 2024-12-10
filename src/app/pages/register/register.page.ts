import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCol, IonGrid, IonRow, IonInput, IonCheckbox, IonLabel, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mail, closeOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonLabel, 
    IonGrid, 
    IonRow,
    IonCol, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonInput,
    IonCheckbox,
    IonModal,
    CommonModule, 
    FormsModule
  ]
})
export class RegisterPage implements OnInit {
  @ViewChild(IonModal) termsModal!: IonModal;
  protected nav = inject(NavController);
  constructor() {
    addIcons({arrowBackOutline,closeOutline,mail});
  }

  ngOnInit() {
  }

  back(): void {
    this.nav.navigateBack(['login']);
  }
}

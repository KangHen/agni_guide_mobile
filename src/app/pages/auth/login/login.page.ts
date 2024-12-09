import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonButton, IonInput, IonGrid, IonRow, IonIcon, IonCheckbox, IonTitle, IonToolbar, IonModal, IonButtons, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, eye, lockClosed, mail } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonHeader, IonButtons,  IonModal, IonToolbar, IonTitle, IonInput, IonButton, IonCol, IonContent, IonGrid, IonRow, IonIcon, IonCheckbox, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) termsModalLogin!: IonModal;

  protected nav = inject(NavController);

  constructor() {
    addIcons({mail,lockClosed,eye, closeOutline});
  }

  ngOnInit() {
  
  }

  register(): void {
    this.nav.navigateForward(['register']);
  }
}

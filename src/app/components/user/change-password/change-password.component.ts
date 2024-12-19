import { Component, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule
  ]
})
export class ChangePasswordComponent  implements OnInit {
  clicked = output<any>();

  form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.clicked.emit(this.form.value);
  }
}

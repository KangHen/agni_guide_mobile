import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonRow, IonInput, IonCol, IonButton } from "@ionic/angular/standalone";
import { User } from 'src/app/pages/auth/user.type';

@Component({
  selector: 'app-change-user-profile',
  templateUrl: './change-user-profile.component.html',
  styleUrls: ['./change-user-profile.component.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonInput, IonRow, FormsModule, ReactiveFormsModule]
})
export class ChangeUserProfileComponent  implements OnInit {
  user = input<User|null>();
  clicked = output<any>();

  form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.user()?.name, [Validators.required]),
      phone: new FormControl(this.user()?.phone, [Validators.required]),
      address: new FormControl(this.user()?.address, [Validators.required]),
      city: new FormControl(this.user()?.city, [Validators.required]),
    });
  }

  onSubmit() {
    this.clicked.emit(this.form.value);
  }
}

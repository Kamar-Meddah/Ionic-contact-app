import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactsService} from '../services/contacts.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Plugins} from '@capacitor/core';

const {Toast} = Plugins;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  public userForm: FormGroup;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly contactsService: ContactsService,
      private readonly router: Router,
      private readonly toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ])
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ]
    });
  }

  public createUser(): void {
    const user = this.userForm.value;
    if (this.userForm.valid) {
      this.contactsService.createContact(user.name, user.phone)
          .subscribe(async (res) => {
            await Toast.show({
              text: 'Contact have been created',
              duration: 'short'
            });
            this.router.navigateByUrl('/');
          });
    }
  }
}

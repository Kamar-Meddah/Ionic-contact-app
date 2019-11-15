import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactsService} from '../services/contacts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Contact} from '../models/contact.model';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.page.html',
    styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

    public userForm: FormGroup;
    public contact: Contact;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly contactsService: ContactsService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly toastController: ToastController
    ) {
    }

    ngOnInit() {
        this.initForm();
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.contactsService.find(id)
            .subscribe((contact) => {
                this.contact = contact;
                this.userForm.patchValue({name: contact.name, phone: contact.phone});
            });
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

    public updateUser(): void {
        const user = this.userForm.value;
        if (this.userForm.valid) {
            this.contactsService.updateContact({
                name: user.name,
                phone: user.phone,
                id: this.contact.id
            } as unknown as Contact)
                .subscribe(async (res) => {
                    const toast = await this.toastController.create({
                        message: 'Contact have been updated',
                        duration: 2000,
                        position: 'bottom',
                        animated: true,
                        color: 'dark',
                        buttons: [
                            {
                                text: 'Close',
                                role: 'close',
                                handler: () => {
                                    toast.dismiss();
                                }
                            }
                        ]
                    });
                    await toast.present();
                    this.router.navigateByUrl('/');
                });
        }
    }
}

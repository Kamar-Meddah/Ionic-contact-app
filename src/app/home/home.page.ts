import {Component} from '@angular/core';
import {ContactsService} from '../services/contacts.service';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';
import {AlertController, Platform, PopoverController} from '@ionic/angular';
import {ContactActionsComponent} from './components/contact-actions/contact-actions.component';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';

const {Modals, Haptics} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public contactList$: Observable<Contact[]>;
  public searchValue = '';

  constructor(
      private readonly contactsService: ContactsService,
      private readonly popoverController: PopoverController,
      private readonly platform: Platform,
      private readonly router: Router,
      private readonly alertController: AlertController
  ) {
  }

  ionViewWillEnter(): void {
    this.getAllContacts();
  }

  private getAllContacts(): void {
    this.contactList$ = this.contactsService.findAll();
  }

  public pullToRefresh(event) {
    this.getAllContacts();
    event.target.complete();
  }

  public async showPopup(event, contact: Contact) {
    const popover = await this.popoverController.create({
      component: ContactActionsComponent,
      event
    });
    Haptics.vibrate();
    await popover.present();
    const {data} = await popover.onDidDismiss();
    if (data === `delete`) {
      await this.deleteContact(contact);
    } else if (data === 'edit') {
      await this.router.navigateByUrl(`/edit/${contact.id}`);
    }
  }

  private async deleteContact(contact: Contact) {
    const confirmRet = await Modals.confirm({
      title: 'Confirmation',
      message: `Are you sure you want to delete '${contact.name}'`,
      cancelButtonTitle: `Cancel`,
      okButtonTitle: `Delete`
    });
    if (confirmRet.value) {
      this.contactsService.delete(contact.id)
          .subscribe(() => this.getAllContacts());
    }

  }

  trackFunction(index: number, contact: Contact) {
    return contact.id;
  }

  search() {
    if (this.searchValue !== '') {
      this.contactList$ = this.contactsService.findAll()
          .pipe(
              map((contact: any) => {
                return contact.filter((res) => res.name.includes(this.searchValue));
              })
          );
    } else {
      this.getAllContacts();
    }
  }
}

import {Injectable} from '@angular/core';
import {ContactsRepository} from '../repositories/contacts.repository';
import {Contact} from '../models/contact.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private readonly contactsRepository: ContactsRepository) {
  }

  public createContact(name: string, phone: string): Observable<Contact> {
    const contact = new Contact();
    contact
        .setName(name)
        .setPhone(phone);
    return this.contactsRepository.save(contact);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.contactsRepository.save(contact);
  }

  public findAll(): Observable<Contact[]> {
    return this.contactsRepository.findAll();
  }

  public delete(id: string): Observable<void> {
    return this.contactsRepository.delete(id);
  }

  public find(id: string): Observable<Contact> {
    return this.contactsRepository.find(id);
  }

}

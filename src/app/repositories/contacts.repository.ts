import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Contact} from '../models/contact.model';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactsRepository {

    constructor(private readonly storage: Storage) {
    }

    public save(contact: Contact): Observable<Contact> {
        return from(this.storage.set(contact.id, contact));
    }

    public delete(id: string): Observable<void> {
        return from(this.storage.remove(id));
    }

    public findAll(): Observable<Contact[]> {
        const contacts = from(this.storage.keys())
            .pipe(
                switchMap((keys) => {
                    return from(Promise.all(keys.map(async (contact) => await this.storage.get(contact))));
                })
            );

        return contacts as unknown as Observable<Contact[]>;
    }

    public find(id: string): Observable<Contact> {
        const contacts = from(this.storage.get(id));
        return contacts as unknown as Observable<Contact>;
    }

}

import { TestBed } from '@angular/core/testing';

import { ContactsRepository } from './contacts.repository';

describe('ContactsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsRepository = TestBed.get(ContactsRepository);
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-contact-actions',
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss'],
})
export class ContactActionsComponent implements OnInit {

  constructor(private readonly popoverController: PopoverController) { }

  ngOnInit() {}

  public async edit() {
    return await this.popoverController.dismiss('edit', 'edit');
  }

  public async delete() {
    return await this.popoverController.dismiss('delete', 'delete');
  }

}

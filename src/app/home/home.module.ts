import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {AvatarModule} from 'ngx-avatar';
import {HttpClientModule} from '@angular/common/http';
import {ContactActionsComponent} from './components/contact-actions/contact-actions.component';


@NgModule({
    imports: [
        CommonModule,
        AvatarModule,
        FormsModule,
        HttpClientModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage, ContactActionsComponent],
    entryComponents: [ContactActionsComponent]
})
export class HomePageModule {}

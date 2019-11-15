import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path: 'add-contact', loadChildren: () => import('./add-contact/add-contact.module').then(m => m.AddContactPageModule)},
  {path: 'edit/:id', loadChildren: () => import('./edit-contact/edit-contact.module').then(m => m.EditContactPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

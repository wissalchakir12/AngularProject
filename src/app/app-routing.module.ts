import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component'; // Assurez-vous que vous avez ce composant importé
import { ClientEditComponent } from './components/client-edit/client-edit.component';

const routes: Routes = [
  { path: '', component: ClientListComponent }, // La page d'accueil
  { path: 'clients', component: ClientListComponent }, // Liste des clients
  { path: 'add-client', component: ClientAddComponent }, // La route vers le formulaire d'ajout
  { path: 'edit-client/:id', component: ClientEditComponent }, // Route d'édition de client avec ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

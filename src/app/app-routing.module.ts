import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component'; // Assurez-vous que vous avez ce composant importé
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { ProduitAddComponent } from './components/produit-add/produit-add.component';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { VenteListComponent } from './components/vente-list/vente-list.component';
import { VenteAddComponent } from './components/vente-add/vente-add.component';
import { VenteEditComponent } from './components/vente-edit/vente-edit.component';
import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


const routes: Routes = [
  { path: '', component: ClientListComponent }, // La page d'accueil
  { path: 'clients', component: ClientListComponent }, // Liste des clients
  { path: 'add-client', component: ClientAddComponent }, // La route vers le formulaire d'ajout
  { path: 'edit-client/:id', component: ClientEditComponent },// Route d'édition de client avec ID
  { path: 'produits', component: ProduitListComponent },
  { path: 'add-produit', component: ProduitAddComponent },
  { path: 'edit-produit/:id', component: ProduitEditComponent },
  { path: 'vente-list', component: VenteListComponent },
  { path: 'vente-add', component: VenteAddComponent },
  { path: 'ventes', component: VenteListComponent },
  { path: 'vente-edit/:id', component: VenteEditComponent },
  { path: 'stati', component: StatisticsComponent },



  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

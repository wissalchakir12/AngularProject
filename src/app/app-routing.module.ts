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
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  { path: '', component: StatisticsComponent , canActivate: [AuthGuard] }, // La page d'accueil
  { path: 'clients', component: ClientListComponent , canActivate: [AuthGuard]  }, // Liste des clients
  { path: 'add-client', component: ClientAddComponent , canActivate: [AuthGuard] }, // La route vers le formulaire d'ajout
  { path: 'edit-client/:id', component: ClientEditComponent  , canActivate: [AuthGuard] },// Route d'édition de client avec ID
  { path: 'produits', component: ProduitListComponent , canActivate: [AuthGuard] },
  { path: 'add-produit', component: ProduitAddComponent  , canActivate: [AuthGuard] },
  { path: 'edit-produit/:id', component: ProduitEditComponent , canActivate: [AuthGuard]  },
  { path: 'vente-list', component: VenteListComponent  , canActivate: [AuthGuard] },
  { path: 'vente-add', component: VenteAddComponent , canActivate: [AuthGuard] },
  { path: 'ventes', component: VenteListComponent  , canActivate: [AuthGuard] },
  { path: 'vente-edit/:id', component: VenteEditComponent  , canActivate: [AuthGuard] },
  { path: 'stati', component: StatisticsComponent , canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },




  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

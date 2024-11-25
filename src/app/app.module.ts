import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Pour utiliser ngModel
import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { ProduitAddComponent } from './components/produit-add/produit-add.component';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { VenteListComponent } from '../app/components/vente-list/vente-list.component';
import { VenteAddComponent } from './components/vente-add/vente-add.component';
import { VenteEditComponent } from './components/vente-edit/vente-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientAddComponent,
    ClientEditComponent,
    ProduitListComponent,
    ProduitAddComponent,
    ProduitEditComponent,
    VenteListComponent,
    VenteAddComponent,
    VenteEditComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //pour les routes
    FormsModule,
    HttpClientModule,// Ajoutez cette ligne
    ReactiveFormsModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientAddComponent,
    ClientEditComponent,
    ProduitListComponent,
    ProduitAddComponent,
    ProduitEditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //pour les routes
    FormsModule,
    HttpClientModule,// Ajoutez cette ligne
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

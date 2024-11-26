import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



// Composants
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { ProduitAddComponent } from './components/produit-add/produit-add.component';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { VenteListComponent } from './components/vente-list/vente-list.component';
import { VenteAddComponent } from './components/vente-add/vente-add.component';
import { VenteEditComponent } from './components/vente-edit/vente-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HighchartsChartModule } from 'highcharts-angular'; 

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
    HeaderComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Pour les routes
    FormsModule,
    HttpClientModule,  // Pour les requêtes HTTP
    ReactiveFormsModule,
    HighchartsChartModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
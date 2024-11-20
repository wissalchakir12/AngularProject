import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vente } from '../../models/Vente';
import { VenteService } from '../../services/vente.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vente-add',
  templateUrl: './vente-add.component.html',
  styleUrls: ['./vente-add.component.css']
})
export class VenteAddComponent implements OnInit {
  vente: Vente = new Vente();
  clients: any[] = []; // Liste des clients récupérés du microservice
  produits: any[] = []; // Liste des produits récupérés du microservice

  constructor(
    private venteService: VenteService,
    private router: Router,
    private http: HttpClient // Utilisé pour appeler les microservices
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getProduits();
  }

  // Charger les clients depuis le microservice
  getClients(): void {
    const url = 'http://localhost:8080/SaleManagementService/api/ventes/clients';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des clients :', error);
      }
    );
  }

  // Charger les produits depuis le microservice
  getProduits(): void {
    const url = 'http://localhost:8080/SaleManagementService/api/ventes/products';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  // Ajouter une vente
  addVente(): void {
    this.venteService.createVente(this.vente).subscribe(() => {
      this.router.navigate(['/ventes']);
    });
  }
}
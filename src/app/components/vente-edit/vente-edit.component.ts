import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vente } from '../../models/Vente';
import { VenteService } from '../../services/vente.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vente-update',
  templateUrl: './vente-edit.component.html',
  styleUrls: ['./vente-edit.component.css']
})
export class VenteEditComponent implements OnInit {
  vente: Vente = new Vente();
  clients: any[] = []; // List of clients from the microservice
  produits: any[] = []; // List of products from the microservice

  constructor(
    private venteService: VenteService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getVenteById(parseInt(id, 10));
    }
    this.getClients();
    this.getProduits();
  }

  // Fetch a specific Vente by ID
  getVenteById(id: number): void {
    this.venteService.getVente(id).subscribe(
      (data) => {
        this.vente = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la vente :', error);
      }
    );
  }

  // Load clients from the microservice
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

  // Load products from the microservice
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

  // Update the Vente
  updateVente(): void {
    this.venteService.updateVente(this.vente.id, this.vente).subscribe(
      () => {
        this.router.navigate(['/ventes']); // Navigate back to the list of ventes
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la vente :', error);
      }
    );
  }
}
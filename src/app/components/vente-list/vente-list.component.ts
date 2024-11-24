import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente.service';
import { Vente } from '../../models/Vente';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-ventes',
  templateUrl: '../../components/vente-list/vente-list.component.html',
  styleUrls: ['./../../components/vente-list/vente-list.component.css'],
})
export class VenteListComponent implements OnInit {

  ventes: Vente[] = [];
 

  constructor(
    private http: HttpClient,
    private venteService: VenteService,
    private clientService: ClientService,
    private produitService: ProduitService
  ) {}
  ngOnInit(): void {
    this.venteService.getVents().subscribe((data: Vente[]) => {
      const ventesWithDetails = data.map((vente) => {
        // Fetch client name
        this.clientService.getClient(vente.client).subscribe((client) => {
          vente.clientName = client.nom;
        });
  
        // Fetch product name
        this.produitService.getProduitById(vente.produit).subscribe((produit) => {
          vente.produitName = produit.nom;
        });
  
        return vente;
      });
  
      this.ventes = ventesWithDetails;
});
}

  // Récupérer toutes les ventes
  getAllVentes(): void {
    this.venteService.getVents().subscribe(
      (data) => {
        this.ventes = data;
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des ventes :', error);
      }
    );
  }

  // Supprimer une vente
  deleteVente(id: number): void {
    this.venteService.deleteVente(id).subscribe(() => {
      this.ventes = this.ventes.filter((vente) => vente.id !== id);
    });
  }

 

  // Sélectionner une vente à modifier
  
  
  }


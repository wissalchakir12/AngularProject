import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente.service';
import { Vente } from '../../models/Vente';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { ProduitService } from '../../services/produit.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-ventes',
  templateUrl: '../../components/vente-list/vente-list.component.html',
  styleUrls: ['./../../components/vente-list/vente-list.component.css'],
})
export class VenteListComponent implements OnInit {
  ventes: Vente[] = [];
  filteredVentes: Vente[] = [];
  chiffreAffaire: number = 0; // Propriété pour stocker le chiffre d'affaires total

  constructor(
    private http: HttpClient,
    private venteService: VenteService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.venteService.getVents().subscribe((data: Vente[]) => {
      const ventesWithDetails = data.map((vente) => {
        this.clientService.getClient(vente.client).subscribe((client) => {
          vente.clientName = client.nom;
        });

        this.produitService.getProduitById(vente.produit).subscribe((produit) => {
          vente.produitName = produit.nom;
        });

        this.venteService.prixTotal(vente.id).subscribe((prixTotal) => {
          vente.prixTotal = prixTotal;

          // Recalculer le chiffre d'affaires après avoir ajouté le prix total
          this.calculateChiffreAffaire();
        });

        return vente;
      });

      this.ventes = ventesWithDetails;
      this.filteredVentes = ventesWithDetails; 
    });

    this.searchService.currentSearchTerm.subscribe((term) => {
      this.filterVentes(term);
    });
  }

  // Filtrer les ventes
  filterVentes(term: string): void {
    this.filteredVentes = this.ventes.filter(
      (vente) =>
        vente.clientName?.toLowerCase().includes(term.toLowerCase()) ||
        vente.produitName?.toLowerCase().includes(term.toLowerCase())
    );
  }

  // CA ==> chiffre d'affaire total
  calculateChiffreAffaire(): void {
    this.chiffreAffaire = this.ventes.reduce((total, vente) => {
      return total + (vente.prixTotal || 0);
    }, 0);
    
    // pour arrondir : 2 ar9am wra fassila hihi 
    this.chiffreAffaire = parseFloat(this.chiffreAffaire.toFixed(2));
  }
  
  // Supprimer une vente
  deleteVente(id: number): void {
    this.venteService.deleteVente(id).subscribe(() => {
      this.ventes = this.ventes.filter((vente) => vente.id !== id);
      this.calculateChiffreAffaire(); // Recalculer après suppression
      this.filterVentes('');
    });
  }
}

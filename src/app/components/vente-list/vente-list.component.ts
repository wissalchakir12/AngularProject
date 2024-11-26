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

        return vente;
      });

      this.ventes = ventesWithDetails;
      this.filteredVentes = ventesWithDetails; // Initialisation des ventes filtrées
    });

    // Mettre à jour les ventes filtrées en fonction du terme de recherche
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

  // Supprimer une vente
  deleteVente(id: number): void {
    this.venteService.deleteVente(id).subscribe(() => {
      this.ventes = this.ventes.filter((vente) => vente.id !== id);
      this.filterVentes(''); // Mettre à jour les ventes filtrées
    });
  }
}

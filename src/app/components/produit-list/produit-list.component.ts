import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/Produit';
import { ProduitService } from '../../services/produit.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css',
  
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];

  filteredProduits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      this.filteredProduits = data; // Initialise les produits filtrés
    });

    this.searchService.currentSearchTerm.subscribe(term => {
      this.filterProduits(term);
    });
  }
  filterProduits(term: string): void {
  this.filteredProduits = this.produits.filter(produit =>
    produit.nom.toLowerCase().includes(term.toLowerCase()) ||
    produit.marque.toLowerCase().includes(term.toLowerCase())
  );
}

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
    this.produits = this.produits.filter(produit => produit.id !== id);
    });
  }
}

import { Component } from '@angular/core';
import { Produit } from '../../models/Produit';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  deleteClient(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
    this.produits = this.produits.filter(produit => produit.id !== id);
    });
  }
}

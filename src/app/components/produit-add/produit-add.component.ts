import { Component } from '@angular/core';
import { Produit } from '../../models/Produit';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrl: './produit-add.component.css'
})
export class ProduitAddComponent {
  produit: Produit = new Produit();

  constructor(private produitService: ProduitService, private router: Router) {}

  addProduit(): void {
    this.produitService.addProduit(this.produit).subscribe(() => {
      this.router.navigate(['/produits']);
    });
  }
}

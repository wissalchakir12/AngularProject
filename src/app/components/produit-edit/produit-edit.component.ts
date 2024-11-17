import { Component } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../models/Produit';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrl: './produit-edit.component.css'
})
export class ProduitEditComponent {
  produit: Produit = new Produit();

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.produitService.getProduit(id).subscribe(data => {
      this.produit = data;
    });
  }

  updateClient(): void {
    const id = this.route.snapshot.params['id'];
    this.produitService.updateProduit(id, this.produit).subscribe(() => {
      this.router.navigate(['/produits']);
    });
  }
}

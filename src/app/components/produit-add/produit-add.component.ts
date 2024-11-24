import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.css']
})
export class ProduitAddComponent implements OnInit {
  produitForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      marque: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addProduit(): void {
    if (this.produitForm.invalid) {
      this.produitForm.markAllAsTouched();
      return; // Empêche la soumission si le formulaire est invalide
    }

    const produit = this.produitForm.value;
    this.produitService.addProduit(produit).subscribe(() => {
      this.router.navigate(['/produits']);
    });
  }
}

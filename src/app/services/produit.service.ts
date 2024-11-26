import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8080/SaleManagementService/api/produits';

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  // Récupérer un produit par ID
  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }

  // Ajouter un produit
  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/add`, produit);
  }

  // Mettre à jour un produit
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/${id}`, produit);
  }

  // Supprimer un produit par ID
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Vider tous les produits (si supporté par l'API)
  deleteAllProduits(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vider`);
  }

  getTopStockedProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/top-stocked`);
  }
}

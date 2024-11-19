import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8080/ProduitsService/api/produits'; 

  
  constructor(private http: HttpClient) { }

  // Fetch all clients
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  // Fetch a single client by ID
  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }

  // Create a new client
  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/add`, produit); 
  }
  
  // Update a client
  updateProduit(id: number, client: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/${id}`, client);
  }

  // Delete a client
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

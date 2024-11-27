import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vente } from '../models/Vente';
@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private baseUrl = 'http://localhost:8080/SaleManagementService/api/ventes'; // URL de l'API xoxo

  constructor(private http: HttpClient) { }

  // Fetch all clients
  getVents(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.baseUrl);
  }

  // Fetch a single client by ID
  getVente(id: number): Observable<Vente> {
    return this.http.get<Vente>(`${this.baseUrl}/${id}`);
  }

  // Create a new client
  createVente(client: Vente): Observable<Vente> {
    return this.http.post<Vente>(this.baseUrl, client);
  }

  // Update a client
  updateVente(id: number, vente: Vente): Observable<Vente> {
    return this.http.put<Vente>(`${this.baseUrl}/${id}`, vente);
  }

  // Delete a client
  deleteVente(id: number): Observable<Vente> {
    return this.http.delete<Vente>(`${this.baseUrl}/${id}`);
  }
 //xoxo pour avoir les ventes par date

 /*
{
 id produit +  date de la vente

 }
 */ 
  getVentebyDate(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl}/par-date`);
  }


  prixTotal(id:number){
    return this.http.get<number>(`${this.baseUrl}/${id}/prix-total`);
  }
  
}
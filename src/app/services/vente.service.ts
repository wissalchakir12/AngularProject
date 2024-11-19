import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vente } from '../models/Vente';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  private baseUrl = 'http://localhost:8080/SaleManagementService/api/ventes'; // URL de l'API pour les ventes

  constructor(private http: HttpClient) {}

  // Récupérer toutes les ventes
  getVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.baseUrl);
  }

  // Récupérer une vente par son ID
  getVente(id: number): Observable<Vente> {
    return this.http.get<Vente>(`${this.baseUrl}/${id}`);
  }

  // Créer une nouvelle vente
  createVente(vente: Vente): Observable<Vente> {
    return this.http.post<Vente>(`${this.baseUrl}`, vente);
  }

  // Mettre à jour une vente existante
  updateVente(id: number, vente: Vente): Observable<Vente> {
    return this.http.put<Vente>(`${this.baseUrl}/${id}`, vente);
  }

  // Supprimer une vente
  deleteVente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

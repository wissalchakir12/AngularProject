import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<string>(''); // Initialisation avec une chaîne vide et  partager un terme de recherche entre différents composants.
  currentSearchTerm = this.searchTermSource.asObservable(); // Observable pour ecouter les termes de recherche saisie par l'utilisateur

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}

import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];        // Tous les clients
  filteredClients: Client[] = []; // Clients filtrés

  constructor(
    private clientService: ClientService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Récupère les clients depuis l'API
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.filteredClients = data; // Initialise les clients filtrés
    });

    // Écoute les termes de recherche
    this.searchService.currentSearchTerm.subscribe(term => {
      this.filterClients(term);
    });
  }

  filterClients(term: string): void {
    this.filteredClients = this.clients.filter(client =>
      Object.values(client).some(value =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );
  }
  
  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== id);
      this.filterClients(''); // Met à jour les clients filtrés après suppression
    });
  }
}

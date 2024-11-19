import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente.service';
import { Vente } from '../../models/Vente';

@Component({
  selector: 'app-ventes',
  templateUrl: '../../components/vente-list/vente-list.component.html',
  styleUrls: ['./../../components/vente-list/vente-list.component.css'],
})
export class VenteListComponent implements OnInit {
  ventes: Vente[] = [];

  constructor(private venteService: VenteService) {}

  ngOnInit(): void {
    this.getAllVentes();
  }

  // Récupérer toutes les ventes
  getAllVentes(): void {
    this.venteService.getVentes().subscribe(
      (data) => {
        this.ventes = data;
        console.log('Ventes récupérées :', this.ventes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des ventes :', error);
      }
    );
  }
  deleteVente(id: number): void {
    this.venteService.deleteVente(id).subscribe(() => {
    this.ventes = this.ventes.filter(vente => vente.id !== id);
    });
  }
}



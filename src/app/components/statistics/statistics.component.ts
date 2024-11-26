import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/Produit';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // Référence à Highcharts
  chartOptions: Highcharts.Options = {  // Configuration du graphique
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Top 5 des produits en stock'
    },
    xAxis: {
      categories: [],  // Les noms des produits seront ici
      title: {
        text: 'Nom du produit'
      }
    },
    yAxis: {
      title: {
        text: 'Quantité en stock'
      }
    },
    series: [{
      type: 'pie',
      name: 'Quantité en stock',
      data: [], // Les quantités seront ici
      color: '#B0B0B0' 
    }]
  };

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.loadTopStockedProducts();
  }

  loadTopStockedProducts() {
    this.produitService.getTopStockedProducts().subscribe((produits: Produit[]) => {
      // Récupérer les noms des produits et les quantités
      const categories = produits.map(p => p.nom); // Supposez que chaque produit a un champ "nom"
      const data = produits.map(p => p.qteStock); // Supposez que chaque produit a un champ "quantite"

      // Mettre à jour les options du graphique
      this.chartOptions = {
        ...this.chartOptions,
        xAxis: {
          categories: categories,
          title: {
            text: 'Nom du produit'
          }
        },
        series: [{
          type: 'bar',
          name: 'Quantité en stock',
          data: data,
          color: 'green' // Définir la couleur des barres en gris
        }]
      };
    });
  }
}

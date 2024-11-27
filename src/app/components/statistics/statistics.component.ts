import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProduitService } from '../../services/produit.service';
import { Produit} from '../../models/Produit';
import { Vente} from '../../models/Vente';

import  {VenteService} from '../../services/vente.service'


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  // Référence à Highcharts
  Highcharts: typeof Highcharts = Highcharts; 

  //xoxo les option dyal l proquits hihi <3
  chartOptions: Highcharts.Options = {  
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

// le graph cercle <3
  chartOptionscir: Highcharts.Options = {  
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

  //graphe dyal les ventes <3
  salesChartOptions: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Quantité vendue par date'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Quantité vendue'
      }
    },
    series: [{
      type: 'line',
      name: 'Quantité vendue',
      data: []
    }]
  };

  constructor(private produitService: ProduitService,
    private venteService: VenteService
    
  ) {}

  ngOnInit() {
    this.loadTopStockedProducts();
    this.loadSalesData();
    this.loadTopStockedProductsCircle();
  }

  loadTopStockedProducts() {
    this.produitService.getTopStockedProducts().subscribe((produits: Produit[]) => {
      // Récupérer les noms des produits et les quantités
      const categories = produits.map(p => p.nom); 
      const data = produits.map(p => p.qteStock); 

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
  //2
  loadTopStockedProductsCircle() {
  this.produitService.getTopStockedProducts().subscribe((produits: Produit[]) => {
    // Récupérer les noms des produits et les quantités
    const data = produits.map(p => ({
      name: p.nom,  // Le nom du produit
      y: p.qteStock // La quantité en stock
    }));

    // Mettre à jour les options du graphique
    this.chartOptionscir = {
      ...this.chartOptionscir,
      series: [{
        type: 'pie',
        name: 'Quantité en stock',
        slicedOffset: 20,
        data: data, // Passer les données formatées avec le nom et la quantité
        color: 'green' // Définir la couleur des tranches
      }]
    };
  });
}

  loadSalesData() {
    this.venteService.getVentebyDate().subscribe((ventes: Vente[]) => {
      // Trier les ventes par date
      const ventesTriees = ventes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
      // Récupérer les dates et les quantités des ventes triées
      const categories = ventesTriees.map(v => v.date);
      const data = ventesTriees.map(v => v.quantite);
  
      // Mettre à jour les options du graphique
      this.salesChartOptions = {
        ...this.salesChartOptions,
        xAxis: {
          categories: categories
        },
        series: [{
          type: 'line',
          name: 'Quantité vendue',
          data: data,
          color:"red"
        }]
      };
    });
  }
  
}

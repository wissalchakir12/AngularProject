import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  Highcharts: typeof Highcharts = Highcharts; // Référence à Highcharts
  chartOptions: Highcharts.Options = {  // Configuration du graphique
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Top 5 des produits en stock'
    },
    xAxis: {
      categories: ['Produit 1', 'Produit 2', 'Produit 3', 'Produit 4', 'Produit 5']
    },
    yAxis: {
      title: {
        text: 'Quantité en stock'
      }
    },
    series: [{
      type: 'bar',
      name: 'Quantité en stock',
      data: [65, 59, 80, 81, 56]
    }]
  };
}

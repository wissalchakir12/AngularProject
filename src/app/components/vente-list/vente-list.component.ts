import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente.service';
import { Vente } from '../../models/Vente';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { ProduitService } from '../../services/produit.service';
import { SearchService } from '../../shared/search.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ventes',
  templateUrl: '../../components/vente-list/vente-list.component.html',
  styleUrls: ['./../../components/vente-list/vente-list.component.css'],
})
export class VenteListComponent implements OnInit {
  ventes: Vente[] = [];
  filteredVentes: Vente[] = [];
  chiffreAffaire: number = 0; // Propriété pour stocker le chiffre d'affaires total

  constructor(
    private http: HttpClient,
    private venteService: VenteService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.venteService.getVents().subscribe((data: Vente[]) => {
      const ventesWithDetails = data.map((vente) => {
        this.clientService.getClient(vente.client).subscribe((client) => {
          vente.clientName = client.nom;
        });

        this.produitService.getProduitById(vente.produit).subscribe((produit) => {
          vente.produitName = produit.nom;
        });

        this.venteService.prixTotal(vente.id).subscribe((prixTotal) => {
          vente.prixTotal = prixTotal;

          // Recalculer le chiffre d'affaires après avoir ajouté le prix total
          this.calculateChiffreAffaire();
        });

        return vente;
      });

      this.ventes = ventesWithDetails;
      this.filteredVentes = ventesWithDetails; 
    });

    this.searchService.currentSearchTerm.subscribe((term) => {
      this.filterVentes(term);
    });
  }

  // Filtrer les ventes
  filterVentes(term: string): void {
    this.filteredVentes = this.ventes.filter(
      (vente) =>
        vente.clientName?.toLowerCase().includes(term.toLowerCase()) ||
        vente.produitName?.toLowerCase().includes(term.toLowerCase())
    );
  }

  // CA ==> chiffre d'affaire total
  calculateChiffreAffaire(): void {
    this.chiffreAffaire = this.ventes.reduce((total, vente) => {
      return total + (vente.prixTotal || 0);
    }, 0);
    
    // pour arrondir : 2 ar9am wra fassila hihi 
    this.chiffreAffaire = parseFloat(this.chiffreAffaire.toFixed(2));
  }
  
  // Supprimer une vente
  deleteVente(id: number): void {
    this.venteService.deleteVente(id).subscribe(() => {
      this.ventes = this.ventes.filter((vente) => vente.id !== id);
      this.calculateChiffreAffaire(); // Recalculer après suppression
      this.filterVentes('');
    });
  }
  generateInvoice(vente: Vente): void {
    const invoiceContent = `
   <div style="font-family: 'Arial', sans-serif; margin: 30px; padding: 20px; border: 1px solid #ccc; width:100vw; height:100%; background-color: #f9f9f9;">
  <!-- En-tête de l'entreprise -->
  <header style="border-bottom: 2px solid #ddd; padding-bottom: 20px; margin-bottom: 30px; text-align: center;">
    <h1 style="color: #2C3E50;">Facture</h1>
    <p style="font-size: 18px; font-weight: bold; color: #34495E;">Entreprise : Electro Wissal</p>
    <p style="font-size: 16px; color: #7F8C8D;">123, Rue des Entrepreneurs, Casablanca, Maroc</p>
    <p style="font-size: 16px; color: #7F8C8D;">Téléphone : +212 5 22 123 456 | Email : <a href="mailto:contact@entreprise.ma" style="color: #2980B9;">contact@entreprise.ma</a></p>
    <p style="font-size: 14px; color: #7F8C8D;">RC : 123456 | IF : 789012</p>
  </header>

  <!-- Détails de la vente -->
  <section style="margin-bottom: 30px;">
    <h2 style="color: #2C3E50;">Détails de la Vente</h2>
    <p style="font-size: 16px; color: #34495E;"><strong>ID de la Vente :</strong> ${vente.id}</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Client :</strong> ${vente.clientName}</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Produit :</strong> ${vente.produitName}</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Quantité :</strong> ${vente.quantite}</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Prix Total :</strong> ${vente.prixTotal} MAD</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Date de la Vente :</strong> ${vente.date}</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Date de la Facture :</strong> ${new Date().toLocaleDateString()}</p>
  </section>

  <!-- Informations de paiement -->
  <section style="margin-bottom: 30px;">
    <h2 style="color: #2C3E50;">Informations de Paiement</h2>
    <p style="font-size: 16px; color: #34495E;"><strong>Méthode de Paiement :</strong> Virement bancaire</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Compte Bancaire :</strong> XXXXXXX - Banque ABC</p>
    <p style="font-size: 16px; color: #34495E;"><strong>Conditions :</strong> Paiement sous 30 jours.</p>
  </section>

  <!-- Conditions générales -->
  <section style="margin-bottom: 30px;">
    <h2 style="color: #2C3E50;">Conditions Générales</h2>
    <p style="font-size: 16px; color: #34495E;">
      Tous les produits et services sont soumis aux termes et conditions stipulés dans nos politiques commerciales. Aucune réclamation ne sera acceptée après un délai de 7 jours suivant la réception de la commande.
    </p>
    <p style="font-size: 16px; color: #34495E;">
      Merci de nous contacter pour toute question ou assistance concernant cette facture.
    </p>
  </section>

  <!-- Footer -->
  <footer style="border-top: 2px solid #ddd; padding-top: 15px; margin-top: 20px; text-align: center; color: #7F8C8D;">
    <p style="font-size: 16px;">Merci pour votre confiance !</p>
    <p style="font-size: 14px;">Electro Wissal | © ${new Date().getFullYear()}</p>
  </footer>
</div>


    `;
  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = invoiceContent;
    document.body.appendChild(tempDiv);
  
    html2canvas(tempDiv).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save(`Facture_Vente_${vente.id}.pdf`);
      document.body.removeChild(tempDiv);
    });
  }
  

}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Vérifie si l'utilisateur est connecté
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  logout() {
    this.authService.logout(); // Déconnexion
  }
}
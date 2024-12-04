import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { username: '', password: '' };
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
      token => {
        this.authService.setToken(token); // Save the token
        this.loginError = null;
        this.router.navigate(['/']); // Redirect after login
      },
      error => {
        this.loginError = error.message;
      }
    );
  }

  logout() {
    this.authService.logout(); // Call the logout method
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Check if the user is authenticated
  }
}

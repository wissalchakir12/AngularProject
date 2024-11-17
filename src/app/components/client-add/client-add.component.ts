import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  addClient(): void {
    // Marque tous les champs comme touchés lorsque l'utilisateur soumet le formulaire
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return; // Empêche la soumission si le formulaire est invalide
    }

    const client = this.clientForm.value;
    this.clientService.createClient(client).subscribe(() => {
      this.router.navigate(['/clients']);
    });
  }
}

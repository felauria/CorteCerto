import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  emailError: string = '';
  router = inject(Router);

  emailsValidos = ['teste@teste.com', 'teste2@teste.com', 'userTeste'];

  continue() {
    if (this.email) {
      if (this.emailsValidos.includes(this.email)) {
        this.router.navigate(['/home']);
      } else {
        this.emailError = 'Email inválido!';
      }
    } else {
      this.emailError = 'Este campo é obrigatório!';
    }
  }
}

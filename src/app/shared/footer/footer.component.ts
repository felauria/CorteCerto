import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <nav class="footer-links">
        <a routerLink="/">Home</a>
        <a routerLink="/sobre">Sobre nós</a>
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/clientes">Clientes</a>
        <a routerLink="/agendamentos">Agendamentos</a>
      </nav>
      <img src="assets/logo-corte-certo.svg" alt="Logo" class="footer-logo" />
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #2d3e50;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    .footer-links a {
      color: #ddd;
      margin-right: 1.5rem;
      text-decoration: none;
      font-weight: 500;
    }
    .footer-links a:hover {
      color: #25b19e;
    }
    .footer-logo {
      height: 36px;
      filter: brightness(0) invert(1);
    }
  `]
})
export class FooterComponent {}

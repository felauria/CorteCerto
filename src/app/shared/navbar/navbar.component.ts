import { Component } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userName = 'Felipe Lauria';

  constructor(private router: Router) {}

  logout() {
    // Implemente sua lógica de logout aqui
    console.log('Usuário saiu');
    this.router.navigate(['/login']);
  }
}

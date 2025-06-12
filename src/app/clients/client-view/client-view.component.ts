import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
})
export class ClientViewComponent implements OnInit {
  cliente: any = null;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.clientService.getClienteById(id).subscribe((cliente) => {
        this.cliente = cliente;
      });
    }
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }
}

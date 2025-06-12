import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ClientService } from "../../services/client.service";
import { MatIconModule } from "@angular/material/icon";

interface Cliente {
  id: number;
  nome: string;
  avatarUrl?: string;
}

@Component({
  selector: "app-clientes",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    MatIconModule,
  ],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filtroNome: string = "";

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  get clientesFiltrados(): Cliente[] {
    return this.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  verCliente(id: number) {
    this.router.navigate(['/clientes/visualizar', id]);
  }

  editarCliente(id: number) {
    this.router.navigate(["/clientes/editar", id]);
  }

  deletarCliente(id: number) {
    if (confirm("Deseja realmente excluir este cliente?")) {
      this.clientService.excluirCliente(id).subscribe(() => {
        this.carregarClientes();
      });
    }
  }

  novoCliente() {
    this.router.navigate(["/clientes/novo"]);
  }
}

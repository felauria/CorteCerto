import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface Cliente {
  id: number;
  nome: string;
  avatarUrl?: string; // pode deixar vazio e usar avatar padrão
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
})
export class ClientesComponent {
  clientes: Cliente[] = [
    { id: 1, nome: 'Felipe Lauria Fialho' },
    { id: 2, nome: 'Maria Silva' },
    { id: 3, nome: 'João Pereira' },
    { id: 4, nome: 'Ana Souza' },
    // adicione quantos quiser...
  ];

  filtroNome: string = '';

  get clientesFiltrados(): Cliente[] {
    return this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  verCliente(id: number) {
    console.log('Ver cliente', id);
    // implementar navegação para detalhes
  }

  editarCliente(id: number) {
    console.log('Editar cliente', id);
    // implementar navegação para edição
  }

  deletarCliente(id: number) {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clientes = this.clientes.filter(c => c.id !== id);
    }
  }

  novoCliente() {
    console.log('Cadastrar novo cliente');
    // implementar navegação para cadastro
  }
}

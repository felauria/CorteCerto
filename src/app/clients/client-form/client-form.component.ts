import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
})
export class ClientFormComponent implements OnInit {
  nomeCompleto: string = '';
  telefone: string = '';
  dataNascimento: string = '';
  plano: string = 'Avulso';
  observacao: string = '';
  fotoCliente: File | null = null;

  planos = ['Avulso', 'Pacote Básico', 'Pacote Premium'];
  editando: boolean = false;
  idCliente?: number;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idCliente) {
      this.editando = true;
      this.clientService.getClienteById(this.idCliente).subscribe(cliente => {
        this.nomeCompleto = cliente.nome || '';
        this.telefone = cliente.telefone || '';
        this.dataNascimento = cliente.dataNascimento || '';
        this.plano = cliente.plano || 'Avulso';
        this.observacao = cliente.observacao || '';
      });
    }
  }

  onFotoSelecionada(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoCliente = event.target.files[0];
    }
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }

  salvar() {
    const cliente = {
      nome: this.nomeCompleto,
      telefone: this.telefone,
      dataNascimento: this.dataNascimento,
      plano: this.plano,
      observacao: this.observacao,
      // avatarUrl: pode ser implementado depois
    };

    if (this.editando && this.idCliente) {
      this.clientService.atualizarCliente(this.idCliente, cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clientService.adicionarCliente(cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}

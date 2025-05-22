import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
})
export class ClientFormComponent {
  nomeCompleto: string = '';
  telefone: string = '';
  dataNascimento: string = '';
  plano: string = 'Avulso';
  observacao: string = '';
  fotoCliente: File | null = null;

  planos = ['Avulso', 'Pacote Básico', 'Pacote Premium'];

  onFotoSelecionada(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoCliente = event.target.files[0];
      // Aqui você pode implementar a pré-visualização se quiser
    }
  }

  voltar() {
    // implementar navegação para voltar (exemplo: router.navigate(['/clientes']))
  }

  salvar() {
    // implementar lógica para salvar cliente
    console.log({
      nomeCompleto: this.nomeCompleto,
      telefone: this.telefone,
      dataNascimento: this.dataNascimento,
      plano: this.plano,
      observacao: this.observacao,
      fotoCliente: this.fotoCliente,
    });
  }
}

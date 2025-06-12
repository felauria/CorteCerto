import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentService } from '../../services/appointments.service';
import { MatIconModule } from '@angular/material/icon'; // Adicione esta linha

interface Appointment {
  nome: string;
  data: string;
  hora: string;
  pacote?: string;
  descricao: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    RouterLink,
    MatIconModule, // Adicione aqui
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  agendamentosHoje: Appointment[] = [];
  proximosAgendamentos: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.carregarAgendamentosHoje();
    this.carregarProximosAgendamentos();
  }

  carregarAgendamentosHoje() {
    this.appointmentService.getAgendamentosHoje().subscribe((data) => {
      this.agendamentosHoje = data.map((item) => ({
        nome: item.cliente?.nome || item.agendamento.nome,
        data: this.formatarData(item.agendamento.data),
        hora: item.agendamento.hora,
        pacote: item.agendamento.pacote,
        descricao: item.agendamento.descricao,
      }));
    });
  }

  carregarProximosAgendamentos() {
    this.appointmentService.getAgendamentos().subscribe((data) => {
      const hoje = new Date();
      this.proximosAgendamentos = data
        .filter((item) => {
          const dataAgendamento = new Date(
            item.agendamento.data + 'T' + item.agendamento.hora
          );
          return dataAgendamento > hoje;
        })
        .sort((a, b) => {
          const dataA = new Date(a.agendamento.data + 'T' + a.agendamento.hora);
          const dataB = new Date(b.agendamento.data + 'T' + b.agendamento.hora);
          return dataA.getTime() - dataB.getTime();
        })
        .map((item) => ({
          nome: item.cliente?.nome || item.agendamento.nome,
          data: this.formatarData(item.agendamento.data),
          hora: item.agendamento.hora,
          pacote: item.agendamento.pacote,
          descricao: item.agendamento.descricao,
        }));
    });
  }

  private formatarData(data: string): string {
    if (!data) return '';
    const [_, mes, dia] = data.split('-');
    return `${dia}/${mes}`;
  }
}

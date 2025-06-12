import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatIconModule } from '@angular/material/icon'; // Importando o módulo de ícones do Angular Material

interface Appointment {
  id: number;
  clientName: string;
  date: string;
  time: string;
  servicos: string[];
  pacote?: string;
  valor?: number;
}

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    MatIconModule, // Importando o módulo de ícones do Angular Material
  ],
  providers: [AppointmentService],
})
export class AppointmentListComponent implements OnInit {
  allAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  filterClient: string = '';
  filterDate: string = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAgendamentos().subscribe({
      next: (data) => {
        this.allAppointments = data.map((item: any) => ({
          id: item.agendamento.id,
          clientName: item.cliente?.nome || '',
          date: item.agendamento.data,
          time: item.agendamento.hora,
          servicos: item.agendamento.servicos || [],
          pacote: item.agendamento.pacote,
          valor: item.agendamento.valor,
        }));
        this.filteredAppointments = [...this.allAppointments];
      },
      error: () => {
        alert('Erro ao carregar agendamentos!');
      }
    });
  }

  applyFilters(): void {
    this.filteredAppointments = this.allAppointments.filter(app => {
      const matchesClient = this.filterClient
        ? app.clientName.toLowerCase().includes(this.filterClient.toLowerCase())
        : true;
      const matchesDate = this.filterDate
        ? app.date === this.filterDate
        : true;
      return matchesClient && matchesDate;
    });
  }

  formatarServicos(servicos: string[]): string {
    if (!servicos || servicos.length === 0) return '';
    if (servicos.length === 1) return servicos[0];
    if (servicos.length === 2) return servicos.join(' e ');
    return servicos.slice(0, -1).join(', ') + ' e ' + servicos[servicos.length - 1];
  }

  addNewAppointment(): void {
    this.router.navigate(['/agendamentos/novo']);
  }

  editAppointment(appointment: Appointment): void {
    this.router.navigate(['/agendamentos/editar', appointment.id]);
  }

  viewAppointment(appointment: any) {
    this.router.navigate(['/agendamentos/visualizar', appointment.id]);
  }

  deleteAppointment(appointment: any) {
    if (confirm('Tem certeza que deseja deletar este agendamento?')) {
      this.appointmentService.excluirAgendamento(appointment.id).subscribe({
        next: () => {
          alert('Agendamento deletado com sucesso!');
          this.loadAppointments();
        },
        error: () => {
          alert('Erro ao deletar agendamento!');
        }
      });
    }
  }
}

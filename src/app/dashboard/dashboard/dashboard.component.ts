import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { AppointmentService } from '../../services/appointments.service';
import { ClientService } from '../../services/client.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  agendamentos: any[] = [];
  clientes: any[] = [];

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  barChartLabels: string[] = [];
  barChartData: any[] = [{ data: [], label: 'Cortes por mês' }];
  barChartType: ChartType = 'bar';

  constructor(
    private appointmentService: AppointmentService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.clientService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.appointmentService.getAgendamentos().subscribe(agendamentos => {
        this.agendamentos = agendamentos;
        this.prepararGraficos();
      });
    });
  }

  prepararGraficos() {
    this.prepararGraficoPizza();
    this.prepararGraficoBarras();
  }

  prepararGraficoPizza() {
    const now = new Date();
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = String(now.getFullYear());

    const agendamentosMes = this.agendamentos.filter(a =>
      a.data.startsWith(`${ano}-${mes}`)
    );

    const contagem: { [clienteId: number]: number } = {};
    agendamentosMes.forEach(a => {
      contagem[a.cliente_id] = (contagem[a.cliente_id] || 0) + 1;
    });

    this.pieChartLabels = Object.keys(contagem)
      .map(id => {
        const cliente = this.clientes.find(c => c.id == +id);
        return cliente ? cliente.nome : 'Desconhecido';
      });
    this.pieChartData = Object.values(contagem);
  }

  prepararGraficoBarras() {
    const ano = String(new Date().getFullYear());
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    const cortesPorMes = Array(12).fill(0);

    this.agendamentos.forEach(a => {
      if (a.data.startsWith(ano)) {
        const mes = parseInt(a.data.split('-')[1], 10) - 1;
        cortesPorMes[mes]++;
      }
    });

    this.barChartLabels = meses;
    this.barChartData = [{ data: cortesPorMes, label: 'Cortes por mês' }];
  }
}

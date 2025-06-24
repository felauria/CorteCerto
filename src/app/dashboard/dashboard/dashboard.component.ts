import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AppointmentService } from '../../services/appointments.service';
import { ClientService } from '../../services/client.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  agendamentos: any[] = [];
  clientes: any[] = [];

  totalGanhos = 0;
  totalAgendamentos = 0;
  servicosContagem: { [key: string]: number } = {};

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };
  pieChartType: ChartType = 'pie';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Cortes por mês' }]
  };
  barChartType: ChartType = 'bar';

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white'
        }
      }
    }
  };

  currentYear() {
    return new Date().getFullYear();
  }

  constructor(
    private appointmentService: AppointmentService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.appointmentService.getAgendamentos().subscribe(response => {
      // Desconstruindo os dados que vêm no response
      this.agendamentos = response.map((item: any) => item.agendamento);
      this.clientes = response.map((item: any) => item.cliente);

      this.processarDados();
    });
  }

  processarDados() {
    this.prepararGraficoPizza();
    this.prepararGraficoBarras();
    this.calcularTotais();
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

    const labels = Object.keys(contagem).map(id => {
      const cliente = this.clientes.find(c => c.id == +id);
      return cliente ? cliente.nome : 'Desconhecido';
    });
    const data = Object.values(contagem);

    this.pieChartData = {
      labels: labels,
      datasets: [{ data: data }]
    };
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

    this.barChartData = {
      labels: meses,
      datasets: [{ data: cortesPorMes, label: 'Cortes por mês' }]
    };
  }

  calcularTotais() {
    this.totalGanhos = this.agendamentos.reduce(
      (acc, a) => acc + (a.valor || 0),
      0
    );
    this.totalAgendamentos = this.agendamentos.length;

    this.servicosContagem = {};
    this.agendamentos.forEach(a => {
      if (a.servicos && Array.isArray(a.servicos)) {
        a.servicos.forEach((s: string) => {
          this.servicosContagem[s] = (this.servicosContagem[s] || 0) + 1;
        });
      }
    });
  }
}

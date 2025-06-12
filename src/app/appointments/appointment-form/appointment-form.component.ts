import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AppointmentService } from "../../services/appointments.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
  ],
})
export class AppointmentFormComponent implements OnInit {
  clientes: any[] = [];

  servicos = [
    { nome: "Corte", preco: 50, selecionado: false },
    { nome: "Tinta", preco: 100, selecionado: false },
    { nome: "Pezinho", preco: 30, selecionado: false },
    { nome: "Barba", preco: 40, selecionado: false },
    { nome: "Luzes", preco: 150, selecionado: false },
    { nome: "Hidratação", preco: 80, selecionado: false },
    { nome: "Sombrancelha", preco: 20, selecionado: false },
    { nome: "Prancha", preco: 60, selecionado: false },
    { nome: "Outro", preco: 70, selecionado: false },
  ];

  agendamento: any = {
    clienteId: null,
    data: "",
    hora: "",
    descricao: "",
  };

  valorTotal: number = 0;

  constructor(
    private clientService: ClientService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  atualizarValor() {
    this.valorTotal = this.servicos
      .filter((servico) => servico.selecionado)
      .reduce((total, servico) => total + servico.preco, 0);
  }

  toggleServico(servico: any) {
    servico.selecionado = !servico.selecionado;
    this.atualizarValor();
  }

  onSave() {
    const servicosSelecionados = this.servicos
      .filter((servico) => servico.selecionado)
      .map((servico) => servico.nome);

    const agendamentoFinal = {
      ...this.agendamento,
      servicos: servicosSelecionados,
      valor: this.valorTotal,
    };

    this.appointmentService.adicionarAgendamento(agendamentoFinal).subscribe({
      next: () => {
        alert("Agendamento salvo com sucesso!");
        this.router.navigate(["/home"]);
      },
      error: () => {
        alert("Erro ao salvar agendamento!");
      },
    });
  }

  voltar() {}
}

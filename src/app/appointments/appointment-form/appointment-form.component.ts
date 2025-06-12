import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AppointmentService } from "../../services/appointments.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
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
    cliente_id: null,
    data: "",
    hora: "",
    descricao: "",
  };

  valorTotal: number = 0;
  editando: boolean = false;
  idAgendamento?: number;

  constructor(
    private clientService: ClientService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarClientes();
    this.idAgendamento = Number(this.route.snapshot.paramMap.get("id"));
    if (this.idAgendamento) {
      this.editando = true;
      this.carregarAgendamento();
    }
  }

  carregarClientes() {
    this.clientService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  carregarAgendamento() {
    this.appointmentService
      .getAgendamentoById(this.idAgendamento!)
      .subscribe((res) => {
        const agendamento = res.agendamento;
        this.agendamento = {
          cliente_id: agendamento.cliente_id,
          data: agendamento.data,
          hora: agendamento.hora,
          horaFim: agendamento.horaFim,
          descricao: agendamento.descricao,
        };
        // Marcar serviços selecionados
        if (agendamento.servicos) {
          this.servicos.forEach((s) => {
            s.selecionado = agendamento.servicos.includes(s.nome);
          });
          this.atualizarValor();
        }
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
      cliente_id: this.agendamento.cliente_id ? parseInt(this.agendamento.cliente_id, 10) : null,
      servicos: servicosSelecionados,
      valor: this.valorTotal,
    };

    if (this.editando && this.idAgendamento) {
      this.appointmentService
        .atualizarAgendamento(this.idAgendamento, agendamentoFinal)
        .subscribe({
          next: () => {
            alert("Agendamento atualizado com sucesso!");
            this.router.navigate(["/agendamentos/lista"]);
          },
          error: () => {
            alert("Erro ao atualizar agendamento!");
          },
        });
    } else {
      this.appointmentService.adicionarAgendamento(agendamentoFinal).subscribe({
        next: () => {
          alert("Agendamento salvo com sucesso!");
          this.router.navigate(["/agendamentos/lista"]);
        },
        error: () => {
          alert("Erro ao salvar agendamento!");
        },
      });
    }
  }

  voltar() {
    this.router.navigate(["/agendamentos/lista"]);
  }
}

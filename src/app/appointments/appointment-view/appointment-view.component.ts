import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointments.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class AppointmentViewComponent implements OnInit {
  agendamento: any = null;
  cliente: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.appointmentService.getAgendamentoById(id).subscribe((res) => {
        this.agendamento = res.agendamento;
        this.cliente = res.cliente;
      });
    }
  }

  voltar() {
    this.router.navigate(['/agendamentos/lista']);
  }
}

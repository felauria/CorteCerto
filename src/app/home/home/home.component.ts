import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  agendamentosHoje: Appointment[] = [
    {
      nome: 'Felipe Lauria',
      data: '24/02',
      hora: '15:00',
      pacote: 'Pacote básico',
      descricao: 'Cabelo, sobrancelha e barba.',
    },
    {
      nome: 'Guilherme Reis',
      data: '24/02',
      hora: '15:30',
      pacote: 'Pacote premium',
      descricao: 'Cabelo, luzes, sobrancelha e barba.',
    },
    {
      nome: 'Diogo Nogueira',
      data: '24/02',
      hora: '16:30',
      descricao: 'Cabelo e barba.',
    },
  ];

  proximosAgendamentos: Appointment[] = [
    {
      nome: 'Lucas Campos',
      data: '25/02',
      hora: '09:00',
      pacote: 'Pacote básico',
      descricao: 'Cabelo.',
    },
    {
      nome: 'Diogo Alves',
      data: '25/02',
      hora: '10:30',
      pacote: 'Pacote premium',
      descricao: 'Cabelo e sobrancelha.',
    },
    {
      nome: 'João Marcelo',
      data: '25/02',
      hora: '11:00',
      descricao: 'Cabelo e barba.',
    },
  ];
}

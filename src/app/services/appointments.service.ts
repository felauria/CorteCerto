import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/agendamentos';

  constructor(private http: HttpClient) {}

  getAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarAgendamento(agendamento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, agendamento);
  }

  atualizarAgendamento(id: number, agendamento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, agendamento);
  }

  excluirAgendamento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAgendamentoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAgendamentosByClienteId(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}

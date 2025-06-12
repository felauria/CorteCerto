export interface Cliente {
  id: number;
  nome: string;
  telefone?: string;
  dataNascimento?: string;
  plano?: string;
  observacao?: string;
  avatarUrl?: string;
  fotoCliente?: File | null;
}

export interface Appointment {
  clienteId: number;
  data: string;
  hora: string;
  horaFim?: string;
  pacote?: string;
  descricao: string;
  servicos: string[];
  valor?: number;
}

export interface Usuario {
  id?: number;
  username: string;
  password: string;
  nomeDaBarbearia: string;
  nome: string;
  sobrenome: string;
}

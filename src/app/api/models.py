from pydantic import BaseModel
from typing import Optional

class Cliente(BaseModel):
    id: int
    nome: str
    telefone: Optional[str] = None
    data_nascimento: Optional[str] = None
    plano: Optional[str] = None
    observacao: Optional[str] = None
    avatar_url: Optional[str] = None
    foto_cliente: Optional[str] = None

class Agendamento(BaseModel):
    nome: str
    cliente_id: int
    data: str
    hora: str
    pacote: Optional[str] = None
    descricao: str

class Usuario(BaseModel):
    id: Optional[int] = None
    username: str
    password: str
    nome_da_barbearia: str
    nome: str
    sobrenome: str

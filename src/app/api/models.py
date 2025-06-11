from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id: int
    description: str
    completed: bool = False

class Cliente(BaseModel):
    id: int
    nome: str
    avatar_url: Optional[str] = None
    telefone: Optional[str] = None
    data_nascimento: Optional[str] = None
    plano: Optional[str] = None
    observacao: Optional[str] = None
    foto_cliente: Optional[str] = None

class Agendamento(BaseModel):
    id: int
    nome: str
    data: str
    hora: str
    pacote: Optional[str] = None
    descricao: str

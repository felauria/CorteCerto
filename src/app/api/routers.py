from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
from datetime import datetime

router = APIRouter()
DB_PATH = Path(__file__).parent / "db.json"


def ler_db():
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def salvar_db(data):
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def get_cliente_by_id(db, cliente_id):
    return next((c for c in db.get("clientes", []) if c["id"] == cliente_id), None)


# Rotas de autenticação e usuários
@router.post("/auth/login")
def login(dados: dict):
    db = ler_db()
    usuarios = db.get("usuarios", [])
    for usuario in usuarios:
        if (
            usuario["username"] == dados["username"]
            and usuario["password"] == dados["password"]
        ):
            return {"message": "Login realizado com sucesso", "user": usuario}
    raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")


@router.post("/auth/register")
def register(dados: dict):
    db = ler_db()
    usuarios = db.get("usuarios", [])
    if any(u["username"] == dados["username"] for u in usuarios):
        raise HTTPException(status_code=400, detail="Usuário já existe")
    novo_id = max([u["id"] for u in usuarios], default=0) + 1
    novo_usuario = {
        "id": novo_id,
        "username": dados["username"],
        "password": dados["password"],
        "nomeDaBarbearia": dados.get("nomeDaBarbearia", ""),
        "nome": dados.get("nome", ""),
        "sobrenome": dados.get("sobrenome", ""),
    }
    usuarios.append(novo_usuario)
    db["usuarios"] = usuarios
    salvar_db(db)
    return {"message": "Usuário cadastrado com sucesso", "user": novo_usuario}


# Rotas de clientes
@router.get("/clientes")
def listar_clientes():
    db = ler_db()
    return db["clientes"]


@router.post("/clientes")
def adicionar_cliente(cliente: dict):
    db = ler_db()
    novo_id = max([c["id"] for c in db["clientes"]], default=0) + 1
    cliente["id"] = novo_id
    db["clientes"].append(cliente)
    salvar_db(db)
    return cliente


@router.put("/clientes/{cliente_id}")
def atualizar_cliente(cliente_id: int, dados: dict):
    db = ler_db()
    clientes = db["clientes"]
    for idx, cliente in enumerate(clientes):
        if cliente["id"] == cliente_id:
            clientes[idx].update(dados)
            salvar_db(db)
            return clientes[idx]
    raise HTTPException(status_code=404, detail="Cliente não encontrado")


@router.delete("/clientes/{cliente_id}")
def deletar_cliente(cliente_id: int):
    db = ler_db()
    clientes = db["clientes"]
    for idx, cliente in enumerate(clientes):
        if cliente["id"] == cliente_id:
            removido = clientes.pop(idx)
            salvar_db(db)
            return removido
    raise HTTPException(status_code=404, detail="Cliente não encontrado")


@router.get("/clientes/{cliente_id}")
def obter_cliente(cliente_id: int):
    db = ler_db()
    clientes = db["clientes"]
    for cliente in clientes:
        if cliente["id"] == cliente_id:
            return cliente
    raise HTTPException(status_code=404, detail="Cliente não encontrado")


# Rotas de agendamentos
@router.get("/agendamentos")
def listar_agendamentos():
    db = ler_db()
    agendamentos = db["agendamentos"]
    result = []
    for agendamento in agendamentos:
        cliente = get_cliente_by_id(db, agendamento["cliente_id"])
        result.append({"agendamento": agendamento, "cliente": cliente})
    return result


@router.post("/agendamentos")
def adicionar_agendamento(agendamento: dict):
    db = ler_db()
    novo_id = max([a["id"] for a in db["agendamentos"]], default=0) + 1
    agendamento["id"] = novo_id
    db["agendamentos"].append(agendamento)
    salvar_db(db)
    return agendamento


@router.put("/agendamentos/{agendamento_id}")
def atualizar_agendamento(agendamento_id: int, dados: dict):
    db = ler_db()
    agendamentos = db["agendamentos"]
    for idx, agendamento in enumerate(agendamentos):
        if agendamento["id"] == agendamento_id:
            agendamentos[idx].update(dados)
            salvar_db(db)
            return agendamentos[idx]
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")


@router.delete("/agendamentos/{agendamento_id}")
def deletar_agendamento(agendamento_id: int):
    db = ler_db()
    agendamentos = db["agendamentos"]
    for idx, agendamento in enumerate(agendamentos):
        if agendamento["id"] == agendamento_id:
            removido = agendamentos.pop(idx)
            salvar_db(db)
            return removido
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")


@router.get("/agendamentos/cliente/{cliente_id}")
def listar_agendamentos_por_cliente(cliente_id: int):
    db = ler_db()
    agendamentos = db["agendamentos"]
    agendamentos_cliente = [a for a in agendamentos if a["cliente_id"] == cliente_id]
    if not agendamentos_cliente:
        raise HTTPException(status_code=404, detail="Nenhum agendamento encontrado para este cliente")
    cliente = get_cliente_by_id(db, cliente_id)
    return [{"agendamento": a, "cliente": cliente} for a in agendamentos_cliente]


@router.get("/agendamentos/hoje")
def listar_agendamentos_hoje():
    db = ler_db()
    agendamentos = db["agendamentos"]
    hoje = datetime.now().date()
    agora = datetime.now().time()
    agendamentos_hoje = []
    for agendamento in agendamentos:
        data_str = agendamento.get("data")
        hora_str = agendamento.get("hora")
        if not data_str or not hora_str:
            continue
        try:
            data_agendamento = datetime.strptime(data_str, "%Y-%m-%d").date()
            hora_agendamento = datetime.strptime(hora_str, "%H:%M").time()
        except ValueError:
            continue
        if data_agendamento == hoje and hora_agendamento >= agora:
            cliente = get_cliente_by_id(db, agendamento["cliente_id"])
            agendamentos_hoje.append({"agendamento": agendamento, "cliente": cliente})
    return agendamentos_hoje


@router.get("/agendamentos/{agendamento_id}")
def obter_agendamento(agendamento_id: int):
    db = ler_db()
    agendamentos = db["agendamentos"]
    for agendamento in agendamentos:
        if agendamento["id"] == agendamento_id:
            cliente = get_cliente_by_id(db, agendamento["cliente_id"])
            return {"agendamento": agendamento, "cliente": cliente}
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")

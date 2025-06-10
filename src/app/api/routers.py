# src/app/routers.py
from fastapi import APIRouter, HTTPException
from typing import List
from .models import Task

router = APIRouter()

# Lista em memória para armazenamento de tarefas
tasks: List[Task] = []

@router.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks

@router.post("/tasks", response_model=Task)
async def add_task(task: Task):
    if any(t.id == task.id for t in tasks):
        raise HTTPException(status_code=400, detail="Task já existe com esse ID")
    tasks.append(task)
    return task

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int):
    for task in tasks:
        if task.id == task_id:
            return task
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

@router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, updated_task: Task):
    for index, task in enumerate(tasks):
        if task.id == task_id:
            tasks[index] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    for index, task in enumerate(tasks):
        if task.id == task_id:
            del tasks[index]
            return {"detail": "Tarefa deletada"}
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

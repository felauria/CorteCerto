from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

app = FastAPI(
    title="Corte Certo API",
    description="API para gerenciamento de barbearia.",
    version="1.0.0",
    docs_url="/docs",         # URL do Swagger
    redoc_url="/redoc"        # URL do Redoc (documentação alternativa)
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Ou ["*"] para liberar geral
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

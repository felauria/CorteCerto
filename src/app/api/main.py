from fastapi import FastAPI
from .routers import router

app = FastAPI(
    title="Corte Certo API",
    description="API para gerenciamento de barbearia.",
    version="1.0.0",
    docs_url="/docs",         # URL do Swagger
    redoc_url="/redoc"        # URL do Redoc (documentação alternativa)
)
app.include_router(router)

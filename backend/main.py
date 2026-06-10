from datetime import datetime

from fastapi import FastAPI
from sqlalchemy import text

from app.database.database import engine
from app.routers import clientes
from app.routers import servicios
from app.routers import visitas
from app.routers import dashboard
from app.routers import qr
from app.routers import qr_scan
from app.routers import crm
from app.routers import cliente_detail
from app.services.promociones import generar_promocion
from app.services.notificaciones import enviar_notificacion
from app.routers import analytics
from app.routers import auth
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="BarberIQ API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(visitas.router)

app.include_router(servicios.router)

app.include_router(clientes.router)

app.include_router(dashboard.router)

app.include_router(qr.router)

app.include_router(qr_scan.router)

app.include_router(crm.router)

app.include_router(cliente_detail.router)

app.include_router(analytics.router)

app.include_router(auth.router)


@app.get("/")
def home():
    return {
        "status": "ok",
        "message": "BarberIQ API funcionando"
    }

@app.get("/test-db")
def test_db():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT current_database()"))
        db_name = result.scalar()

    return {
        "database": db_name,
        "status": "conexion exitosa"
    }

import os

@app.get("/debug-env")
def debug_env():
    return {
        "DB_HOST": os.getenv("DB_HOST"),
        "DB_PORT": os.getenv("DB_PORT"),
        "DB_NAME": os.getenv("DB_NAME"),
        "DB_USER": os.getenv("DB_USER"),
    }
    
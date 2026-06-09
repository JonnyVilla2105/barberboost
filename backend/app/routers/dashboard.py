from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.cliente import Cliente
from app.models.visita import Visita

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
def get_clientes(empresa_id: int, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(
        Cliente.id_empresa == empresa_id
    ).all()

    return clientes

@router.get("/resumen")
def resumen(empresa_id: int, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(Cliente.id_empresa == empresa_id).count() or 0

    visitas = db.query(Visita).filter(Visita.id_empresa == empresa_id).count() or 0

    ingresos = db.query(
        func.coalesce(func.sum(Visita.valor_pagado), 0)
    ).scalar() or 0

    ingresos = float(ingresos)

    ticket = ingresos / visitas if visitas > 0 else 0

    return {
        "clientes": clientes,
        "visitas": visitas,
        "ingresos": ingresos,
        "ticket_promedio": round(ticket, 2)
    }
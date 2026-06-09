from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database.database import get_db
from app.models.cliente import Cliente
from app.models.visita import Visita

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/")
def get_clientes(empresa_id: int, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(
        Cliente.id_empresa == empresa_id
    ).all()

    return clientes

@router.get("/resumen")
def resumen(empresa_id: int, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(Cliente.id_empresa == empresa_id).all()
    visitas = db.query(Visita).filter(Visita.id_cliente == id_cliente).all()
    
    hoy = datetime.now()
    ultimo_mes = hoy - timedelta(days=30)

    activos = 0
    inactivos = 0
    vip = 0
    ingresos = 0

    for c in clientes:

        v_cliente = db.query(Visita).filter(
            Visita.id_cliente == c.id_cliente
        ).all()

        if len(v_cliente) >= 10:
            vip += 1

        if v_cliente:
            ultima = max(v.fecha_visita for v in v_cliente)

            if ultima >= ultimo_mes:
                activos += 1
            else:
                inactivos += 1

        for v in v_cliente:
            ingresos += v.valor_pagado or 0

    return {
        "total_clientes": len(clientes),
        "activos": activos,
        "inactivos": inactivos,
        "vip": vip,
        "ingresos_estimados": ingresos,
        "total_visitas": len(visitas)
    }
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.qr import ClienteQR
from app.models.visita import Visita

from app.services.crm_engine import procesar_cliente
from app.models.cliente import Cliente
from datetime import datetime

router = APIRouter(
    prefix="/qr",
    tags=["QR Scan"]
)

@router.post("/scan")
def scan_qr(data: dict, db: Session = Depends(get_db)):

    codigo_qr = data.get("codigo_qr")

    qr = db.query(ClienteQR).filter(
        ClienteQR.codigo_qr == codigo_qr
    ).first()

    if not qr:
        return {"error": "QR no válido"}

    # 1. crear visita
    nueva_visita = Visita(
        id_cliente=qr.id_cliente,
        id_servicio=1,
        valor_pagado=0,
        puntos_generados=10,
        observaciones="Registro por QR"
    )

    db.add(nueva_visita)
    db.commit()

    # 2. obtener cliente
    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == qr.id_cliente
    ).first()

    visitas = db.query(Visita).filter(
        Visita.id_cliente == qr.id_cliente
    ).all()

    total_visitas = len(visitas)

    ultima = max(v.fecha_visita for v in visitas) if visitas else datetime.now()
    dias = (datetime.now() - ultima).days

    # 3. CRM AUTOMÁTICO 🔥
    resultado = procesar_cliente(
        cliente=cliente,
        total_visitas=total_visitas,
        dias_sin_visita=dias,
        db=db
    )

    return {
        "mensaje": "Visita registrada + CRM ejecutado",
        "id_cliente": cliente.id_cliente,
        "cliente": cliente.nombre,
        "total_visitas": total_visitas,
        "dias_sin_visita": dias,
        "crm": resultado
    }
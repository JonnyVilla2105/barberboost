from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.cliente import Cliente
from app.models.visita import Visita
from app.services.notificaciones import enviar_notificacion
from app.services.promociones import generar_promocion
from app.services.segmentacion import clasificar_cliente

router = APIRouter(prefix="/crm", tags=["Cliente Detail"])


@router.get("/cliente/{id_cliente}")
def cliente_detalle(id_cliente: int, db: Session = Depends(get_db)):

    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

    if not cliente:
        return {"error": "Cliente no encontrado"}

    visitas = db.query(Visita).filter(
        Visita.id_cliente == id_cliente
    ).all()

    total_visitas = len(visitas)

    ultima_visita = None

    if visitas:
        fechas = [
            v.fecha_visita
            for v in visitas
            if v.fecha_visita is not None
        ]

        if fechas:
            ultima_visita = max(fechas)

    dias_sin_visita = 999

    if ultima_visita:
        dias_sin_visita = (datetime.now(ultima_visita.tzinfo) - ultima_visita).days

    segmento = clasificar_cliente(total_visitas, dias_sin_visita)

    promocion = generar_promocion(segmento, dias_sin_visita)

    notificacion = enviar_notificacion(
        cliente.nombre,
        promocion
    )

    return {
        "cliente": {
            "id": cliente.id_cliente,
            "nombre": cliente.nombre,
            "celular": cliente.celular
        },
        "total_visitas": total_visitas,
        "ultima_visita": ultima_visita,
        "dias_sin_visita": dias_sin_visita,
        "segmento": segmento,
        "promocion": promocion,
        "notificacion": notificacion,
        "historial": [
            {
                "fecha": v.fecha_visita,
                "servicio": v.id_servicio,
                "valor": v.valor_pagado
            }
            for v in visitas
        ]
    }
    
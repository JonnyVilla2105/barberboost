from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database.database import get_db
from app.models.cliente import Cliente
from app.models.visita import Visita
from sqlalchemy import text

router = APIRouter(prefix="/crm", tags=["CRM"])


@router.get("/")
def get_clientes(empresa_id: int = 1, db: Session = Depends(get_db)):
    return db.query(Cliente).filter(
        Cliente.id_empresa == empresa_id
    ).all()

@router.get("/clientes-resumen")
def clientes_resumen(empresa_id: int = 1, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(
        Cliente.id_empresa == empresa_id
    ).all()

    ids_clientes = [c.id_cliente for c in clientes]

    total_visitas = 0

    if ids_clientes:
        total_visitas = db.execute(
            text("""
                SELECT COUNT(*)
                FROM visita
                WHERE id_cliente = ANY(:ids)
            """),
            {"ids": ids_clientes}
        ).scalar()

    return {
        "total_clientes": len(clientes),
        "clientes_activos": 0,
        "clientes_inactivos": len(clientes),
        "total_visitas": total_visitas
    }

# @router.get("/clientes-resumen")
# def clientes_resumen(empresa_id: int = 1, db: Session = Depends(get_db)):

#     clientes = db.query(Cliente).filter(
#         Cliente.id_empresa == empresa_id
#     ).all()

#     ids_clientes = [c.id_cliente for c in clientes]

#     if ids_clientes:
#         total_visitas = db.query(Visita).filter(
#             Visita.id_cliente.in_(ids_clientes)
#         ).count()
#     else:
#         total_visitas = 0

#     return {
#         "total_clientes": len(clientes),
#         "clientes_activos": 0,
#         "clientes_inactivos": len(clientes),
#         "total_visitas": total_visitas
#     }


@router.get("/clientes-alerta")
def clientes_alerta(empresa_id: int = 1, db: Session = Depends(get_db)):

    clientes = db.query(Cliente).filter(
        Cliente.id_empresa == empresa_id
    ).all()

    alerta = []

    for cliente in clientes:
        visitas_cliente = db.query(Visita).filter(
            Visita.id_cliente == cliente.id_cliente,
            Visita.fecha_visita != None
        ).order_by(
            Visita.fecha_visita.desc()
        ).all()

        if not visitas_cliente:
            continue

        ultima_visita = visitas_cliente[0]

        fecha = ultima_visita.fecha_visita
        dias = (datetime.now(fecha.tzinfo) - fecha).days

        if dias > 20:
            alerta.append({
                "cliente": cliente.nombre,
                "dias_sin_visita": dias,
                "estado": "EN RIESGO"
            })

    return alerta
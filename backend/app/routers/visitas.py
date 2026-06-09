from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.visita import Visita
from app.schemas.visita import VisitaCreate

router = APIRouter(
    prefix="/visitas",
    tags=["Visitas"]
)


@router.post("/")
def crear_visita(
    visita: VisitaCreate,
    db: Session = Depends(get_db)
):
    puntos = int(visita.valor_pagado / 1000)

    nueva = Visita(
        id_cliente=visita.id_cliente,
        id_servicio=visita.id_servicio,
        valor_pagado=visita.valor_pagado,
        puntos_generados=puntos,
        observaciones=visita.observaciones
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    return nueva


@router.get("/")
def listar_visitas(
    db: Session = Depends(get_db)
):
    return db.query(Visita).all()
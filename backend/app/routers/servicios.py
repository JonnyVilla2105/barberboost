from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.database import get_db
from app.models.servicio import Servicio
from app.schemas.servicio import ServicioCreate

router = APIRouter(
    prefix="/servicios",
    tags=["Servicios"]
)

@router.post("/")
def crear_servicio(
    servicio: ServicioCreate,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            INSERT INTO servicio (
                id_empresa,
                nombre,
                precio,
                duracion,
                activo
            )
            VALUES (
                :id_empresa,
                :nombre,
                :precio,
                :duracion,
                :activo
            )
            RETURNING *
        """),
        {
            "id_empresa": 1,
            "nombre": servicio.nombre,
            "precio": servicio.precio,
            "duracion": servicio.duracion,
            "activo": True
        }
    )

    nuevo = result.mappings().first()

    db.commit()

    return dict(nuevo)


@router.get("/")
def listar_servicios(
    db: Session = Depends(get_db)
):
    return db.query(Servicio).all()


@router.get("/{id_servicio}")
def obtener_servicio(
    id_servicio: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Servicio)
        .filter(
            Servicio.id_servicio == id_servicio
        )
        .first()
    )


@router.delete("/{id_servicio}")
def eliminar_servicio(
    id_servicio: int,
    db: Session = Depends(get_db)
):

    registro = (
        db.query(Servicio)
        .filter(
            Servicio.id_servicio == id_servicio
        )
        .first()
    )

    db.delete(registro)
    db.commit()

    return {
        "mensaje": "Servicio eliminado"
    }
    
@router.put("/{id_servicio}/estado")
def cambiar_estado(
    id_servicio: int,
    db: Session = Depends(get_db)
):

    servicio = (
        db.query(Servicio)
        .filter(
            Servicio.id_servicio == id_servicio
        )
        .first()
    )

    servicio.activo = not servicio.activo

    db.commit()

    return servicio
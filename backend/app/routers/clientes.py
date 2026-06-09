from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.cliente import Cliente
from app.schemas.cliente import ClienteCreate
from app.dependencies.auth import get_empresa_id

router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)

@router.get("/")
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()

@router.get("/{id_cliente}")
def obtener_cliente(
    id_cliente: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Cliente)
        .filter(Cliente.id_cliente == id_cliente)
        .first()
    )


@router.post("/")
def crear_cliente(
    cliente: ClienteCreate,
    db: Session = Depends(get_db)
):
    nuevo = Cliente(
        id_empresa=1,
        nombre=cliente.nombre,
        celular=cliente.celular,
        correo=cliente.correo,
        fecha_nacimiento=cliente.fecha_nacimiento,
        puntos=0
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


@router.put("/{id_cliente}")
def actualizar_cliente(
    id_cliente: int,
    cliente: ClienteCreate,
    db: Session = Depends(get_db)
):
    registro = (
        db.query(Cliente)
        .filter(Cliente.id_cliente == id_cliente)
        .first()
    )

    if not registro:
        return {"error": "Cliente no encontrado"}

    registro.nombre = cliente.nombre
    registro.celular = cliente.celular
    registro.correo = cliente.correo
    registro.fecha_nacimiento = cliente.fecha_nacimiento

    db.commit()
    db.refresh(registro)

    return registro


@router.delete("/{id_cliente}")
def eliminar_cliente(
    id_cliente: int,
    db: Session = Depends(get_db)
):
    registro = (
        db.query(Cliente)
        .filter(Cliente.id_cliente == id_cliente)
        .first()
    )

    if not registro:
        return {"error": "Cliente no encontrado"}

    db.delete(registro)
    db.commit()

    return {"mensaje": "Cliente eliminado"}
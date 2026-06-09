from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import qrcode
import os

from app.database.database import get_db
from app.models.cliente import Cliente
from app.models.qr import ClienteQR

router = APIRouter(prefix="/qr", tags=["QR"])

@router.post("/generar/{id_cliente}")
def generar_qr(id_cliente: int, db: Session = Depends(get_db)):

    cliente = db.query(Cliente).filter(
        Cliente.id_cliente == id_cliente
    ).first()

    if not cliente:
        return {"error": "Cliente no existe"}

    codigo = f"BARBERIQ-{id_cliente:06d}"

    # guardar en DB
    qr_existente = db.query(ClienteQR).filter(
        ClienteQR.id_cliente == id_cliente
    ).first()

    if qr_existente:
        return {"codigo_qr": qr_existente.codigo_qr}

    nuevo = ClienteQR(
        id_cliente=id_cliente,
        codigo_qr=codigo
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    # generar imagen QR
    img = qrcode.make(codigo)

    path = f"static/qr_{id_cliente}.png"
    os.makedirs("static", exist_ok=True)
    img.save(path)

    return {
        "id_cliente": id_cliente,
        "codigo_qr": codigo,
        "qr_image": path
    }
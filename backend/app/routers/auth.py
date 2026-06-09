from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.usuario import Usuario
from fastapi import Header, HTTPException

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(
        Usuario.email == email,
        Usuario.password == password
    ).first()

    if not usuario:
        return {"error": "credenciales inválidas"}

    # Obtener el ID de la empresa
    id_empresa = usuario.id_empresa

    return {
        "mensaje": "login correcto",
        "usuario_id": usuario.id,
        "empresa_id": id_empresa
    }
    
    
    
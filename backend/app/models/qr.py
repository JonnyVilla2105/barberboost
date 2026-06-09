from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.base import Base

class ClienteQR(Base):
    __tablename__ = "cliente_qr"

    id_qr = Column(Integer, primary_key=True)
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"))
    codigo_qr = Column(String(100), unique=True)
    fecha_creacion = Column(DateTime, server_default=func.now())
    activo = Column(Boolean, default=True)
from sqlalchemy import Column, Integer, String, Date
from app.database.base import Base

class Cliente(Base):
    __tablename__ = "cliente"

    id_cliente = Column(Integer, primary_key=True, index=True)
    id_empresa = Column(Integer)

    nombre = Column(String(150))
    celular = Column(String(50))
    correo = Column(String(150))

    fecha_nacimiento = Column(Date)

    puntos = Column(Integer)
    codigo_qr = Column(String(100))
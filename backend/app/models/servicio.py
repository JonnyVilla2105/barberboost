from sqlalchemy import Column, Integer, String, Numeric, Boolean
from app.database.base import Base

class Servicio(Base):
    __tablename__ = "servicio"

    id_servicio = Column(Integer, primary_key=True, index=True)

    id_empresa = Column(Integer)

    nombre = Column(String(150))

    precio = Column(Numeric(12, 2))

    duracion = Column(Integer)

    activo = Column(Boolean)
    
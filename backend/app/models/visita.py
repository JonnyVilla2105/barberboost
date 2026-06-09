from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import func

from app.database.base import Base

class Visita(Base):

    __tablename__ = "visita"

    id_visita = Column(Integer, primary_key=True)

    id_cliente = Column(
        Integer,
        ForeignKey("cliente.id_cliente")
    )

    id_servicio = Column(
        Integer,
        ForeignKey("servicio.id_servicio")
    )

    fecha_visita = Column(DateTime, server_default=func.now())

    valor_pagado = Column(Numeric(12,2))

    puntos_generados = Column(Integer)

    observaciones = Column(Text)
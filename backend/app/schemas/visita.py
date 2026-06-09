from pydantic import BaseModel

class VisitaCreate(BaseModel):

    id_cliente: int

    id_servicio: int

    valor_pagado: float

    observaciones: str | None = None
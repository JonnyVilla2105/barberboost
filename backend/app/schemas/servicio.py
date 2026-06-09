from pydantic import BaseModel

class ServicioCreate(BaseModel):
    nombre: str
    precio: float
    duracion: int


class ServicioResponse(BaseModel):
    id_servicio: int
    nombre: str
    precio: float
    duracion: int

    model_config = {
        "from_attributes": True
    }
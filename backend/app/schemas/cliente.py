from pydantic import BaseModel
from datetime import date

class ClienteCreate(BaseModel):

    nombre: str

    celular: str

    correo: str | None = None

    fecha_nacimiento: date | None = None


class ClienteResponse(BaseModel):

    id_cliente: int

    nombre: str

    celular: str

    correo: str | None = None

    puntos: int | None = 0

    model_config = {
        "from_attributes": True
    }
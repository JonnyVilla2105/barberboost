from fastapi import Header, HTTPException

def get_empresa_id(x_empresa_id: int = Header(None)):
    if not x_empresa_id:
        raise HTTPException(
            status_code=401,
            detail="empresa_id no enviado"
        )

    return x_empresa_id
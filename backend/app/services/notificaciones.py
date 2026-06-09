from datetime import datetime

def enviar_notificacion(cliente, promocion):

    mensaje = promocion["mensaje"]

    print("📲 NOTIFICACIÓN ENVIADA")
    print(f"Cliente: {cliente}")
    print(f"Mensaje: {mensaje}")

    return {
        "estado": "enviado",
        "cliente": cliente,
        "mensaje": mensaje,
        "fecha": datetime.now()
    }
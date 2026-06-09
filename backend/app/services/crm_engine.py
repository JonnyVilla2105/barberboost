from app.services.segmentacion import clasificar_cliente
from app.services.promociones import generar_promocion
from app.services.notificaciones import enviar_notificacion

def procesar_cliente(cliente, total_visitas, dias_sin_visita):

    segmento = clasificar_cliente(total_visitas, dias_sin_visita)

    promocion = generar_promocion(segmento, dias_sin_visita)

    notificacion = enviar_notificacion(cliente, promocion)

    return {
        "segmento": segmento,
        "promocion": promocion,
        "notificacion": notificacion
    }
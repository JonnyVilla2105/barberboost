def generar_promocion(segmento, dias_sin_visita):

    if segmento == "VIP":
        return {
            "tipo": "beneficio",
            "mensaje": "🎁 VIP: 15% descuento exclusivo + bebida gratis"
        }

    if segmento == "INACTIVO":
        return {
            "tipo": "recuperacion",
            "mensaje": "🔥 Te extrañamos! 25% OFF para que regreses"
        }

    if segmento == "FRECUENTE":
        return {
            "tipo": "fidelizacion",
            "mensaje": "💈 10% descuento por tu constancia"
        }

    if segmento == "NUEVO":
        return {
            "tipo": "bienvenida",
            "mensaje": "🎉 Bienvenido! 20% OFF en tu próxima visita"
        }

    return {
        "tipo": "general",
        "mensaje": "💈 Te esperamos pronto en BarberIQ"
    }
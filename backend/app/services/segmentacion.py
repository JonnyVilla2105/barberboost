def clasificar_cliente(total_visitas, dias_sin_visita):

    # 🔴 prioridad: inactividad
    if dias_sin_visita > 30:
        return "INACTIVO"

    # 🟣 VIP
    if total_visitas >= 10:
        return "VIP"

    # 🟢 frecuente
    if total_visitas >= 5:
        return "FRECUENTE"

    # 🟡 nuevo
    return "NUEVO"
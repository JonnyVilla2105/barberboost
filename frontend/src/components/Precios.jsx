export default function Precios() {
  const planes = [
    {
      nombre: "Gratis",
      precio: "$0",
      detalle: "Para pruebas iniciales",
      features: ["Hasta 20 clientes", "Registro QR básico", "Dashboard básico"],
    },
    {
      nombre: "Pro",
      precio: "$49.900",
      detalle: "Para barberías en crecimiento",
      features: ["Clientes ilimitados", "Campañas", "Fidelización", "Alertas IA"],
    },
    {
      nombre: "Premium",
      precio: "$99.900",
      detalle: "Para cadenas o equipos",
      features: ["Multiempresa", "Reportes avanzados", "WhatsApp futuro", "Soporte"],
    },
  ];

  return (
    <div>
      <h2>Planes y Precios</h2>

      <div className="price-grid">
        {planes.map((p) => (
          <div className="price-card" key={p.nombre}>
            <h3>{p.nombre}</h3>
            <strong>{p.precio}</strong>
            <p>{p.detalle}</p>

            <ul>
              {p.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            <button>Elegir plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getCliente } from "../api/barberiq";

export default function ClientePerfil({ idCliente }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCliente(idCliente).then(setData).catch(console.error);
  }, [idCliente]);

  if (!data) return <p>Cargando cliente...</p>;

  if (data.error) return <p>{data.error}</p>;

  const c = data.cliente;

  return (
    <div>
      <h2>Perfil Cliente</h2>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Cliente</span>
          <strong>{c.nombre}</strong>
        </div>

        <div className="kpi-card">
          <span>Celular</span>
          <strong>{c.celular}</strong>
        </div>

        <div className="kpi-card">
          <span>Segmento</span>
          <strong>{data.segmento}</strong>
        </div>

        <div className="kpi-card">
          <span>Días sin visita</span>
          <strong>{data.dias_sin_visita}</strong>
        </div>
      </div>

      {data.promocion && (
        <div className="promo-box">
          <h3>Promoción recomendada</h3>
          <p>{data.promocion.mensaje}</p>
        </div>
      )}

      <h3>Historial de visitas</h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>
          {data.historial?.map((v, i) => (
            <tr key={i}>
              <td>{v.fecha}</td>
              <td>{v.servicio}</td>
              <td>$ {Number(v.valor || 0).toLocaleString("es-CO")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
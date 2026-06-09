import { useEffect, useState } from "react";
import { getClientes } from "../api/barberiq";

export default function InteligenciaIA() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  const clientesRiesgo = clientes.filter((c) => (c.puntos ?? 0) === 0);

  return (
    <div>
      <h2>Inteligencia IA</h2>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Clientes analizados</span>
          <strong>{clientes.length}</strong>
        </div>

        <div className="kpi-card">
          <span>Clientes en riesgo</span>
          <strong>{clientesRiesgo.length}</strong>
        </div>

        <div className="kpi-card">
          <span>Modelo IA</span>
          <strong>Reglas CRM</strong>
        </div>

        <div className="kpi-card">
          <span>Acción sugerida</span>
          <strong>Campaña</strong>
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>Clientes con posible riesgo</h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Puntos</th>
            <th>Riesgo</th>
            <th>Recomendación</th>
          </tr>
        </thead>

        <tbody>
          {clientesRiesgo.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.nombre}</td>
              <td>{c.celular}</td>
              <td>{c.puntos ?? 0}</td>
              <td>Alto</td>
              <td>Enviar promoción de retorno</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
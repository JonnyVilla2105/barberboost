import { useEffect, useState } from "react";
import { getFidelizacion } from "../api/barberiq";

export default function Fidelizacion() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getFidelizacion().then(setClientes).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Fidelización</h2>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Clientes fidelizados</span>
          <strong>{clientes.length}</strong>
        </div>

        <div className="kpi-card">
          <span>Puntos acumulados</span>
          <strong>
            {clientes.reduce((acc, c) => acc + (c.puntos || 0), 0)}
          </strong>
        </div>

        <div className="kpi-card">
          <span>Recompensa base</span>
          <strong>100 pts</strong>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Puntos</th>
            <th>Estado</th>
            <th>Recompensa</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.nombre}</td>
              <td>{c.celular}</td>
              <td>{c.puntos ?? 0}</td>
              <td>
                {(c.puntos ?? 0) >= 100 ? "Disponible" : "Acumulando"}
              </td>
              <td>
                {(c.puntos ?? 0) >= 100
                  ? "Corte con descuento"
                  : `Faltan ${100 - (c.puntos ?? 0)} pts`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

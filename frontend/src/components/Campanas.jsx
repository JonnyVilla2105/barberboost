import { useEffect, useState } from "react";
import { getCampanas } from "../api/barberiq";

export default function Campanas() {
  const [clientes, setClientes] = useState([]);
  const [segmento, setSegmento] = useState("Todos");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getCampanas().then(setClientes).catch(console.error);
  }, []);

  const enviarCampana = () => {
    setMensaje(`Campaña enviada a segmento: ${segmento}`);
  };

  return (
    <div>
      <h2>Campañas</h2>

      <div className="form-grid">
        <select
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
        >
          <option value="Todos">Todos los clientes</option>
          <option value="NUEVO">Clientes nuevos</option>
          <option value="FRECUENTE">Clientes frecuentes</option>
          <option value="VIP">Clientes VIP</option>
          <option value="INACTIVO">Clientes inactivos</option>
        </select>

        <input
          type="text"
          defaultValue="🔥 Promoción especial BarberIQ"
        />

        <button onClick={enviarCampana}>
          Enviar campaña
        </button>
      </div>

      {mensaje && <p className="success-message">{mensaje}</p>}

      <table className="data-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Puntos</th>
            <th>Estado campaña</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.nombre}</td>
              <td>{c.celular}</td>
              <td>{c.puntos ?? 0}</td>
              <td>Pendiente</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
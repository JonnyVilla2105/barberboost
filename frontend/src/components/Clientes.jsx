import { useEffect, useState } from "react";
import { getClientes, actualizarCliente, eliminarCliente } from "../api/barberiq";

function calcularSegmento(cliente) {
  const puntos = cliente.puntos ?? 0;

  if (puntos >= 300) return "VIP";
  if (puntos >= 100) return "Regular";
  if (puntos === 0) return "Nuevo";

  return "Regular";
}

function claseSegmento(segmento) {
  if (segmento === "VIP") return "badge vip";
  if (segmento === "Inactivo") return "badge inactive";
  if (segmento === "Nuevo") return "badge new";
  return "badge regular";
}

export default function Clientes({ setView, setClienteSeleccionado }) {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [segmento, setSegmento] = useState("Todos");

  const [clienteEditando, setClienteEditando] = useState(null);

  const [formEditar, setFormEditar] = useState({
    nombre: "",
    celular: "",
    correo: "",
    fecha_nacimiento: null,
  });

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  const clientesProcesados = clientes.map((c) => ({
    ...c,
    segmento: calcularSegmento(c),
    registro: c.fecha_registro || "-",
    ultima_visita: c.ultima_visita || "-",
  }));

  const clientesFiltrados = clientesProcesados.filter((c) => {
    const coincideBusqueda =
      c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.celular?.includes(busqueda);

    const coincideSegmento =
      segmento === "Todos" || c.segmento === segmento;

    return coincideBusqueda && coincideSegmento;
  });

  return (
    <div>
      <div className="section-header">
        <h2>Clientes</h2>
        <p>Gestiona la base de datos de tus clientes</p>
      </div>

      <div className="table-toolbar">
        <input
          type="text"
          placeholder="Buscar por nombre o celular"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <table className="data-table advanced-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Celular</th>
            <th>Correo</th>
            <th>Registro</th>
            <th>Puntos</th>
            <th>Última visita</th>
            <th>Segmento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientesFiltrados.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.nombre}</td>
              <td>{c.celular}</td>
              <td>{c.correo || "-"}</td>
              <td>{c.registro}</td>
              <td>{c.puntos ?? 0}</td>
              <td>{c.ultima_visita}</td>
              <td>
                <span className={claseSegmento(c.segmento)}>
                  {c.segmento}
                </span>
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => {
                    setClienteEditando(c);

                    setFormEditar({
                      nombre: c.nombre,
                      celular: c.celular,
                      correo: c.correo || "",
                      fecha_nacimiento: c.fecha_nacimiento || null,
                    });
                  }}
                >
                  Editar
                </button>

                <button
                  className="action-btn"
                  onClick={() => {
                    setClienteSeleccionado(c.id_cliente);
                    setView("perfil");
                  }}
                >
                  Historial
                </button>

                <button
                  className="delete-btn"
                  onClick={async () => {
                    const ok = window.confirm(
                      `¿Eliminar cliente ${c.nombre}?`
                    );

                    if (!ok) return;

                    await eliminarCliente(c.id_cliente);

                    const actualizados =
                      await getClientes();

                    setClientes(actualizados);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clienteEditando && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Editar Cliente</h3>

            <input
              value={formEditar.nombre}
              onChange={(e) =>
                setFormEditar({
                  ...formEditar,
                  nombre: e.target.value,
                })
              }
              placeholder="Nombre"
            />

            <input
              value={formEditar.celular}
              onChange={(e) =>
                setFormEditar({
                  ...formEditar,
                  celular: e.target.value,
                })
              }
              placeholder="Celular"
            />

            <input
              value={formEditar.correo}
              onChange={(e) =>
                setFormEditar({
                  ...formEditar,
                  correo: e.target.value,
                })
              }
              placeholder="Correo"
            />

            <div className="modal-actions">
              <button
                onClick={async () => {
                  await actualizarCliente(
                    clienteEditando.id_cliente,
                    formEditar
                  );

                  const actualizados =
                    await getClientes();

                  setClientes(actualizados);

                  setClienteEditando(null);
                }}
              >
                Guardar
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  setClienteEditando(null)
                }
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
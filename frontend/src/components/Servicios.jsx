import { useEffect, useState } from "react";
import {
  getServicios,
  crearServicio,
  cambiarEstadoServicio,
  eliminarServicio
} from "../api/barberiq";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    duracion: "",
  });

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const data = await getServicios();
    setServicios(data);
  };

  const guardar = async () => {
    const respuesta = await crearServicio({
      nombre: form.nombre,
      precio: Number(form.precio),
      duracion: Number(form.duracion),
    });

    console.log("Servicio creado:", respuesta);

    setForm({
      nombre: "",
      precio: "",
      duracion: "",
    });

    cargarServicios();
  };
  
  return (
    <div>
      <div className="section-header">
        <h2>Servicios</h2>
        <p>Administra el catálogo de servicios</p>
      </div>

      <div className="servicios-layout">
        <div className="service-form-card">
          <h3>Nuevo servicio</h3>

          <label>Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) =>
              setForm({ ...form, nombre: e.target.value })
            }
            placeholder="Corte clásico"
          />

          <label>Precio</label>
          <input
            type="number"
            value={form.precio}
            onChange={(e) =>
              setForm({ ...form, precio: e.target.value })
            }
            placeholder="18000"
          />

          <label>Duración (min)</label>
          <input
            type="number"
            value={form.duracion}
            onChange={(e) =>
              setForm({ ...form, duracion: e.target.value })
            }
            placeholder="30"
          />

          <button onClick={guardar}>Crear servicio</button>
        </div>

        <div className="service-table-card">
          <table className="data-table advanced-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {servicios.map((s) => (
                <tr key={s.id_servicio}>
                  <td>{s.nombre}</td>
                  <td>$ {Number(s.precio).toLocaleString("es-CO")}</td>
                  <td>{s.duracion ?? "-"} min</td>
                  <td>
                    <div className="service-status">
                      <span
                        className={
                          s.activo ? "switch active" : "switch"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          await cambiarEstadoServicio(
                            s.id_servicio
                          );

                          cargarServicios();
                        }}
                      >
                        <span></span>
                      </span>
                      {s.activo ? "Activo" : "Inactivo"}
                    </div>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={async () => {
                        const ok = window.confirm(
                          `¿Eliminar servicio ${s.nombre}?`
                        );

                        if (!ok) return;

                        await eliminarServicio(s.id_servicio);
                        cargarServicios();
                       }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
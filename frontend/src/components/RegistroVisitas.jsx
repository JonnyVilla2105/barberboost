import { useEffect, useState } from "react";
import { getClientes, getServicios, crearVisita, crearCliente } from "../api/barberiq";

export default function RegistroVisitas() {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    id_cliente: "",
    id_servicio: "",
    valor_pagado: "",
    observaciones: "",
  });

  const [mostrarNuevoCliente, setMostrarNuevoCliente] = useState(false);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    celular: "",
    correo: "",
    fecha_nacimiento: null,
  });

  useEffect(() => {
    getClientes().then(setClientes);
    getServicios().then(setServicios);
  }, []);

  const guardar = async () => {
    const data = {
      id_cliente: Number(form.id_cliente),
      id_servicio: Number(form.id_servicio),
      valor_pagado: Number(form.valor_pagado),
      observaciones: form.observaciones,
    };

    const respuesta = await crearVisita(data);

    console.log("Visita registrada:", respuesta);
    setMensaje("Visita registrada correctamente");

    setForm({
      id_cliente: "",
      id_servicio: "",
      valor_pagado: "",
      observaciones: "",
    });
  };

  return (
    <div>
      <h2>Registro de Visitas</h2>

      <button
        className="secondary-action-btn"
        onClick={() => setMostrarNuevoCliente(!mostrarNuevoCliente)}
      >
        + Crear cliente
      </button>

      {mostrarNuevoCliente && (
        <div className="quick-client-card">
          <h3>Nuevo cliente rápido</h3>

          <input
            placeholder="Nombre"
            value={nuevoCliente.nombre}
            onChange={(e) =>
              setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
            }
          />

         <input
           placeholder="Celular"
           value={nuevoCliente.celular}
           onChange={(e) =>
             setNuevoCliente({ ...nuevoCliente, celular: e.target.value })
           }
         />

         <input
           placeholder="Correo"
           value={nuevoCliente.correo}
           onChange={(e) =>
             setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
           }
         />

         <button
           onClick={async () => {
             await crearCliente(nuevoCliente);

             const actualizados = await getClientes();
             setClientes(actualizados);

             setNuevoCliente({
               nombre: "",
               celular: "",
               correo: "",
               fecha_nacimiento: null,
             });

             setMostrarNuevoCliente(false);
           }}
         >
           Guardar cliente
         </button>
       </div>
      )}

      <div className="form-grid">
        <select
          value={form.id_cliente}
          onChange={(e) => setForm({ ...form, id_cliente: e.target.value })}
        >
          <option value="">Seleccione cliente</option>
          {clientes.map((c) => (
            <option key={c.id_cliente} value={c.id_cliente}>
              {c.nombre} - {c.celular}
            </option>
          ))}
        </select>

        <select
          value={form.id_servicio}
          onChange={(e) => setForm({ ...form, id_servicio: e.target.value })}
        >
          <option value="">Seleccione servicio</option>
          {servicios.map((s) => (
            <option key={s.id_servicio} value={s.id_servicio}>
              {s.nombre} - $ {Number(s.precio).toLocaleString("es-CO")}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Valor pagado"
          value={form.valor_pagado}
          onChange={(e) => setForm({ ...form, valor_pagado: e.target.value })}
        />

        <input
          type="text"
          placeholder="Observaciones"
          value={form.observaciones}
          onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
        />

        <button onClick={guardar}>Registrar Visita</button>
      </div>

      {mensaje && <p className="success-message">{mensaje}</p>}
    </div>
  );
}
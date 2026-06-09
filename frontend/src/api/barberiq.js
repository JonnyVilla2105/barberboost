const BASE_URL = "http://127.0.0.1:8000";

export async function getDashboard() {
  const res = await fetch("http://127.0.0.1:8000/crm/clientes-resumen?empresa_id=1");
  return res.json();
}

export async function getAlertas() {
  const res = await fetch("http://127.0.0.1:8000/crm/clientes-alerta");
  return res.json();
}

export async function getCliente(id) {
  const res = await fetch(`http://127.0.0.1:8000/crm/cliente/${id}`);
  return res.json();
}

export async function getClientes() {
  const res = await fetch("http://127.0.0.1:8000/clientes/");

  if (!res.ok) {
    throw new Error("Error consultando clientes");
  }

  return res.json();
}

export async function getServicios() {
  const res = await fetch("http://127.0.0.1:8000/servicios/");
  return res.json();
}

export async function crearVisita(data) {
  const res = await fetch("http://127.0.0.1:8000/visitas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getFidelizacion() {
  const res = await fetch("http://127.0.0.1:8000/clientes/");
  return res.json();
}

export async function getCampanas() {
  const res = await fetch("http://127.0.0.1:8000/clientes/");
  return res.json();
}

export async function getVisitas() {
  const res = await fetch("http://127.0.0.1:8000/visitas/");
  return res.json();
}

export async function actualizarCliente(id, data) {
  const res = await fetch(`http://127.0.0.1:8000/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function crearServicio(data) {
  const res = await fetch("http://127.0.0.1:8000/servicios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function cambiarEstadoServicio(id) {
  const res = await fetch(
    `http://127.0.0.1:8000/servicios/${id}/estado`,
    {
      method: "PUT",
    }
  );

  return res.json();
}

export async function eliminarServicio(id) {
  const res = await fetch(`http://127.0.0.1:8000/servicios/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function crearCliente(data) {
  const res = await fetch("http://127.0.0.1:8000/clientes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
export async function eliminarCliente(id) {
  const res = await fetch(
    `http://127.0.0.1:8000/clientes/${id}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

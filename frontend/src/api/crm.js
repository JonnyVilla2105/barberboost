export async function getCRMResumen() {
  const res = await fetch("http://127.0.0.1:8000/crm/clientes-resumen");
  return await res.json();
}
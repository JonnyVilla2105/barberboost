import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import {
  getDashboard,
  getAlertas,
  getServicios,
  getVisitas
} from "../api/barberiq";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [alertas, setAlertas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    getDashboard().then(setData).catch(console.error);
    getAlertas().then(setAlertas).catch(console.error);
    getServicios().then(setServicios).catch(console.error);
    getVisitas().then(setVisitas).catch(console.error);
  }, []);

  if (!data) return <p>Cargando dashboard...</p>;

  const totalVentas = visitas.reduce(
    (acc, v) => acc + Number(v.valor_pagado || 0),
    0
  );

  const ticketPromedio =
    visitas.length > 0 ? totalVentas / visitas.length : 0;

  const kpis = [
    { label: "Total clientes", value: data.total_clientes ?? 0, delta: "+12%" },
    { label: "Clientes activos", value: data.clientes_activos ?? 0, delta: "+8%" },
    { label: "Clientes inactivos", value: data.clientes_inactivos ?? 0, delta: "-4%" },
    { label: "Visitas registradas", value: data.total_visitas ?? 0, delta: "+15%" },
    {
      label: "Ventas del mes",
      value: `$ ${totalVentas.toLocaleString("es-CO")}`,
      delta: "+15%"
    },
    {
      label: "Ticket promedio",
      value: `$ ${Math.round(ticketPromedio).toLocaleString("es-CO")}`,
      delta: "+3%"
    },
  ];

  const ventasPorDia = [
    { dia: "Lun", ventas: 12000 },
    { dia: "Mar", ventas: 18000 },
    { dia: "Mié", ventas: 15000 },
    { dia: "Jue", ventas: 22000 },
    { dia: "Vie", ventas: 31000 },
    { dia: "Sáb", ventas: 42000 },
    { dia: "Dom", ventas: 9000 },
  ];

  const nuevosClientes = [
    { semana: "S1", clientes: 2 },
    { semana: "S2", clientes: 4 },
    { semana: "S3", clientes: 1 },
    { semana: "S4", clientes: data.total_clientes ?? 0 },
  ];

  const serviciosVendidos = servicios.map((s) => ({
    servicio: s.nombre,
    cantidad: visitas.filter((v) => v.id_servicio === s.id_servicio).length,
  }));

  const evolucionVisitas = [
    { mes: "Ene", visitas: 0 },
    { mes: "Feb", visitas: 0 },
    { mes: "Mar", visitas: 0 },
    { mes: "Abr", visitas: 0 },
    { mes: "May", visitas: 0 },
    { mes: "Jun", visitas: data.total_visitas ?? 0 },
  ];

  return (
    <div>
      <h2>Dashboard BarberIQ</h2>

      <div className="dashboard-kpis">
        {kpis.map((k) => (
          <div className="dashboard-card" key={k.label}>
            <span>{k.label}</span>
            <strong>{k.value}</strong>
            <small>{k.delta}</small>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Ventas por día</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ventasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="ventas"
                stroke="#0f172a"
                fill="#e2e8f0"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Nuevos clientes por semana</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={nuevosClientes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clientes" fill="#0f172a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Servicios más vendidos</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={serviciosVendidos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="servicio" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#0f172a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Evolución de visitas</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={evolucionVisitas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitas"
                stroke="#0f172a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>⚠️ Clientes en riesgo</h3>

      {alertas.length === 0 ? (
        <p>No hay clientes en riesgo por ahora.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Días sin visita</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {alertas.map((a, i) => (
              <tr key={i}>
                <td>{a.cliente}</td>
                <td>{a.dias_sin_visita}</td>
                <td>{a.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
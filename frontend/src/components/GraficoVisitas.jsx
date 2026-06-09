import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function GraficoVisitas() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/resumen")
      .then(res => res.json())
      .then(data => {
        setData([
          { name: "Activos", value: data.activos },
          { name: "Inactivos", value: data.inactivos },
          { name: "VIP", value: data.vip }
        ]);
      });
  }, []);

  return (
    <div>
      <h3>📊 Segmentación de clientes</h3>

      <LineChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
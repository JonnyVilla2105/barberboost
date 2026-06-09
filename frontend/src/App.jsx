import { useState, useEffect  } from "react";
import { Home, LayoutDashboard, Users, QrCode, Scissors, ClipboardList, Gift, Megaphone, Sparkles, Tag } from "lucide-react";

import Servicios from "./components/Servicios";
import Dashboard from "./components/Dashboard";
import QRScanner from "./components/QRScanner";
import ClientePerfil from "./components/ClientePerfil";
import Clientes from "./components/Clientes";
import RegistroVisitas from "./components/RegistroVisitas";
import Fidelizacion from "./components/Fidelizacion";
import Campanas from "./components/Campanas";
import InteligenciaIA from "./components/InteligenciaIA";
import Precios from "./components/Precios";

import "./App.css";

const menu = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "servicios", label: "Servicios", icon: Scissors },
  { id: "visitas", label: "Registro de Visitas", icon: ClipboardList },
  { id: "fidelizacion", label: "Fidelización", icon: Gift },
  { id: "perfil", label: "Perfil Cliente", icon: QrCode },
  { id: "campanas", label: "Campañas", icon: Megaphone },
  { id: "ia", label: "Inteligencia IA", icon: Sparkles },
  { id: "precios", label: "Precios", icon: Tag },
];

export default function App() {
  const [view, setView] = useState("inicio");
  // const [clienteId, setClienteId] = useState(1);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(1);
  const [dashboardData, setDashboardData] = useState({
    total_clientes: 0,
    clientes_activos: 0,
    clientes_inactivos: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/crm/clientes-resumen?empresa_id=1")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Scissors size={28} />
          </div>
          <h2>BarberIQ</h2>
        </div>

        <nav>
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={view === item.id ? "nav-item active" : "nav-item"}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="content">
        {view === "inicio" && (
          <section className="hero">
            <div>
              <span className="badge">
                Plataforma de fidelización para barberías
              </span>

              <h1>
                Convierte cada corte en una oportunidad 
                para fidelizar clientes
              </h1>

              <p>
                BarberIQ ayuda a barberías y peluquerías a aumentar la
                frecuencia de visitas mediante programas de fidelización,
                analítica avanzada y automatización.
              </p>

              <div className="buttons">
                <button
                  className="btn primary"
                  onClick={() => setView("precios")}
                >
                  Solicitar Demo
                </button>

                <button
                  className="btn secondary"
                  onClick={() => setView("precios")}
                >
                  Comenzar Gratis →
                </button>
              </div>
            </div>

            <div className="preview-card">
              <h3>Vista previa del panel</h3>
              <p>Clientes en tiempo real</p>

              <div className="metrics">
                <div>
                  <span>Total clientes</span>
                  <strong>{dashboardData.total_clientes}</strong>
                </div>

                <div>
                  <span>Activos</span>
                  <strong>{dashboardData.clientes_activos}</strong>
                </div>

                <div>
                  <span>Inactivos</span>
                  <strong>{dashboardData.clientes_inactivos}</strong>
                </div>
              </div>

              {/* <div className="metrics">
                <div>
                  <span>Clientes Totales</span>
                  <strong>1.248</strong>
                </div>

                <div>
                  <span>Clientes activos</span>
                  <strong>892</strong>
                </div>

                <div>
                  <span>Clientes inactivos</span>
                  <strong>356</strong>
                </div>
              </div> */}

              <div className="chart">
                <svg viewBox="0 0 500 180">
                  <path
                    d="M10 140 C90 125,130 140,190 130 C270 115,320 80,360 55 C410 20,450 40,490 95"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="3"
                  />

                  <path
                    d="M10 140 C90 125,130 140,190 130 C270 115,320 80,360 55 C410 20,450 40,490 95 L490 180 L10 180 Z"
                    fill="#dbe4ef"
                  />
                </svg>
              </div>
            </div>
          </section>
        )}

        {view === "dashboard" && (
          <div className="panel">
            <Dashboard />
          </div>
        )}

        {view === "qr" && (
          <div className="panel">
            <QRScanner />
          </div>
        )}

        {view === "cliente" && (
          <div className="panel">
            <div className="client-selector">
              <label>ID Cliente</label>

              <input
                type="number"
                value={clienteId}
                onChange={(e) => setClienteId(Number(e.target.value))}
              />
            </div>

            <ClientePerfil idCliente={clienteId} />
          </div>
        )}

        {view === "clientes" && (
          <div className="panel">
            <Clientes
            setView={setView}
            setClienteSeleccionado={setClienteSeleccionado}
            />
          </div>
        )}

        {view === "servicios" && (
          <div className="panel">
            <Servicios />
          </div>
        )}
        
        {view === "visitas" && (
          <div className="panel">
            <RegistroVisitas />
          </div>
        )}
        {view === "fidelizacion" && (
          <div className="panel">
            <Fidelizacion />
          </div>
        )}
        {view === "perfil" && (
          <div className="panel">
            <div className="client-selector">
              <label>ID Cliente</label>

              <input
                type="number"
                value={clienteSeleccionado}
                onChange={(e) =>
                  setClienteSeleccionado(
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <ClientePerfil
              idCliente={clienteSeleccionado}
            />
          </div>
        )}
        {view === "campanas" && (
          <div className="panel">
            <Campanas />
          </div>
        )}
        {view === "ia" && (
          <div className="panel">
            <InteligenciaIA />
          </div>
        )}
        {view === "precios" && (
          <div className="panel">
            <Precios />
          </div>
        )}

      </main>
    </div>
  );
}
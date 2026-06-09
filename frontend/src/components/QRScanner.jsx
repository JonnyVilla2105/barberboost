import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    const onScanSuccess = (decodedText) => {

      console.log("QR detectado:", decodedText);

      // STOP scanner para evitar doble registro
      scanner.clear().catch(() => {});

      fetch("http://127.0.0.1:8000/qr/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigo_qr: decodedText
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);

          if (data.error) {
            setMensaje("❌ " + data.error);
          } else {
            setMensaje("✔ Visita registrada correctamente");
          }
        })
        .catch(() => {
          setMensaje("❌ Error conectando con backend");
        });
    };

    const onScanError = () => {
      // silencioso
    };

    scanner.render(onScanSuccess, onScanError);

    // cleanup al salir del componente
    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📷 Escanear QR BarberIQ</h2>

      <div id="reader" style={{ width: 300 }} />

      {mensaje && (
        <p style={{ marginTop: 10, fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
const urlApi = "http://localhost:3001/facturas";

(async () => {
  const datos = await fetch(urlApi);
  const datosParseados = await datos.json();
  for (const factura of datosParseados) {
    const datosFactura = {};
    if (factura.tipo === "ingreso") {
      datosFactura.numero = factura.numero;
      let fechaParseada = luxon.DateTime.fromMillis(parseInt(factura.fecha)).c;
      fechaParseada = `${fechaParseada.day}/${fechaParseada.month}/${fechaParseada.year}`;
      datosFactura.fecha = fechaParseada;
      datosFactura.concepto = factura.concepto;
      datosFactura.base = `${factura.base}€`;
      const iva = (factura.base * factura.tipoIva) / 100;
      const precioIva = `${(factura.base * factura.tipoIva) / 100}€ (${factura.tipoIva}%)`;
      datosFactura.iva = precioIva;
      datosFactura.total = `${factura.base + iva}€`;
      datosFactura.estado = factura.abonada ? "Abonada" : "Pendiente";
      let fechaVencimientoParseada = luxon.DateTime.fromMillis(parseInt(factura.vencimiento)).c;
      fechaVencimientoParseada = `${fechaVencimientoParseada.day}/${fechaVencimientoParseada.month}/${fechaVencimientoParseada.year}`;
      if (factura.abonada) {
        datosFactura.vence = "-";
      } else {
        const diasFaltantes = Math.trunc((factura.vencimiento - luxon.DateTime.now()) / (60 * 60 * 24 * 1000));
        datosFactura.vence = diasFaltantes > 0 ? `${fechaVencimientoParseada} (faltan ${diasFaltantes} días)` : `${fechaVencimientoParseada} (hace ${diasFaltantes} días)`;
      }
      facturas.push(datosFactura);

      const facturaIngresada = base.cloneNode(true);
      facturaIngresada.querySelector(".numero").textContent = datosFactura.numero;
      facturaIngresada.querySelector(".fecha").textContent = datosFactura.fecha;
      facturaIngresada.querySelector(".concepto").textContent = datosFactura.concepto;
      facturaIngresada.querySelector(".base").textContent = datosFactura.base;
      facturaIngresada.querySelector(".iva").textContent = datosFactura.iva;
      facturaIngresada.querySelector(".total").textContent = datosFactura.total;
      facturaIngresada.querySelector(".estado").textContent = datosFactura.estado;
      facturaIngresada.querySelector(".vence").textContent = datosFactura.vence;
    }
  }
})();


const base = document.querySelector(".dummy").cloneNode(true);
base.classList.add("off");

document.querySelector(".lista-facturas").textContent = "";


const facturas = [];
console.log(facturas);

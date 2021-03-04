const urlApi = "http://localhost:3001/facturas";

(async () => {
  const datos = await fetch(urlApi);
  const datosParseados = await datos.json();
  let baseTotal = 0;
  let ivaTotal = 0;
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
      const diasFaltantes = Math.trunc((factura.vencimiento - luxon.DateTime.now()) / (60 * 60 * 24 * 1000));

      if (factura.abonada) {
        datosFactura.vence = "-";
      } else {
        datosFactura.vence = diasFaltantes > 0 ? `${fechaVencimientoParseada} (faltan ${diasFaltantes} días)` : `${fechaVencimientoParseada} (hace ${diasFaltantes * -1} días)`;
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
      if (datosFactura.estado === "Pendiente") {
        facturaIngresada.querySelector(".estado").classList.replace("table-success", "table-danger");
      }
      if (datosFactura.vence !== "-" && diasFaltantes < 0) {
        facturaIngresada.querySelector(".vence").classList.replace("table-success", "table-danger");
      }
      baseTotal += factura.base;
      ivaTotal += iva;
      listaFacturas.append(facturaIngresada);
    }
  }
  document.querySelector(".base-total").textContent = `${baseTotal}€`;
  document.querySelector(".iva-total").textContent = `${ivaTotal}€`;
  document.querySelector(".final-total").textContent = `${baseTotal + ivaTotal}€`;
})();
const base = document.querySelector(".dummy").cloneNode(true);
base.classList.add("off");

const listaFacturas = document.querySelector(".lista-facturas");
listaFacturas.textContent = "";

const facturas = [];
console.log(facturas);

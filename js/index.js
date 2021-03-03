const urlApi = "http://localhost:3001/facturas";

const datosApi = extraerDatosApi();
async function extraerDatosApi() {
  const datos = await fetch(urlApi);
  const datosModificados = await datos.json();
  console.log(datosModificados);
  return datosModificados;
}

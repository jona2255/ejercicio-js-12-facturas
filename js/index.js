const urlApi = "http://localhost:3001/facturas";

(async () => {
  const datos = await fetch(urlApi);
  const datosModificados = await datos.json();
})();

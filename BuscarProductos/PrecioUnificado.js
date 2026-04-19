//Función De Precio Mal Hecha
/*
function fmtPrice(n) {
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function formatearPrecio(num) {
  return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function mostrarPrecio(numero) {
  return "$" + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
*/

function convertirPrecio(precio){
  if(precio < 0){
    return "Precio Inválido";
  }
  let conversiónTemporal = precio.toString();
  let resul = "";
    while(conversiónTemporal.length > 3){
      resul = "." + conversiónTemporal.slice(-3) + resul;
      conversiónTemporal = conversiónTemporal.slice(0, -3);
  }
    return "$" + conversiónTemporal + resul;
}

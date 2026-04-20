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

//Moneda Chilena
const TipoDeMondena = new Intl.NumberFormat("es-Cl",{
  style: "currency",
  currency: "CLP",
})

//Transformación Fun. Para entradas Brutas
function VerificarMoneda(numeroEntrada) {
  if(numeroEntrada < 0 || typeof numeroEntrada !== "number"){
    return "Entrada Inválida";
  }else{
    return TipoDeMondena.format(numeroEntrada);
  }
}

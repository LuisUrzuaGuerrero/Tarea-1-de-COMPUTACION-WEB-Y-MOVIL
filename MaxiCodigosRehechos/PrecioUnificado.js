//MARK: Función Precio Unificado

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

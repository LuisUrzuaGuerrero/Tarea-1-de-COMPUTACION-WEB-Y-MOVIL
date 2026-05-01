import { cupones } from "./bdd.js";

function aplicarCupon(codigo, usuarioId, totalCarrito) {
  const cupon = cupones.find((c) => c.codigo === codigo);

  if (!cupon) {
    return { ok: false, mensaje: "Cupón no existe", descuento: 0 };
  }
  if (!cupon.activo) {
    return { ok: false, mensaje: "Cupón inactivo", descuento: 0 };
  }
  if (cupon.usos >= cupon.maxUsos) {
    return { ok: false, mensaje: "Cupón agotado", descuento: 0 };
  }
  if (totalCarrito < cupon.minCompra) {
    return { ok: false, mensaje: "Monto mínimo no alcanzado", descuento: 0 };
  }
  if (new Date() > new Date(cupon.expira)) {
    return { ok: false, mensaje: "Cupón expirado", descuento: 0 };
  }
  if (
    cupon.usuariosPermitidos.length > 0 &&
    !cupon.usuariosPermitidos.includes(usuarioId)
  ) {
    return {
      ok: false,
      mensaje: "Cupón no válido para este usuario",
      descuento: 0,
    };
  }

  let descuento = 0;
  if (cupon.tipo === "porcentaje") {
    descuento = totalCarrito * (cupon.valor / 100);
  }
  if (cupon.tipo === "fijo") {
    descuento = Math.min(cupon.valor, totalCarrito);
  }
  if (cupon.tipo === "envio") {
    descuento = cupon.valor;
  }

  cupon.usos++;
  return { ok: true, mensaje: "Cupón aplicado", descuento, tipo: cupon.tipo };
}

export default { aplicarCupon };

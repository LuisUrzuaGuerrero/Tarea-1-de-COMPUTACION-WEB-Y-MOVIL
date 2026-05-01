import { usuarios, productos } from "./bdd.js";
import { vaciar } from "./carrito.js";
import autenticacion from "./autenticacion.js";

const IVA = 0.19;

const INTERES_CUOTAS = {
  2: 0.02,
  3: 0.04,
  6: 0.08,
  12: 0.15,
  24: 0.28,
  36: 0.45,
};

function nivelADescuento(puntos) {
  if (puntos >= 300) return 15;
  if (puntos >= 200) return 10;
  if (puntos >= 100) return 5;
  return 0;
}

function calcularPrecioFinal(
  precioBase,
  {
    descuentoNivel = 0,
    descuentoCupon = 0,
    descuentoEspecial = 0,
    conIva = true,
    costoEnvio = 0,
    cuotas = 1,
  } = {},
) {
  let precio = precioBase;
  precio -= precio * (descuentoNivel / 100);
  precio -= precio * (descuentoCupon / 100);
  precio -= precio * (descuentoEspecial / 100);

  const subtotal = precio;
  const iva = conIva ? precio * IVA : 0;
  precio += iva + costoEnvio;

  const interes = INTERES_CUOTAS[cuotas] || 0;
  precio += precio * interes;

  return {
    base: precioBase,
    subtotal,
    iva,
    envio: costoEnvio,
    total: precio,
    valorCuota: cuotas > 1 ? precio / cuotas : precio,
  };
}

function validarPago(metodoPago, datosTarjeta) {
  if (metodoPago === "tarjeta") {
    const { numero, cvv } = datosTarjeta || {};
    return numero?.length === 16 && cvv?.length === 3;
  }
  return ["transferencia", "efectivo"].includes(metodoPago);
}

function checkout(
  usuarioId,
  { metodoPago, direccion, datosTarjeta, cuotas = 1 } = {},
) {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    return { ok: false, mensaje: "Usuario no encontrado" };
  }
  if (usuario.carrito.length === 0) {
    return { ok: false, mensaje: "El carrito está vacío" };
  }
  if (!validarPago(metodoPago, datosTarjeta)) {
    return { ok: false, mensaje: "Datos de pago inválidos" };
  }

  const items = usuario.carrito.map((item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    return {
      nombre: producto.nombre,
      cantidad: item.cantidad,
      precioUnitario: producto.precio,
      totalItem: producto.precio * item.cantidad,
    };
  });

  const subtotal = items.reduce((s, i) => s + i.totalItem, 0);
  const descuentoNivel = nivelADescuento(usuario.puntos);
  const descuentoTotal = descuentoNivel + usuario.descuento;
  const montoDescuento = subtotal * (descuentoTotal / 100);
  const subtotalConDescuento = subtotal - montoDescuento;
  const iva = subtotalConDescuento * IVA;
  const total = subtotalConDescuento + iva;
  const puntosGanados = Math.floor(total / 1000);

  const orden = {
    id: "ORD-" + Date.now(),
    usuarioId,
    items,
    subtotal,
    descuentoPct: descuentoTotal,
    montoDescuento,
    subtotalConDescuento,
    iva,
    total,
    metodoPago,
    direccion,
    cuotas,
    estado: "pagado",
    puntosGanados,
    creadaEn: new Date(),
  };

  usuario.carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    if (producto) {
      producto.stock -= item.cantidad;
    }
  });

  usuario.puntos += puntosGanados;
  usuario.nivel = autenticacion.calcularNivelUsuario(usuario.puntos);
  usuario.historial.push(orden);
  vaciar(usuarioId);

  return { ok: true, mensaje: "Orden creada exitosamente", orden };
}

export default { checkout, calcularPrecioFinal, nivelADescuento };

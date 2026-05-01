import { usuarios, resenas } from "./bdd.js";

function actualizarPerfil(usuarioId, campos) {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    return { ok: false, mensaje: "Usuario no encontrado" };
  }

  const camposPermitidos = [
    "nombre",
    "telefono",
    "direccion",
    "ciudad",
    "region",
    "codPostal",
  ];
  const camposInvalidos = Object.keys(campos).filter(
    (c) => !camposPermitidos.includes(c),
  );
  if (camposInvalidos.length > 0) {
    return {
      ok: false,
      mensaje: `Campos no permitidos: ${camposInvalidos.join(", ")}`,
    };
  }

  Object.assign(usuario, campos);
  return { ok: true, usuario };
}

function estadisticas() {
  return {
    total: usuarios.length,
    activos: usuarios.filter((u) => u.activo).length,
    bloqueados: usuarios.filter((u) => u.bloqueado).length,
    porTipo: usuarios.reduce((acc, u) => {
      acc[u.tipo] = (acc[u.tipo] || 0) + 1;
      return acc;
    }, {}),
  };
}

function obtenerWishlist(usuarioId) {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    return { ok: false, mensaje: "Usuario no encontrado" };
  }
  return { ok: true, wishlist: usuario.wishlist };
}

function agregarAWishlist(usuarioId, productoId) {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    return { ok: false, mensaje: "Usuario no encontrado" };
  }
  if (usuario.wishlist.includes(productoId)) {
    return { ok: false, mensaje: "Producto ya en wishlist" };
  }
  usuario.wishlist.push(productoId);
  return {
    ok: true,
    mensaje: "Agregado a wishlist",
    wishlist: usuario.wishlist,
  };
}

function quitarDeWishlist(usuarioId, productoId) {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    return { ok: false, mensaje: "Usuario no encontrado" };
  }
  const indice = usuario.wishlist.indexOf(productoId);
  if (indice === -1) {
    return { ok: false, mensaje: "Producto no está en wishlist" };
  }
  usuario.wishlist.splice(indice, 1);
  return {
    ok: true,
    mensaje: "Removido de wishlist",
    wishlist: usuario.wishlist,
  };
}

function obtenerResenas(productoId) {
  const resultado = resenas.filter((r) => r.productoId === productoId);
  return { ok: true, resenas: resultado, total: resultado.length };
}

function agregarResena(productoId, usuarioId, { rating, comentario }) {
  if (rating < 1 || rating > 5) {
    return { ok: false, mensaje: "Rating debe ser entre 1 y 5" };
  }

  const nuevaResena = {
    id: resenas.length + 1,
    productoId,
    usuarioId,
    rating,
    comentario,
    fecha: new Date().toISOString().split("T")[0],
    likes: 0,
    verificada: false,
  };

  resenas.push(nuevaResena);
  return { ok: true, resena: nuevaResena };
}

function darLikeResena(resenaId) {
  const resena = resenas.find((r) => r.id === resenaId);
  if (!resena) {
    return { ok: false, mensaje: "Reseña no encontrada" };
  }
  resena.likes++;
  return { ok: true, likes: resena.likes };
}

function eliminarResena(resenaId, usuarioId) {
  const indice = resenas.findIndex(
    (r) => r.id === resenaId && r.usuarioId === usuarioId,
  );
  if (indice === -1) {
    return { ok: false, mensaje: "Reseña no encontrada o no autorizado" };
  }
  resenas.splice(indice, 1);
  return { ok: true, mensaje: "Reseña eliminada" };
}

export default {
  actualizarPerfil,
  estadisticas,
  obtenerWishlist,
  agregarAWishlist,
  quitarDeWishlist,
  obtenerResenas,
  agregarResena,
  darLikeResena,
  eliminarResena,
};

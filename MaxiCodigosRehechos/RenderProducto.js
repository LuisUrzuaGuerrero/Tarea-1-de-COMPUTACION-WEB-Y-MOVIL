//MARK: renderProduct
//Función Mal hecha sobre renderizar Producto
// funcion para generar html de producto (mezcla logica con presentacion)
/*
function renderProduct(p) {
  var html = "";
  html += "<div class='product-card'>";
  html += "<div class='product-img'>";
  html += "<img src='" + p.imgs[0] + "' alt='" + p.nom + "'>";
  if (p.stock <= 0) {
    html += "<div class='badge-agotado'>AGOTADO</div>";
  }
  if (p.stock > 0 && p.stock <= 5) {
    html += "<div class='badge-poco-stock'>ÚLTIMAS " + p.stock + " UNIDADES</div>";
  }
  html += "</div>";
  html += "<div class='product-info'>";
  html += "<h3>" + p.nom + "</h3>";
  html += "<div class='rating'>";
  // generar estrellas
  var stars = "";
  for (var i = 0; i < 5; i++) {
    if (i < Math.floor(p.rating)) {
      stars += "★";
    } else if (i < p.rating) {
      stars += "☆";
    } else {
      stars += "☆";
    }
  }
  html += stars;
  html += " (" + p.rating + ")";
  html += "</div>";
  html += "<p class='desc'>" + p.desc + "</p>";
  html += "<div class='price'>" + fmtPrice(p.prec) + "</div>";
  html += "<div class='category'>Categoría: " + p.cat + "</div>";
  if (p.activo == true && p.stock > 0) {
    html += "<button onclick='addToCart(" + p.id + ", 1)' class='btn-cart'>Agregar al carrito</button>";
  } else {
    html += "<button disabled class='btn-cart-disabled'>No disponible</button>";
  }
  html += "</div>";
  html += "</div>";
  return html;
}
*/

function renderProducto(producto) {
  const precioFormateado = VerificarMoneda(producto.precio);
  const { Estado, Alerta } = CalcularRango(producto.stock);
  //Math.floor es para redondear y .repeat es para repetir el caracter dependiendo de lo que hay adentro
  const contarEstrellitas = "★".repeat(Math.floor(producto.rating)) + "☆".repeat(5 - Math.floor(producto.rating));

  return `
    <div class="product-card">
      <div class="product-img">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        ${Alerta ? `<div class="badge">${Estado}</div>` : ""}
      </div>
      <div class="product-info">
        <h3>${producto.nombre}</h3>
        <div class="rating">${stars} (${producto.rating})</div>
        <p class="desc">${producto.descripcion}</p>
        <div class="price">${precioFormateado}</div>
        <div class="category">Categoría: ${producto.categoria}</div>
        ${producto.stock > 0
          ? `<button class="btn-cart" data-id="${producto.id}">Agregar al carrito</button>`
          : `<button class="btn-cart" disabled>No disponible</button>`
        }
      </div>
    </div>
  `;
}
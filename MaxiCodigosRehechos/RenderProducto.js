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

//Funcion separada porque al tenerlo junto se me perdia y no lo entendía bien, ahora se entienede mejor y queda ordenado.
//PD: Math.floor es para redondear y .repeat es para repetir el caracter dependiendo de lo que hay adentro
function generarEstrellas(rating) {
  const llenas = Math.floor(rating);
  const vacias = 5 - llenas;
  return "★".repeat(llenas) + "☆".repeat(vacias);
}

function renderProducto(producto) {
  const precioFormateado = VerificarMoneda(producto.precio);
  const { Estado, Alerta } = CalcularRango(producto.stock);
  const contarEstrellitas = generarEstrellas(producto.rating);

  return `
    <!-- Comienzo del render -->

    <div class="product-card">

    <!-- Img Del Producto y Nombre -->
      <div class="product-img">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        ${Alerta ? `<div class="badge">${Estado}</div>` : ""}
      </div>

    <!-- Info del Producto -->
      <div class="product-info">
        <h3>${producto.nombre}</h3>
        <div class="rating">${contarEstrellitas} (${producto.rating})</div>
        <p class="desc">${producto.descripcion}</p>
        <div class="price">${precioFormateado}</div>
        <div class="category">Categoría: ${producto.categoria}</div>

    <!-- Botón para agregar si hay disponibilidad -->
        ${producto.stock > 0
          ? `<button class="btn-cart" data-id="${producto.id}">Agregar al carro</button>`
          : `<button class="btn-cart" disabled>No disponible</button>`
        }
      </div>

    </div>
  `;

  
}
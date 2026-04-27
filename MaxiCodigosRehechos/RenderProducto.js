//MARK: Función Render Producto

//Funcion de generar Estrelas
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
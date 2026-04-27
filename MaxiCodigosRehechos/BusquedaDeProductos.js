//MARK: Función Buscar Productos

//Función que verifica si la entrada concide con alguna de las propiedades en el producto, importante usar a cada rato el toLowerCase para evitar comparar erroneamente con valores en mayuscula
function coincideConLaBusqueda(producto, entrada) {
  if (!entrada) 
    return true;
  const bajarLetra = entrada.toLowerCase();
  const coincideBusqueda = (
    producto.nombre.toLowerCase().includes(bajarLetra) || producto.descripcion.toLowerCase().includes(bajarLetra)
    || producto.tags.some(tags => tags.toLowerCase().includes(bajarLetra))
  );
  return coincideBusqueda;
}

//Función que ve si la categoría coincide, si no la deja pasar (true)
function coincideConCategoria(producto, categoria) {
  if (!categoria)
    return true;
  const coincideCategoria = producto.categoria.toLowerCase() === categoria.toLowerCase();
  return coincideCategoria;
}

//Funciónm el cual verifica si está dentro del precio marcado, si no lo está, no lo deja pasar (true)
function rangoSolicitado(producto, precioMin, precioMax) {
  const rangoAdecuado = producto.precio >= precioMin && producto.precio <= precioMax;
  return rangoAdecuado;
}

//Función Main que reune las anteriores y busca los productos, sin embargo ve si esta activo o no, en caso de no, no muestra nada.
function busquedaDeProductos(productos, entrada, categoria, precioMin = 0, precioMax = Infinity) {
  let resultado = productos.filter(producto => producto.activo);

  resultado = resultado.filter(producto => coincideConLaBusqueda(producto, entrada));
  resultado = resultado.filter(producto => coincideConCategoria(producto, categoria));
  resultado = resultado.filter(producto => rangoSolicitado(producto, precioMin, precioMax));

  const resultadoFinal = resultado.sort((a, b) => b.rating - a.rating);
  return resultadoFinal;
}
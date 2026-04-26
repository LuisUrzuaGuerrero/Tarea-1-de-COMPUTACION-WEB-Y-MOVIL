//MARK: buscarProductos(de doEverything...)
//Función 1 de buscar Productos en doEverything, totalmente espaguethi
//PD: Agregaré comentarios adicionales porque se lee horrible, realmente me pierdo... >:(

/*
----------------------------------------------------------------------
--> Mapeo de Varibles, toma la bdd de productos y analiza uno por uno; dps los guarda en otra variable y agrega 
    un "interruptor" (match), sin embargo, asume como que de primeras que el cada producto no es el que se busca (false)

 // buscar productos 
  if (action == "buscarProductos") {
    var query = dat;
    var cat = extraDat;
    var minP = moreData ? moreData.min : 0;
    var maxP = moreData ? moreData.max : 999999999;
    var res = [];
    for (var i = 0; i < dbProducts.length; i++) {
      var prod = dbProducts[i];
      var match = false;
----------------------------------------------------------------------
--> Es un embudo muy grande, tosco, muchos filtros para rebuscar y rebuscar, partiendo por que primero ve si es el producto
    activo, y luego rectifica 3 veces pero con diferentes variables, como nombre, descrpción, tag... ¿Paranoia?, debido a que
    revisa 3 veces lo que escribio (redundancia y más redundancia; 3 cañas intentando pescar el mismo pez).

      if (prod.activo == false) continue;
      if (query && query != "" && query != null && query != undefined) {
        if (prod.nom.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        if (prod.desc.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        for (var j = 0; j < prod.tags.length; j++) {
          if (prod.tags[j].toLowerCase().indexOf(query.toLowerCase()) != -1) {
            match = true;
          }
        }
      } else {
        match = true;
      }
-----------------------------------------------------------------------
--> Luego, filtra por categoría, sin embargo, si busca uno y después no coincide, asume que no es el producto y el true pasa
    a false...? Hay un error enorme por coincidencia (el interruptor se apaga como que si se invirtiera la lógica xd). 
    Otro punto es que revisa el precio, pero como ya se definió arriba descarta cualquier producto que no esté dentro del 
    rango, sin embargo, el interruptor se apaga y no se vuelve a revisar, por lo que hay que seguir todo el rato el rastro 
    a match. Peor aún le sigue el res.push que si match sigue true se lo guarda ahí xdd, para variar el ordenamiento
    que viene posterior serviría si fuese arreglo de c++, pero es innecesario, lento e ineficiente para ahora
    considerando las buenas practicas de programación, es decir, si hubieran demasiados productos aquí peta y ya.
    Y dps el callback, devuelve algo y ya, nose ni que devuelve; te escupe el "resultado".

      if (cat && cat != "" && cat != null && cat != undefined) {
        if (prod.cat != cat) {
          match = false;
        }
      }
      if (prod.prec < minP || prod.prec > maxP) {
        match = false;
      }
      if (match == true) {
        res.push(prod);
      }
    }
    // ordenar por rating
    for (var i = 0; i < res.length - 1; i++) {
      for (var j = 0; j < res.length - i - 1; j++) {
        if (res[j].rating < res[j + 1].rating) {
          var tmp = res[j];
          res[j] = res[j + 1];
          res[j + 1] = tmp;
        }
      }
    }
    cb({ ok: true, msg: "ok", data: res });
    return;
  }

*/
//---------------------------------------------------------------------------

//MARK: buscarProductos(de search)
//Search en el archivo , Duplicado con el de arriba que esta en el doEverything xdd (Función 2 = Función 1 ??????)
/*

--> Antes de nada, esta todo hardcodeado los datos, es obvio que si quiero agregar algo tengo que meterme a prods 
    y agregarlo ahí mismito. Ahora, esta función search es practicamente igual a la de arriba pero con amnesia, paso
    de tener paranoia a olvidar todo... o sea, es exactamente lo mismo pero con diferente nombre, y sin el ordenamiento 
    por rating, pero con los mismos filtros...? xdd.

// Funcion para buscar (otro duplicado con diferente nombre)
function search(q, filters) {
  var prods = [
    { id: 101, nom: "Laptop Pro 15", cat: "electronica", prec: 1200000, stock: 5, rating: 4.5, activo: true },
    { id: 102, nom: "Mouse Inalambrico", cat: "accesorios", prec: 25000, stock: 50, rating: 4.0, activo: true },
    { id: 103, nom: "Teclado Mecanico RGB", cat: "accesorios", prec: 85000, stock: 20, rating: 4.8, activo: true },
    { id: 104, nom: "Monitor 4K 27\"", cat: "electronica", prec: 450000, stock: 8, rating: 4.6, activo: true },
    { id: 105, nom: "Auriculares Bluetooth", cat: "audio", prec: 75000, stock: 30, rating: 4.3, activo: true }
  ];
------------------------------------------------------------------------

--> Bueno, primero recorre todos los productos uno por uno, pero verifica si está activo, sin embargo solo busca por 
    nombre posteriormente, es decir, si el producto que busca no coincide con el nombre, pero sí con la descripción o 
    los tags, no lo va a encontrar xddddddd, un todo o nada. 


  // DATOS DUPLICADOS - exactamente los mismos que en doEverything
  var results = [];
  for (var ii = 0; ii < prods.length; ii++) {
    if (prods[ii].activo == false) continue;
    var m = false;
    if (q && q != "") {
      if (prods[ii].nom.toLowerCase().indexOf(q.toLowerCase()) != -1) m = true;
    } else {
      m = true;
    }
--------------------------------------------------------------------------

--> Me pierdo con solo verlo, es decir, parezco dejando las notas del Resident evil por racoon city... según dice
    que si hay un filtro de categoría, pero el producto no coincide, entonces el match se vuelve false, y lo mismo con el 
    precio, estilo guillotina ya que tira altiro al false y si pasa todo, lo guarda en el resultado, pero como ya se dijo, 
    si el producto no coincide con el nombre, aunque sí con la descripción o los tags, no lo va a encontrar, y si 
    el producto coincide con el nombre pero no con la categoría o el precio, tampoco lo va a encontrar... ts >>>>>> js.

    if (filters && filters.cat && prods[ii].cat != filters.cat) m = false;
    if (filters && filters.maxPrice && prods[ii].prec > filters.maxPrice) m = false;
    if (filters && filters.minPrice && prods[ii].prec < filters.minPrice) m = false;
    if (m == true) results.push(prods[ii]);
  }
  return results;
}
  */

/*
//MARK: Busqueda de Productos bosai

function buscarProductos(productos, query, categoria, precioMin = 0, precioMax = Infinity) {
  return productos
    .filter(producto => {
      if (!producto.activo) return false;
      if (query && !coincideConBusqueda(producto, query)) return false;
      if (categoria && producto.cat !== categoria) return false;
      if (producto.prec < precioMin || producto.prec > precioMax) return false;
      return true;
    })
    .sort((a, b) => b.rating - a.rating);
}

function coincideConBusqueda(producto, query) {
  const q = query.toLowerCase();
  const enNombre = producto.nom.toLowerCase().includes(q);
  const enDescripcion = producto.desc.toLowerCase().includes(q);
  const enTags = producto.tags.some(tag => tag.toLowerCase().includes(q));
  return enNombre || enDescripcion || enTags;
}
*/

//Función ql

function busquedaDeProductos(productos, entrada, categoria, precioMin = 0, precioMax = Infinity) {
  let resultado = productos.filter(product => product.activo);

  resultado = resultado.filter(product => coincideConBusqueda(product, entrada));
  resultado = resultado.filter(product => coincideConCategoria(product, categoria));
  resultado = resultado.filter(product => estaDentroDePrecio(product, precioMin, precioMax));

  return resultado.sort((a, b) => b.rating - a.rating);
}

function coincideConBusqueda(producto, entrada) {
  if (!entrada) 
    return true;
  const bajarLetra = entrada.toLowerCase();
  return (
    producto.nombre.toLowerCase().includes(bajarLetra) ||
     producto.descripcion.toLowerCase().includes(bajarLetra) ||
      producto.tags.some(tag => tag.toLowerCase().includes(bajarLetra))
  );
}

function coincideConCategoria(producto, categoria) {
  if (!categoria) 
    return true;
  return producto.categoria === categoria;
}

function estaDentroDePrecio(producto, precioMin, precioMax) {
  return producto.precio >= precioMin && producto.precio <= precioMax;
}
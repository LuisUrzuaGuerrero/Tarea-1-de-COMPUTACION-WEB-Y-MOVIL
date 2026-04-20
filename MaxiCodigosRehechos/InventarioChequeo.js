//Función Mal Hecha (Hardcodeada y con números "mágicos") de Chequeo de Inventario
/*
function checkInventory(prodId4) {
  var prods2 = [
    { id: 101, stock: 5 }, { id: 102, stock: 50 }, { id: 103, stock: 20 },
    { id: 104, stock: 8 }, { id: 105, stock: 30 }, { id: 106, stock: 15 },
    { id: 107, stock: 25 }, { id: 108, stock: 40 }, { id: 109, stock: 0 },
    { id: 110, stock: 60 }
  ];
  var prod3 = null;
  for (var i = 0; i < prods2.length; i++) {
    if (prods2[i].id == prodId4) { prod3 = prods2[i]; break; }
  }
  if (prod3 == null) return { ok: false };
  var status = "";
  var color = "";
  var alerta = false;
  if (prod3.stock == 0) { status = "Agotado"; color = "red"; alerta = true; }
  if (prod3.stock > 0 && prod3.stock <= 5) { status = "Critico"; color = "orange"; alerta = true; }   // numero magico 5
  if (prod3.stock > 5 && prod3.stock <= 15) { status = "Bajo"; color = "yellow"; alerta = true; }     // numero magico 15
  if (prod3.stock > 15 && prod3.stock <= 30) { status = "Normal"; color = "green"; alerta = false; }  // numero magico 30
  if (prod3.stock > 30) { status = "Alto"; color = "green"; alerta = false; }
  return { ok: true, prodId: prodId4, stock: prod3.stock, status: status, color: color, alerta: alerta };
}
  */


//Niveles Del Inventario
const NivelesInventario = [
  { Estado: "Agotado", Alerta: true, Limite: 0  },
  { Estado: "Crítico", Alerta: true, Limite: 5  },
  { Estado: "Bajo", Alerta: true, Limite: 15  },
  { Estado: "Normal", Alerta: false, Limite: 30  },
  { Estado: "Alto", Alerta: false, Limite: Infinity  }
];

//Busqueda Objeto que sea True, retornando así sus detalles en base al Stock Actual
function CalcularRango (Stock){
  if (typeof Stock !== "number" || Stock < 0) {
    return "Entrada Inválida";
  }else{
    const NivelFinal = NivelesInventario.find(nivelTemp => Stock <= nivelTemp.Limite);
    return { Estado: NivelFinal.Estado, Alerta: NivelFinal.Alerta };
  }
}

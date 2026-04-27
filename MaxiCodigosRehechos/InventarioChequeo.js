//MARK: Función Inventario Chequeo

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

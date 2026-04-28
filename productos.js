import {productos} from './bdd.js';
 
const UMBRALES_STOCK={CRITICO:5, BAJO:15, NORMAL:30};
 
function buscar({query='', categoria='', precioMin=0, precioMax=Infinity}={})
{
  return productos
    .filter(p=>p.activo)
    .filter(p=>{
      if (!query) return true;
      const q=query.toLowerCase();
      return p.nombre.toLowerCase().includes(q)||p.descripcion.toLowerCase().includes(q)||p.tags.some(t=>t.toLowerCase().includes(q));
    })
    .filter(p=>!categoria||p.categoria===categoria)
    .filter(p=>p.precio>=precioMin&&p.precio<=precioMax)
    .sort((a,b)=>b.rating-a.rating);
}
 
function buscarPorId(id) {return productos.find(p=>p.id===id&&p.activo)||null;}
 
function estadoStock(stock)
{
  if (stock===0)                     return {estado:'Agotado', color:'red',    alerta:true};
  if (stock<=UMBRALES_STOCK.CRITICO) return {estado:'Crítico', color:'orange', alerta:true};
  if (stock<=UMBRALES_STOCK.BAJO)    return {estado:'Bajo',    color:'yellow', alerta:true};
  if (stock<=UMBRALES_STOCK.NORMAL)  return {estado:'Normal',  color:'green',  alerta:false};
  return                                    {estado:'Alto',    color:'green',  alerta:false};
}
 
function verificarInventario(productoId)
{
  const producto=productos.find(p=>p.id===productoId);
  if (!producto) {return {ok:false, mensaje:'Producto no encontrado'};}
  return {ok:true, productoId, stock:producto.stock, ...estadoStock(producto.stock)};
}
 
function estadisticas()
{
  const activos=productos.filter(p=>p.activo);
  const porCategoria=activos.reduce((acc,p)=>
  {
    acc[p.categoria]=(acc[p.categoria]||0)+1;
    return acc;
  },{});
 
  return {
    total: productos.length,
    activos: activos.length,
    inactivos: productos.length-activos.length,
    porCategoria,
    stockTotal: productos.reduce((s,p)=>s+p.stock,0),
    valorInventario: productos.reduce((s,p)=>s+p.precio*p.stock,0),
  };
}
 
export default {buscar, buscarPorId, verificarInventario, estadisticas};

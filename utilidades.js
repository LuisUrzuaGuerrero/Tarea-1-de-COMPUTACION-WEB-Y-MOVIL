function formatearPrecio(numero) {return '$'+numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
 
function formatearFecha(fecha)
{
  const d=fecha instanceof Date ? fecha : new Date(fecha);
  const dia=String(d.getDate()).padStart(2,'0');
  const mes=String(d.getMonth()+1).padStart(2,'0');
  const horas=String(d.getHours()).padStart(2,'0');
  const mins=String(d.getMinutes()).padStart(2,'0');
  const segs=String(d.getSeconds()).padStart(2,'0');
  return `${dia}/${mes}/${d.getFullYear()} ${horas}:${mins}:${segs}`;
}
 
function formatearFechaCorta(fechaStr)
{
  const partes=fechaStr.split('-');
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
 
function paginar(items, pagina, tamano)
{
  const total=items.length;
  const totalPaginas=Math.ceil(total/tamano);
  const inicio=(pagina-1)*tamano;
  return {items:items.slice(inicio,inicio+tamano), pagina, totalPaginas, total, tamano};
}
 
function ordenar(items, campo, orden='asc')
{
  return [...items].sort((a,b)=>
  {
    if (a[campo]<b[campo]) return orden==='asc' ? -1 : 1;
    if (a[campo]>b[campo]) return orden==='asc' ? 1 : -1;
    return 0;
  });
}
 
function capitalizar(str) {return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();}
function truncar(str, largo) {return str.length>largo ? str.substring(0,largo)+'...' : str;}
 
function sumar(arr) {return arr.reduce((s,v)=>s+v,0);}
function promedio(arr) {return arr.length>0 ? sumar(arr)/arr.length : 0;}
function unicos(arr) {return [...new Set(arr)];}
 
const MULTIPLICADOR_CIUDAD={
  'Santiago':1.0, 'Valparaiso':1.2, 'Concepcion':1.4,
  'La Serena':1.6, 'Antofagasta':1.8, 'Iquique':2.0, 'Punta Arenas':2.5,
};
 
const MULTIPLICADOR_TIPO={fragil:1.5, electronico:1.3, normal:1.0};
 
function costoBasePorPeso(peso)
{
  if (peso<=1)  return 2000;
  if (peso<=5)  return 3500;
  if (peso<=10) return 5000;
  if (peso<=20) return 8000;
  return 12000;
}
 
function calcularEnvio({ciudad, peso, tipoProducto='normal', esUrgente=false, esGratis=false, tieneSeguro=false})
{
  if (esGratis) {return {costo:0, desglose:'Envío gratis'};}
 
  const multCiudad=MULTIPLICADOR_CIUDAD[ciudad]||1.0;
  const multTipo=MULTIPLICADOR_TIPO[tipoProducto]||1.0;
  const base=costoBasePorPeso(peso)*multTipo*multCiudad;
  const urgente=esUrgente ? base*0.5 : 0;
  const seguro=tieneSeguro ? base*0.1 : 0;
 
  return {costo:base+urgente+seguro, base, urgente, seguro};
}
 
const CANALES_VALIDOS=['email','sms','push','inapp'];
 
function enviarNotificacion(canal, usuarioId, mensaje, datos=null)
{
  if (!CANALES_VALIDOS.includes(canal)) {return {ok:false, canal, usuarioId, mensaje, enviadoEn:new Date(), error:'Canal no válido'};}
  console.log(`[${canal.toUpperCase()}] Usuario ${usuarioId}: ${mensaje}`);
  return {ok:true, canal, usuarioId, mensaje, datos, enviadoEn:new Date()};
}
 
const NIVELES_LOG=['debug','info','warn','error'];
 
function log(nivel, mensaje, datos=null)
{
  if (!NIVELES_LOG.includes(nivel)) {nivel='info';}
  const timestamp=new Date().toISOString();
  const entrada=`[${timestamp}] [${nivel.toUpperCase()}] ${mensaje}`;
  if (datos) {console.log(entrada, datos);}
  else {console.log(entrada);}
}
 
function generarReporte(tipo, datos, {desde='', hasta=''}={})
{
  const encabezados={
    ventas:'=== REPORTE DE VENTAS ===',
    productos:'=== REPORTE DE PRODUCTOS ===',
    usuarios:'=== REPORTE DE USUARIOS ===',
  };
 
  if (!encabezados[tipo]) {return 'Tipo de reporte no válido';}
 
  const lineas=[encabezados[tipo], `Desde: ${desde}`, `Hasta: ${hasta}`, ''];
 
  if (tipo==='ventas')
    {
      const totales=datos.map(v=>v.total);
      datos.forEach(v=>lineas.push(`Orden: ${v.id} | Total: ${formatearPrecio(v.total)} | Estado: ${v.estado}`));
      lineas.push('',`Total órdenes: ${datos.length}`,`Total ingresos: ${formatearPrecio(sumar(totales))}`,`Promedio: ${formatearPrecio(Math.round(promedio(totales)))}`,`Máximo: ${formatearPrecio(Math.max(...totales))}`,`Mínimo: ${formatearPrecio(Math.min(...totales))}`);
    }
 
  if (tipo==='productos')
    {
      const precios=datos.map(p=>p.precio);
      datos.forEach(p=>lineas.push(`${p.nombre} | ${formatearPrecio(p.precio)} | Stock: ${p.stock} | Rating: ${p.rating}`));
      lineas.push('',`Total productos: ${datos.length}`,`Precio promedio: ${formatearPrecio(Math.round(promedio(precios)))}`,`Precio máximo: ${formatearPrecio(Math.max(...precios))}`,`Precio mínimo: ${formatearPrecio(Math.min(...precios))}`);
    }
 
  if (tipo==='usuarios')
    {
      const puntos=datos.map(u=>u.puntos);
      datos.forEach(u=>lineas.push(`${u.nombre} | ${u.email} | ${u.tipo} | Puntos: ${u.puntos} | Activo: ${u.activo}`));
      lineas.push('',`Total usuarios: ${datos.length}`,`Puntos promedio: ${Math.round(promedio(puntos))}`,`Máx puntos: ${Math.max(...puntos)}`,`Mín puntos: ${Math.min(...puntos)}`);
    }
 
  return lineas.join('\n');
}
 
export default {
  formatearPrecio,
  formatearFecha,
  formatearFechaCorta,
  paginar,
  ordenar,
  capitalizar,
  truncar,
  sumar,
  promedio,
  unicos,
  calcularEnvio,
  enviarNotificacion,
  log,
  generarReporte};

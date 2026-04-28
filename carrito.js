import {usuarios, productos} from './bdd.js';
 
function obtenerUsuario(usuarioId) {return usuarios.find(u=>u.id===usuarioId)||null;}
function obtenerProducto(productoId) {return productos.find(p=>p.id===productoId)||null;}
 
function calcularTotal(carrito)
{
  return carrito.reduce((total,item)=>{
    const producto=obtenerProducto(item.productoId);
    return producto ? total+producto.precio*item.cantidad : total;
  },0);
}
 
function agregar(usuarioId, productoId, cantidad)
{
  const usuario=obtenerUsuario(usuarioId);
  if (!usuario) {return {ok:false, mensaje:'Usuario no encontrado'};}
 
  const producto=obtenerProducto(productoId);
  if (!producto) {return {ok:false, mensaje:'Producto no encontrado'};}
  if (!producto.activo) {return {ok:false, mensaje:'Producto no disponible'};}
  if (producto.stock<cantidad) {return {ok:false, mensaje:'Stock insuficiente'};}
 
  const itemExistente=usuario.carrito.find(i=>i.productoId===productoId);
  if (itemExistente) {itemExistente.cantidad+=cantidad;}
  else {usuario.carrito.push({productoId, cantidad, agregadoEn:new Date()});}
 
  return {ok:true, mensaje:'Producto agregado al carrito', carrito:usuario.carrito, total:calcularTotal(usuario.carrito)};
}
 
function quitar(usuarioId, productoId)
{
  const usuario=obtenerUsuario(usuarioId);
  if (!usuario) {return {ok:false, mensaje:'Usuario no encontrado'};}
 
  const indice=usuario.carrito.findIndex(i=>i.productoId===productoId);
  if (indice===-1) {return {ok:false, mensaje:'Producto no está en el carrito'};}
 
  usuario.carrito.splice(indice,1);
  return {ok:true, mensaje:'Producto removido del carrito', carrito:usuario.carrito, total:calcularTotal(usuario.carrito)};
}
 
function obtener(usuarioId)
{
  const usuario=obtenerUsuario(usuarioId);
  if (!usuario) {return {ok:false, mensaje:'Usuario no encontrado'};}
  return {ok:true, carrito:usuario.carrito, total:calcularTotal(usuario.carrito)};
}
 
function vaciar(usuarioId)
{
  const usuario=obtenerUsuario(usuarioId);
  if (!usuario) {return {ok:false, mensaje:'Usuario no encontrado'};}
  usuario.carrito=[];
  return {ok:true, mensaje:'Carrito vaciado'};
}
 
export {calcularTotal, vaciar};
export default {agregar, quitar, obtener, vaciar, calcularTotal};

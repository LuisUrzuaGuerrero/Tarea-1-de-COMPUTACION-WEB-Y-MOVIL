import {usuarios} from './bdd.js';
 
const MAX_INTENTOS_LOGIN=3;
 
function calcularNivelUsuario(puntos)
{
  if (puntos>=300) return 'platino';
  if (puntos>=200) return 'oro';
  if (puntos>=100) return 'plata';
  return 'bronce';
}
 
function generarToken() {return 'tkn_'+Math.random().toString(36).substr(2,9);}
 
function login(email, password)
{
  const usuario=usuarios.find(u=>u.email===email && u.pass===password);
 
  if (!usuario)
    {
      const usuarioExistente=usuarios.find(u=>u.email===email);
      if (usuarioExistente)
        {
          usuarioExistente.intentos++;
          if (usuarioExistente.intentos>=MAX_INTENTOS_LOGIN) {usuarioExistente.bloqueado=true;}
        }
      return {ok:false, mensaje:'Credenciales inválidas'};
    }
 
  if (usuario.bloqueado) {return {ok:false, mensaje:'Usuario bloqueado'};}
  if (!usuario.activo) {return {ok:false, mensaje:'Usuario inactivo'};}
 
  usuario.intentos=0;
  usuario.ultimoLogin=new Date().toISOString();
  usuario.nivel=calcularNivelUsuario(usuario.puntos);
 
  const sesion={
    usuario,
    token: generarToken(),
    fechaLogin: new Date(),
  };
 
  return {ok:true, mensaje:'Login exitoso', sesion};
}
 
function validarEmail(email) {return typeof email==='string' && email.includes('@') && email.includes('.');}
 
function validarPassword(password) {return typeof password==='string' && password.length>=4;}
 
function validarRut(rut) {return typeof rut==='string' && rut.length>=8 && rut.includes('-');}
 
function validarRegistro(datos)
{
  const errores=[];
  if (!datos.nombre||datos.nombre.length<3) {errores.push('Nombre inválido (mínimo 3 caracteres)');}
  if (!validarEmail(datos.email)) {errores.push('Email inválido');}
  if (!datos.pass||datos.pass.length<8) {errores.push('La contraseña debe tener mínimo 8 caracteres');}
  if (datos.pass!==datos.passConfirm) {errores.push('Las contraseñas no coinciden');}
  if (!validarRut(datos.rut)) {errores.push('RUT inválido');}
  return errores;
}
 
function registrar(datos)
{
  const errores=validarRegistro(datos);
  if (errores.length>0) {return {ok:false, errores};}
 
  const emailEnUso=usuarios.find(u=>u.email===datos.email);
  if (emailEnUso) {return {ok:false, errores:['El email ya está registrado']};}
 
  const nuevoUsuario={
    id: Math.floor(Math.random()*9000)+1000,
    nombre: datos.nombre,
    email: datos.email,
    pass: datos.pass,
    rut: datos.rut,
    telefono: datos.telefono||null,
    tipo: 'cliente',
    puntos: 0,
    descuento: 0,
    historial: [],
    carrito: [],
    wishlist: [],
    activo: true,
    intentos: 0,
    bloqueado: false,
    ultimoLogin: null,
    creadoEn: new Date().toISOString(),
  };
 
  usuarios.push(nuevoUsuario);
 
  const sesion={
    usuario: nuevoUsuario,
    token: generarToken(),
    fechaLogin: new Date(),
  };
 
  return {ok:true, usuario:nuevoUsuario, sesion, redirect:'/dashboard'};
}
 
export default {login, registrar, calcularNivelUsuario, validarEmail, validarPassword, validarRut};

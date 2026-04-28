const usuarios=[
    {id: 1, nombre: "Juan Perez",     email: "juan@mail.com",   pass: "1234",     tipo: "admin",    puntos: 150, descuento: 0,  historial: [], carrito: [], wishlist: [],        activo: true,  intentos: 0, bloqueado: false, ultimoLogin: null },
    {id: 2, nombre: "Maria Lopez",    email: "maria@mail.com",  pass: "abcd",     tipo: "cliente",  puntos: 80,  descuento: 5,  historial: [], carrito: [], wishlist: [102,104,105], activo: true,  intentos: 0, bloqueado: false, ultimoLogin: null },
    {id: 3, nombre: "Pedro Gonzalez", email: "pedro@mail.com",  pass: "pass123",  tipo: "vendedor", puntos: 200, descuento: 10, historial: [], carrito: [], wishlist: [],        activo: true,  intentos: 0, bloqueado: false, ultimoLogin: null },
    {id: 4, nombre: "Ana Martinez",   email: "ana@mail.com",    pass: "ana2024",  tipo: "cliente",  puntos: 50,  descuento: 0,  historial: [], carrito: [], wishlist: [101],      activo: false, intentos: 3, bloqueado: true,  ultimoLogin: null },
    {id: 5, nombre: "Carlos Ruiz",    email: "carlos@mail.com", pass: "carlos99", tipo: "cliente",  puntos: 300, descuento: 15, historial: [], carrito: [], wishlist: [103,107,108], activo: true,  intentos: 0, bloqueado: false, ultimoLogin: null },
];

const productos=[
    {id: 101, nombre:"Laptop Pro 15",         categoria: "electronica",    precio: 1200000, stock: 5,  descripcion: "Laptop de alto rendimiento",           rating: 4.5, reviews: [], vendedorId: 3, imagenes: ["img1.jpg","img2.jpg"], tags: ["laptop","computador","pro"], activo: true },
    {id: 102, nombre:"Mouse Inalambrico",     categoria: "accesorios",     precio: 25000,   stock: 50, descripcion: "Mouse ergonomico inalambrico",         rating: 4.0, reviews: [], vendedorId: 3, imagenes: ["img3.jpg"],            tags: ["mouse","inalambrico"],       activo: true },
    {id: 103, nombre:"Teclado Mecanico RGB",  categoria: "accesorios",     precio: 85000,   stock: 20, descripcion: "Teclado mecanico con iluminacion RGB", rating: 4.8, reviews: [], vendedorId: 3, imagenes: ["img4.jpg","img5.jpg"], tags: ["teclado","mecanico","rgb"],  activo: true },
    {id: 104, nombre:'Monitor 4K 27"',        categoria: "electronica",    precio: 450000,  stock: 8,  descripcion: "Monitor 4K con HDR",                   rating: 4.6, reviews: [], vendedorId: 3, imagenes: ["img6.jpg"],            tags: ["monitor","4k"],              activo: true },
    {id: 105, nombre:"Auriculares Bluetooth", categoria: "audio",          precio: 75000,   stock: 30, descripcion: "Auriculares con cancelacion de ruido", rating: 4.3, reviews: [], vendedorId: 3, imagenes: ["img7.jpg"],            tags: ["auriculares","bluetooth"],   activo: true },
    {id: 106, nombre:"Webcam HD 1080p",       categoria: "accesorios",     precio: 45000,   stock: 15, descripcion: "Webcam para videoconferencias",        rating: 4.1, reviews: [], vendedorId: 3, imagenes: ["img8.jpg"],            tags: ["webcam","camara"],           activo: true },
    {id: 107, nombre:"SSD 1TB",               categoria: "almacenamiento", precio: 95000,   stock: 25, descripcion: "SSD de alta velocidad",                rating: 4.7, reviews: [], vendedorId: 3, imagenes: ["img9.jpg"],            tags: ["ssd","almacenamiento"],      activo: true },
    {id: 108, nombre:"Memoria RAM 16GB",      categoria: "componentes",    precio: 65000,   stock: 40, descripcion: "RAM DDR4 3200MHz",                     rating: 4.4, reviews: [], vendedorId: 3, imagenes: ["img10.jpg"],           tags: ["ram","memoria"],             activo: true },
    {id: 109, nombre:"Silla Gamer",           categoria: "muebles",        precio: 350000,  stock: 10, descripcion: "Silla ergonomica para gaming",         rating: 4.2, reviews: [], vendedorId: 3, imagenes: ["img11.jpg"],           tags: ["silla","gamer"],             activo: false },
    {id: 110, nombre:"Hub USB-C 7 en 1",      categoria: "accesorios",     precio: 38000,   stock: 60, descripcion: "Hub multipuerto USB-C",                rating: 3.9, reviews: [], vendedorId: 3, imagenes: ["img12.jpg"],           tags: ["hub","usb"],                 activo: true },
];

const cupones=[
    {codigo: "DESC10",     tipo: "porcentaje", valor: 10,   minCompra: 50000,  maxUsos: 100,  usos: 45,  activo: true, expira: "2024-12-31", categorias: [],             usuariosPermitidos: [] },
    {codigo: "DESC20",     tipo: "porcentaje", valor: 20,   minCompra: 100000, maxUsos: 50,   usos: 50,  activo: true, expira: "2024-06-30", categorias: ["electronica"], usuariosPermitidos: [] },
    {codigo: "ENVGRATIS",  tipo: "envio",      valor: 100,  minCompra: 30000,  maxUsos: 200,  usos: 180, activo: true, expira: "2024-12-31", categorias: [],             usuariosPermitidos: [] },
    {codigo: "BIENVENIDO", tipo: "fijo",       valor: 5000, minCompra: 20000,  maxUsos: 1000, usos: 523, activo: true, expira: "2025-12-31", categorias: [],             usuariosPermitidos: [] },
    {codigo: "VIP2024",    tipo: "porcentaje", valor: 25,   minCompra: 200000, maxUsos: 20,   usos: 15,  activo: true, expira: "2024-12-31", categorias: [],             usuariosPermitidos: [1,3,5] },
];

const resenas=[
    {id: 1, productoId: 101, usuarioId: 2, rating: 5, comentario: "Excelente laptop!",              fecha: "2023-08-01", likes: 10, verificada: true},
    {id: 2, productoId: 101, usuarioId: 3, rating: 4, comentario: "Muy buena pero cara",            fecha: "2023-08-15", likes: 5,  verificada: true},
    {id: 3, productoId: 102, usuarioId: 1, rating: 4, comentario: "Buen mouse",                     fecha: "2023-09-01", likes: 2,  verificada: false},
    {id: 4, productoId: 103, usuarioId: 5, rating: 5, comentario: "El mejor teclado que he tenido", fecha: "2023-09-15", likes: 15, verificada: true},
    {id: 5, productoId: 104, usuarioId: 2, rating: 4, comentario: "Monitor increible",              fecha: "2023-10-01", likes: 8,  verificada: true},
];

export {usuarios, productos, cupones, resenas};

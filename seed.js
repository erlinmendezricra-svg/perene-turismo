const db = require('./db');

db.serialize(() => {
  // 🔴 BORRAR la tabla antigua completamente
  db.run('DROP TABLE IF EXISTS atractivos', (err) => {
    if (err) console.error('Error borrando tabla:', err);
    else console.log('🗑️ Tabla antigua eliminada');
  });

  // ✅ CREAR la tabla con TODOS los campos
  db.run(`
    CREATE TABLE atractivos (
      id_lugar INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      imagen_principal TEXT,
      ubicacion TEXT,
      horario TEXT,
      informacion_completa TEXT
    )
  `, (err) => {
    if (err) console.error('Error creando tabla:', err);
    else console.log('✅ Tabla nueva creada con todos los campos');
  });

  // 📝 Insertar los 6 atractivos
  const sql = `INSERT INTO atractivos 
    (nombre, descripcion, imagen_principal, ubicacion, horario, informacion_completa)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const lugares = [
    ['Boca Tigre', 'Hermoso atractivo natural de Perené...', 'img/boca_tigre.jpg', 'Río Perené - Zona Norte', 'Todo el día', 'Boca Tigre es un impresionante espacio natural donde se unen ríos...'],
    ['Catarata', 'Impresionante caída de agua...', 'img/catarata.jpg', 'Valle de Perené', '08:00 - 17:00', 'Catarata de gran belleza natural rodeada de vegetación exuberante...'],
    ['Caverna La Olada', 'Exploración y naturaleza...', 'img/caverna_la_olada.jpg', 'Sector La Olada', '09:00 - 16:00', 'Caverna con formaciones geológicas únicas, ideal para turismo de aventura...'],
    ['Fundo San Isidro', 'Gastronomía y campo...', 'img/fundo_san_isidro.jpg', 'Zona Rural', '07:00 - 19:00', 'Lugar para disfrutar de comida típica y paisajes del campo...'],
    ['Juan Santos Atahualpa', 'Historia y cultura...', 'img/juan_santos_atahualpa.jpg', 'Centro Histórico', 'Lunes a Domingo', 'Sitio histórico que narra importantes sucesos de la región...'],
    ['Mirador', 'Vistas panorámicas...', 'img/mirador.jpg', 'Cerro El Mirador', 'Todo el día', 'El mejor punto para observar todo el valle de Perené y sus alrededores...']
  ];

  let pendientes = lugares.length;
  lugares.forEach(datos => {
    db.run(sql, datos, (err) => {
      if (err) console.error('❌ Error insertando:', err);
      pendientes--;
      if (pendientes === 0) {
        console.log('✅ LOS 6 ATRACTIVOS CARGADOS CORRECTAMENTE');
      }
    });
  });
});
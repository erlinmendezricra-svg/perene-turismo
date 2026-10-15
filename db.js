const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'turismo.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ ERROR de conexión:', err.message);
  } else {
    console.log('✅ CONECTADO a turismo.db');
  }
});

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS atractivos (
    id_lugar INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    imagen_principal TEXT,
    ubicacion TEXT,
    horario TEXT,
    informacion_completa TEXT
  )
`);

module.exports = db;
require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Importar el m�dulo crypto
const path = require('path');

const https = require('https');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio SMTP
  auth: {
    user: 'magicarduct@gmail.com',
    pass: 'afyoddcenvpjrdbq',   
  },
});

const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: '"Soporte de Magicarduct" <magicarduct@gmail.com>',
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `<p>Hola,</p>
             <p>Parece que solicitaste un cambio de contraseña.</p>
             <p>Puedes restablecer tu contraseña haciendo clic en el siguiente enlace:</p>
             <a href="${resetLink}">Restablecer Contraseña</a>
             <p>Si no solicitaste este cambio ignora el mensaje.</p>
             <p>Si no puedes ver acceder desde el hipervinculo accede desde este link:</p>
             <p>${resetLink}</p>
             `,
    });
    console.log('Correo de recuperación enviado');
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw error; // para manejar errores en la ruta
  }
};

const options = {
    key: fs.readFileSync('/etc/letsencrypt/archive/magicarduct.online/privkey1.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/magicarduct.online/fullchain1.pem')
};

const app = express();

const port = process.env.PORT || 3000; // Utiliza el puerto definido en .env o por defecto el 3000

// Middleware
const allowedOrigins = [
  'http://localhost:3001',
  'http://magicarduct.online',
  'http://localhost:3000',
  'http://localhost:8081', // Tu máquina local
  'http://186.64.122.218:3000',  // IP del host remoto
  'http://186.64.122.218', // Otro dominio permitido
  'https://localhost:3001',
  'https://magicarduct.online',
  'https://localhost:3000',
  'https://localhost:8081', // Tu máquina local
  'https://186.64.122.218:3000',  // IP del host remoto
  'https://186.64.122.218', // Otro dominio permitido
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Configuración de sesiones utilizando el secreto desde el archivo .env
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, // Solo se enviará a través de HTTPS
    httpOnly: true, // Evita el acceso de JavaScript en el cliente a la cookie
    sameSite: 'strict' // Protección contra CSRF
  }
}));

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());

// Conexiï¿½n a la base de datos MySQL utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Middleware para verificar que el usuario estï¿½ autenticado
const isAuthenticated = (req, res, next) => {
  console.log('TOY AUTENTICAO WEBON!:', req.session.userId);
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
};


// Endpoint de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Datos de inicio de sesiï¿½n:', req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseï¿½a son requeridos.' });
  }

  const query = 'SELECT idusuario FROM usuario WHERE correo = ? AND clave = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    console.log('Resultados de la consulta:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseï¿½a incorrectos.' });
    }

    // Iniciar sesiï¿½n
    req.session.userId = results[0].idusuario;
    console.log('pene:', req.session);
    res.status(200).json({ message: 'Inicio de sesiï¿½n exitoso', userId: results[0].idusuario });
    console.log('Funciono esta mierda o no?: ', results[0].idusuario);
  });
});
//Endpoint del logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error cerrando sesiÃ³n' });
    }
    res.status(200).json({ message: 'SesiÃ³n cerrada exitosamente' });
  });
});

app.post('/update-deck-image', (req, res) => {
    const { deckId, imageUuid } = req.body; // Recibir los datos del cliente

    // Validar que se reciban todos los par�metros requeridos
    if (!deckId || !imageUuid) {
        return res.status(400).json({ error: 'Se requieren deckId e imageUuid.' });
    }

    // Consulta SQL para actualizar la imagen asociada al mazo
    const query = `
        UPDATE barajas
        SET imagen = ?
        WHERE idbarajas = ?
    `;

    db.query(query, [imageUuid, deckId], (err, result) => {
        if (err) {
            console.error('Error al actualizar la imagen del mazo:', err);
            return res.status(500).json({ error: 'Error al actualizar la imagen del mazo' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mazo no encontrado' });
        }

        // Respuesta exitosa
        res.status(200).json({ message: 'Imagen del mazo actualizada exitosamente' });
    });
});

app.post('/register', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { nombre, correo, clave } = req.body;

  if (!nombre || !correo || !clave) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Verificar si el correo ya existe
  const checkQuery = 'SELECT * FROM usuario WHERE correo = ?';
  db.query(checkQuery, [correo], (err, results) => {
    if (err) {
      console.error('Error al verificar el correo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al verificar el correo' });
    }

    if (results.length > 0) {
      console.log('El correo ya está registrado'); // Mensaje de correo repetido
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Insertar el nuevo usuario si el correo no está repetido
    const query = 'INSERT INTO usuario (nombre, correo, clave, foto) VALUES (?, ?, ?, "default-avatar-id")';
    db.query(query, [nombre, correo, clave], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err); // Mensaje de error
        return res.status(500).json({ error: 'Error al registrar el usuario' });
      }
      res.status(200).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

// Ruta para solicitar recuperación de contraseña
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Generación del token de recuperación
    const resetToken = crypto.randomBytes(32).toString('hex'); // Generar un token seguro
    const resetLink = `https://magicarduct.online/reset-password?token=${resetToken}`;
    
    // Guardar el token en la base de datos asociado al usuario
    const query = 'UPDATE usuario SET reset_token = ? WHERE correo = ?';
    db.query(query, [resetToken, email], async (err, result) => {
      if (err) {
        console.error('Error al guardar el token de recuperación:', err);
        return res.status(500).json({ message: 'Error al guardar el token de recuperación.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Correo no encontrado.' });
      }

      // Envía el correo al usuario
      await sendPasswordResetEmail(email, resetLink);
      res.status(200).json({ message: 'Correo de recuperación enviado.' });
    });
  } catch (error) {
    console.error('Error en /forgot-password:', error);
    res.status(500).json({ message: 'Error enviando correo de recuperación.' });
  }
});
// Ruta para servir la página de restablecimiento
app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'reset-password.html'));
});

app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  // Verificar que se proporcionen el token y la nueva contraseña
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token y nueva contraseña son requeridos.' });
  }

  // Consulta para verificar el token y actualizar la contraseña
  const query = 'UPDATE usuario SET clave = ? WHERE reset_token = ?';
  db.query(query, [newPassword, token], (err, result) => {
    if (err) {
      console.error('Error al restablecer la contraseña:', err);
      return res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Token inválido o expirado.' });
    }

    // Limpiar el token de restablecimiento después de usarlo
    const clearTokenQuery = 'UPDATE usuario SET reset_token = NULL WHERE reset_token = ?';
    db.query(clearTokenQuery, [token], (err) => {
      if (err) {
        console.error('Error al limpiar el token de restablecimiento:', err);
        return res.status(500).json({ message: 'Error al limpiar el token de restablecimiento.' });
      }

      res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    });
  });
});
// Ruta para cambiar la contraseña
app.post('/api/cambiar-contrasena', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Verificar que se proporcionen todos los datos necesarios
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  // Consulta para verificar la contraseña actual
  const verifyQuery = 'SELECT clave FROM usuario WHERE idusuario = ?';
  db.query(verifyQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error al verificar la contraseña actual:', err);
      return res.status(500).json({ message: 'Error al verificar la contraseña actual.' });
    }

    if (results.length === 0 || results[0].clave !== currentPassword) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
    }

    // Consulta para actualizar la contraseña
    const updateQuery = 'UPDATE usuario SET clave = ? WHERE idusuario = ?';
    db.query(updateQuery, [newPassword, userId], (err, result) => {
      if (err) {
        console.error('Error al actualizar la contraseña:', err);
        return res.status(500).json({ message: 'Error al actualizar la contraseña.' });
      }

      res.status(200).json({ message: 'Contraseña cambiada exitosamente.' });
    });
  });
});

//Obtener datos de usuario
app.get('/obtener-usuario', (req, res) => {
  const userId = req.query.userId; // Obtiene el userId de los parámetros de consulta

  // Consulta a la base de datos
  const query = 'SELECT nombre, correo, foto FROM usuario WHERE idusuario = ?';
  
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0]; // Asumiendo que solo habrá un resultado
      res.json({ userName: usuario.nombre, email: usuario.correo, image: usuario.foto });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

app.get('/usuario', isAuthenticated, (req, res) => {
  const userId = req.session.userId;
  
  const query = 'SELECT nombre, correo FROM usuario WHERE idusuario = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userData = results[0];
    res.json(userData);
  });
});

// GET: Obtiene todas las barajas de un usuario específico por su ID
app.get('/api/barajasdeusuario/:IDusuario', async (req, res) => {
  const { IDusuario } = req.params;

  // Consulta para unir las tablas barajas_de_usuario y barajas
  const query = `
    SELECT bu.idbarajas_de_usuario, b.nombre 
    FROM barajas_de_usuario bu
    JOIN barajas b ON bu.idbarajas = b.idbarajas
    WHERE bu.id_usuario = ?
  `;

  try {
    const [rows] = await db.execute(query, [IDusuario]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No se encontraron barajas' });
    }
  } catch (error) {
    console.error('Error al obtener barajas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene todas las barajas de un usuario específico por su ID
app.get('/api/barajasdeusuaio2/:IDusuario', async (req, res) => {
  const { IDusuario } = req.params;

  // Consulta cruzada (JOIN) para obtener los nombres y el id de las barajas asociadas al usuario
  // EL QUE TOQUE LA IMAGEN LO MATO.
  const query = `
    SELECT b.idbarajas, b.nombre, b.imagen
    FROM barajas_de_usuario bu
    JOIN barajas b ON bu.idbarajas_de_usuario = b.idbarajas
    WHERE bu.id_usuario = ?
  `;

  try {
    db.query(query, [IDusuario], (err, rows) => {
      if (err) {
        console.error('Error al obtener barajas:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }

      if (rows.length > 0) {
        res.status(200).json(rows); // Devolverá el id y los nombres de las barajas
      } else {
        res.status(404).json({ error: 'No se encontraron barajas' });
      }
    });
  } catch (error) {
    console.error('No se encontraron barajas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene todas las cartas de un mazo especÃ­fico por su ID
app.get('/api/mazocartas/:IDmazo', async (req, res) => {
  const { IDmazo } = req.params;

  const query = `SELECT * FROM mazo_cartas WHERE IDmazo = ?`;

  try {
    db.query(query, [IDmazo], (err, rows) => {
      if (err) {
        console.error('Error al obtener las cartas:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }

      if (rows.length > 0) {
        res.status(200).json(rows); 
      } else {
        res.status(404).json({ error: 'No se encontraron cartas' });
      }
    });
  } catch (error) {
    console.error('No se encontraron cartas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene informaciÃ³n de una baraja especÃ­fica por su ID
app.get('/api/barajas/:IDbarajas', async (req, res) => {
  const { IDbarajas } = req.params;

  const query = `SELECT * FROM barajas WHERE idbarajas = ?`;

  try {
    const [rows] = await db.execute(query, [IDbarajas]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No se encontro informacion del mazo' });
    }
  } catch (error) {
    console.error('No se encontro informacion del mazo', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST: Crea un nuevo mazo y lo asocia a un usuario especÃ­fico
app.post('/api/createmazo', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { nombre, formato, descripcion, idusuario } = req.body;

  if (!nombre || !formato || !descripcion || !idusuario) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para insertar el nuevo mazo
  const queryMazo = 'INSERT INTO barajas (nombre, formato, descripcion) VALUES (?, ?, ?)';
  db.query(queryMazo, [nombre, formato, descripcion], (err, result) => {
    if (err) {
      console.error('Error al crear mazo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al crear mazo' });
    }

    // Obtiene el ID del nuevo mazo
    const nuevoMazoId = result.insertId;
    console.log('Nuevo mazo creado con ID:', nuevoMazoId);

    // Consulta para asociar el nuevo mazo al usuario
    const queryUsuarioMazo = 'INSERT INTO barajas_de_usuario (id_usuario, idbarajas_de_usuario) VALUES (?, ?)';
    db.query(queryUsuarioMazo, [idusuario, nuevoMazoId], (err) => {
      if (err) {
        console.error('Error al asociar el mazo al usuario:', err); // Mensaje de error
        return res.status(500).json({ error: 'Error al asociar el mazo al usuario' });
      }
      
      // Respuesta final
      res.status(200).json({ message: 'Mazo creado y asociado exitosamente', id: nuevoMazoId });
    });
  });
});

app.post('/api/createmazo2', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { nombre, formato, descripcion, idusuario } = req.body;

  if (!nombre || !formato || !descripcion || !idusuario) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Inserta el nuevo mazo
  const queryMazo = 'INSERT INTO barajas (nombre, formato, descripcion) VALUES (?, ?, ?)';
  db.query(queryMazo, [nombre, formato, descripcion], (err, result) => {
    if (err) {
      console.error('Error al crear mazo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al crear mazo' });
    }

    const nuevoMazoId = result.insertId;

    const queryUsuarioMazo = 'INSERT INTO barajas_de_usuario (id_usuario, idbarajas_de_usuario) VALUES (?, ?)';
    db.query(queryUsuarioMazo, [idusuario, nuevoMazoId], (err) => {
      if (err) {
        console.error('Error al asociar el mazo al usuario:', err);
        return res.status(500).json({ error: 'Error al asociar el mazo al usuario' });
      }

      // Respuesta final
      res.status(200).json({
        message: 'Mazo creado y asociado exitosamente',
        baraja: {
          id: nuevoMazoId,
          name: nombre
        }
      });
    });
  });
});

// PUT: Actualiza la contrasena de un usuario existente con el ID proporcionado
app.put('/api/actualizarpassword/:id', (req, res) => {
  const usuarioId = req.params.id; // Obtiene el ID del usuario de los parámetros
  const { newPassword } = req.body; // Obtiene la nueva password del cuerpo de la solicitud

  if (!newPassword) {
    return res.status(400).json({ error: 'La nueva password es requerida' });
  }

  const query = 'UPDATE usuario SET clave = ? WHERE idusuario = ?';
  
  db.query(query, [newPassword, usuarioId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la password:', err);
      return res.status(500).json({ error: 'Error al actualizar la password' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  });
});

// PUT: Actualiza un mazo existente con los datos proporcionados por su ID
app.put('/api/actualizarmazo/:id', (req, res) => {
  const mazoId = req.params.id; // Obtiene el ID del usuario de los parÃ¡metros
  const { nombre, formato, descripcion } = req.body; // Obtiene el nombre del cuerpo de la solicitud

  if (!nombre || !formato || !descripcion) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE barajas SET nombre = ?, formato = ?, descripcion = ? WHERE idbarajas = ?';
  
  db.query(query, [nombre, formato, descripcion, mazoId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el mazo:', err);
      return res.status(500).json({ error: 'Error al actualizar el mazo' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mazo no encontrado' });
    }

    res.status(200).json({ message: 'Mazo actualizado exitosamente' });
  });
});

// DELETE: Elimina un mazo especÃ­fico y sus referencias asociadas
app.delete('/api/eliminarmazo/:id', (req, res) => {
  const mazoId = req.params.id; // Obtiene el ID del mazo de los parÃ¡metros de la URL

  if (!mazoId) {
    return res.status(400).json({ error: 'ID del mazo es requerido' });
  }

  // Primero, eliminamos las referencias en la tabla de relaciÃ³n mazo_cartas
  const deleteMazoCartasQuery = 'DELETE FROM mazo_cartas WHERE IDmazo = ?';
  db.query(deleteMazoCartasQuery, [mazoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar las referencias en mazo_cartas:', err);
      return res.status(500).json({ error: 'Error al eliminar las referencias en mazo_cartas' });
    }

    // Luego, eliminamos las referencias en la tabla de relaciÃ³n barajas_de_usuario
    const deleteRelacionQuery = 'DELETE FROM barajas_de_usuario WHERE idbarajas_de_usuario = ?';
    db.query(deleteRelacionQuery, [mazoId], (err, result) => {
      if (err) {
        console.error('Error al eliminar las referencias del mazo en barajas_de_usuario:', err);
        return res.status(500).json({ error: 'Error al eliminar las referencias del mazo en barajas_de_usuario' });
      }

      // Finalmente, eliminamos el mazo de la tabla barajas
      const deleteMazoQuery = 'DELETE FROM barajas WHERE idbarajas = ?';
      db.query(deleteMazoQuery, [mazoId], (err, result) => {
        if (err) {
          console.error('Error al eliminar el mazo:', err);
          return res.status(500).json({ error: 'Error al eliminar el mazo' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Mazo no encontrado' });
        }

        res.status(200).json({ message: 'Mazo eliminado exitosamente' });
      });
    });
  });
});

app.delete('/api/eliminarmazo2/:nombre/:idUsuario', (req, res) => {
  const { nombre, idUsuario } = req.params;

  if (!nombre || !idUsuario) {
    return res.status(400).json({ error: 'El nombre del mazo y el ID del usuario son requeridos' });
  }

  // Primero, obtenemos el ID del mazo basado en el nombre y el ID de usuario
  const getMazoIdQuery = `
    SELECT b.idbarajas FROM barajas b
    JOIN barajas_de_usuario bu ON b.idbarajas = bu.idbarajas_de_usuario
    WHERE b.nombre = ? AND bu.id_usuario = ?
  `;
  
  db.query(getMazoIdQuery, [nombre, idUsuario], (err, results) => {
    if (err) {
      console.error('Error al obtener el ID del mazo:', err);
      return res.status(500).json({ error: 'Error al obtener el ID del mazo' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Mazo no encontrado para el usuario especificado' });
    }

    const mazoId = results[0].idbarajas;

    // Ahora que tenemos el ID del mazo, eliminamos las referencias en la tabla mazo_cartas
    const deleteMazoCartasQuery = 'DELETE FROM mazo_cartas WHERE IDmazo = ?';
    db.query(deleteMazoCartasQuery, [mazoId], (err) => {
      if (err) {
        console.error('Error al eliminar las referencias en mazo_cartas:', err);
        return res.status(500).json({ error: 'Error al eliminar las referencias en mazo_cartas' });
      }

      // Eliminamos las referencias en la tabla barajas_de_usuario
      const deleteRelacionQuery = 'DELETE FROM barajas_de_usuario WHERE idbarajas_de_usuario = ?';
      db.query(deleteRelacionQuery, [mazoId], (err) => {
        if (err) {
          console.error('Error al eliminar las referencias del mazo en barajas_de_usuario:', err);
          return res.status(500).json({ error: 'Error al eliminar las referencias del mazo en barajas_de_usuario' });
        }

        // Finalmente, eliminamos el mazo de la tabla barajas
        const deleteMazoQuery = 'DELETE FROM barajas WHERE idbarajas = ?';
        db.query(deleteMazoQuery, [mazoId], (err, result) => {
          if (err) {
            console.error('Error al eliminar el mazo:', err);
            return res.status(500).json({ error: 'Error al eliminar el mazo' });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mazo no encontrado' });
          }

          res.status(200).json({ message: 'Mazo eliminado exitosamente' });
        });
      });
    });
  });
});


// POST: Agrega cartas a un mazo especÃ­fico
app.post('/api/mazocartas', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { idmazo, idcarta, cantidad } = req.body;

  if (!idmazo || !idcarta || !cantidad) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  const query = 'INSERT INTO mazo_cartas (IDmazo, IDcarta, cantidad) VALUES (?, ?, ?)';
  db.query(query, [idmazo, idcarta, cantidad], (err, result) => {
    if (err) {
      console.error('Error al crear mazo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al crear mazo:' });
    }
    res.status(200).json({ message: 'Mazo creado exitosamente' });
  });
});

// PUT: Actualiza la cantidad de una carta en un mazo especÃ­fico
app.put('/api/actualizarmazocartas/:idmazo/:idcarta', (req, res) => {
  const { mazoId, IDcarta } = req.params; // Obtiene el ID del usuario de los parÃ¡metros
  const { cantidad } = req.body; // Obtiene el nombre del cuerpo de la solicitud

  if (!IDcarta || !cantidad) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE mazo_cartas SET cantidad = ? WHERE IDmazo = ? and IDcarta = ?';
  
  db.query(query, [cantidad, mazoId, IDcarta], (err, result) => {
    if (err) {
      console.error('Error al actualizar la carta:', err);
      return res.status(500).json({ error: 'Error al actualizar la carta' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Carta no encontrada' });
    }

    res.status(200).json({ message: 'Carta actualizada exitosamente' });
  });
});

// DELETE: Elimina una carta especÃ­fica de un mazo
app.delete('/api/eliminarmazocarta/:idmazo/:idcarta', (req, res) => {
  const { idmazo, idcarta } = req.params;

  if (!idmazo || !idcarta) {
    return res.status(400).json({ error: 'Faltan datos para eliminar la carta' });
  }

  const query = 'DELETE FROM mazo_cartas WHERE IDmazo = ? AND IDcarta = ?';
  
  db.query(query, [idmazo, idcarta], (err, result) => {
    if (err) {
      console.error('Error al eliminar la carta:', err);
      return res.status(500).json({ error: 'Error al eliminar la carta' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Carta no encontrada en el mazo' });
    }

    res.status(200).json({ message: 'Carta eliminada exitosamente' });
  });
});

app.put('/api/usuario/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, imageNumber } = req.body;

  if (!nombre || !correo || !imageNumber) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE usuario SET nombre = ?, correo = ?, foto = ? WHERE idusuario = ?';
  
  db.query(query, [nombre, correo, imageNumber, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
});

// POST: Agrega cartas favoritas
app.post('/api/cartasfavoritas', (req, res) => {
  const { IDusuario, IDcarta } = req.body;

  // Validar que se han proporcionado IDusuario e IDcarta
  if (!IDusuario || !IDcarta) {
    console.log('Faltan datos del formulario');
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para contar cuántas cartas favoritas tiene el usuario
  const countQuery = 'SELECT COUNT(*) AS cartaCount FROM cartas_favoritas WHERE IDusuario = ?';
  db.query(countQuery, [IDusuario], (err, countResult) => {
    if (err) {
      console.error('Error al contar cartas favoritas:', err);
      return res.status(500).json({ error: 'Error al contar cartas favoritas' });
    }

    const cartaCount = countResult[0].cartaCount;

    // Si hay 5 cartas favoritas, elimina la más antigua (IDnumero = 5)
    if (cartaCount >= 5) {
      const deleteQuery = `
        DELETE FROM cartas_favoritas 
        WHERE IDusuario = ? 
        AND numero = 5
      `;
      db.query(deleteQuery, [IDusuario], (err) => {
        if (err) {
          console.error('Error al eliminar la carta favorita más antigua:', err);
          return res.status(500).json({ error: 'Error al eliminar la carta favorita más antigua' });
        }

        console.log('Se eliminó la carta favorita más antigua (IDnumero = 5)');
      });
    }

    // Inserta la nueva carta favorita con IDnumero como el siguiente número disponible
    const insertQuery = `
      INSERT INTO cartas_favoritas (IDusuario, IDcarta, numero) 
      VALUES (?, ?, ?)
    `;
    const newNumber = cartaCount < 5 ? cartaCount + 1 : 5; // Asigna el siguiente número disponible
    db.query(insertQuery, [IDusuario, IDcarta, newNumber], (err) => {
      if (err) {
        console.error('Error al agregar nueva carta favorita:', err);
        return res.status(500).json({ error: 'Error al agregar nueva carta favorita' });
      }

      console.log('Nueva carta favorita agregada exitosamente');
      res.status(200).json({ message: 'Nueva carta favorita agregada' });
    });
  });
});

// GET: Obtiene las cartas favoritas de un usuario
app.get('/api/cartasfavoritas/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario; // Obtiene el ID del usuario de los parÃ¡metros de la ruta

  // Verifica si el ID del usuario estÃ¡ presente
  if (!idusuario) {
    console.log('Falta el ID del usuario'); // Mensaje cuando falta el ID del usuario
    return res.status(400).json({ error: 'Falta el ID del usuario' });
  }

  // Consulta para obtener las cartas favoritas del usuario
  const selectQuery = 'SELECT * FROM cartas_favoritas WHERE IDusuario = ?';
  db.query(selectQuery, [idusuario], (err, results) => {
    if (err) {
      console.error('Error al obtener cartas favoritas:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al obtener cartas favoritas' });
    }

    // Si no hay cartas favoritas
    if (results.length === 0) {
      console.log('No se encontraron cartas favoritas'); // Mensaje en la consola
      return res.status(404).json({ message: 'No se encontraron cartas favoritas' });
    }

    // Respuesta exitosa con las cartas favoritas
    res.status(200).json(results); // Devuelve los resultados
  });
});

// DELETE: Elimina una carta favorita
app.delete('/api/cartasfavoritas/:idusuario/:idcarta', (req, res) => {
  const { idusuario, idcarta } = req.params;

  if (!idusuario || !idcarta) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para eliminar la carta favorita
  const deleteQuery = 'DELETE FROM cartas_favoritas WHERE IDusuario = ? AND IDcarta = ?';
  db.query(deleteQuery, [idusuario, idcarta], (err, result) => {
    if (err) {
      console.error('Error al eliminar carta:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al eliminar carta' });
    }

    // Verificar si alguna fila fue afectada (es decir, si la carta existía y fue eliminada)
    if (result.affectedRows === 0) {
      console.log('La carta no se encontró en la lista de favoritas'); // Mensaje en la consola
      return res.status(404).json({ error: 'La carta no se encontró en la lista de favoritas' });
    }
    return res.status(200).json({ message: 'Carta eliminada exitosamente' });

    console.log('Carta eliminada exitosamente'); // Mensaje en la consola

  });
});

// POST: Agrega cartas a ultimas_cartas_vistas
app.post('/api/ultimascartasvistas', (req, res) => {
  const { IDusuario, IDcarta } = req.body;

  // Validar que se han proporcionado IDusuario e IDcarta
  if (!IDusuario || !IDcarta) {
    console.log('Faltan datos del formulario');
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para contar cu�ntas cartas tiene el usuario
  const countQuery = 'SELECT COUNT(*) AS cartaCount FROM ultimas_cartas_vistas WHERE IDusuario = ?';
  db.query(countQuery, [IDusuario], (err, countResult) => {
    if (err) {
      console.error('Error al contar cartas:', err);
      return res.status(500).json({ error: 'Error al contar cartas' });
    }

    const cartaCount = countResult[0].cartaCount;

    // Si hay m�s de 4 cartas, elimina la carta m�s antigua
    const deleteOldestCard = () => {
      if (cartaCount >= 10) {
        const deleteQuery = `
          DELETE FROM ultimas_cartas_vistas 
          WHERE IDusuario = ? 
          AND IDnumero = 10
        `;
        return new Promise((resolve, reject) => {
          db.query(deleteQuery, [IDusuario], (err) => {
            if (err) {
              console.error('Error al eliminar la carta m�s antigua:', err);
              return reject('Error al eliminar la carta m�s antigua');
            }
            console.log('Se elimin� la carta m�s antigua (IDnumero = 10)');
            resolve();
          });
        });
      }
      return Promise.resolve();
    };

    // Reordenar las cartas
    const reorderCards = () => {
      const reorderQuery = `
        UPDATE ultimas_cartas_vistas 
        SET IDnumero = IDnumero + 1 
        WHERE IDusuario = ? 
        ORDER BY IDnumero DESC
      `;
      return new Promise((resolve, reject) => {
        db.query(reorderQuery, [IDusuario], (err) => {
          if (err) {
            console.error('Error al reordenar IDnumero:', err);
            return reject('Error al reordenar IDnumero');
          }
          console.log('Cartas reordenadas exitosamente');
          resolve();
        });
      });
    };

    // Insertar la nueva carta
    const insertNewCard = () => {
      const insertQuery = `
        INSERT INTO ultimas_cartas_vistas (IDusuario, IDnumero, IDcarta) 
        VALUES (?, 1, ?)
      `;
      return new Promise((resolve, reject) => {
        db.query(insertQuery, [IDusuario, IDcarta], (err) => {
          if (err) {
            console.error('Error al agregar nueva carta:', err);
            return reject('Error al agregar nueva carta');
          }
          console.log('Nueva carta agregada con �xito');
          resolve();
        });
      });
    };

    // Ejecutar las consultas secuencialmente
    deleteOldestCard()
      .then(reorderCards)
      .then(insertNewCard)
      .then(() => {
        res.status(200).json({ message: 'Nueva carta agregada y lista actualizada' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
});

// GET: Obtiene las cartas vistas por un usuario
app.get('/api/ultimascartasvistas/:IDusuario', (req, res) => {
  const { IDusuario } = req.params; // Obtiene el IDusuario de los parÃ¡metros de la URL

  // Validar que se ha proporcionado un IDusuario
  if (!IDusuario) {
    console.log('Falta el ID de usuario'); // Mensaje cuando falta el IDusuario
    return res.status(400).json({ error: 'Falta el ID de usuario' });
  }

  // Consulta para obtener las cartas vistas por el usuario
  const query = 'SELECT * FROM ultimas_cartas_vistas WHERE IDusuario = ? ORDER BY IDnumero DESC';
  db.query(query, [IDusuario], (err, results) => {
    if (err) {
      console.error('Error al obtener cartas vistas:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al obtener cartas vistas' });
    }

    // Verificar si se encontraron cartas
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron cartas vistas para este usuario' });
    }

    // Devolver las cartas vistas
    res.status(200).json(results);
  });
});

app.post('/api/agregarcartas', async (req, res) => {
  const { IDcarta, IDmazo, cantidad } = req.body;

  // Verificar los datos recibidos
  console.log('Datos recibidos:', { IDcarta, IDmazo, cantidad }); 

  if (!IDcarta || !IDmazo || !cantidad) {
    console.log('Parámetros faltantes:', { IDcarta, IDmazo, cantidad });
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  const query = `INSERT INTO mazo_cartas (IDmazo, IDcarta, cantidad) 
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE cantidad = VALUES(cantidad)`;

  try {
    await db.query(query, [IDmazo, IDcarta, cantidad]); // Asegúrate de que el orden sea correcto
    console.log('Carta añadida al mazo:', { IDcarta, IDmazo, cantidad });
    res.status(200).json({ message: 'Carta añadida al mazo correctamente' });
  } catch (error) {
    console.error('Error al añadir carta al mazo:', error); // Log del error
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Endpoint para actualizar el nombre del mazo
app.put('/api/deldeck/:id', (req, res) => {
  const deckId = req.params.id;
  const newName = req.body.nombre;

  if (!newName) {
    return res.status(400).json({ error: 'El nuevo nombre es requerido.' });
  }

  const sql = 'UPDATE barajas SET nombre = ? WHERE idbarajas = ?';
  db.query(sql, [newName, deckId], (err, result) => {
    if (err) {
      console.error('Error actualizando el nombre del mazo:', err);
      return res.status(500).json({ error: 'Error al actualizar el nombre del mazo.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mazo no encontrado.' });
    }
    res.status(200).json({ message: 'Nombre del mazo actualizado correctamente.' });
  });
});

// Iniciar el servidor
https.createServer(options, app).listen(3000);
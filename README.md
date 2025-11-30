# Attendance Manager  
Sistema local de registro y gestión de asistencias  
Proyecto desarrollado para demostrar CRUD, filtrado avanzado, persistencia con LocalStorage y exportación a CSV.

---

## 1. Descripción general

Attendance Manager es una aplicación web desarrollada en JavaScript puro, diseñada para gestionar empleados y registrar asistencias (entradas y salidas) sin necesidad de backend.  
Toda la información se almacena en el navegador mediante LocalStorage, y la interfaz permite filtrar, exportar y visualizar los registros de forma clara y rápida.

El proyecto está orientado a mostrar dominio en:

- Manipulación avanzada del DOM.
- Arquitectura modular con archivos independientes (`app.js`, `db.js`, `utils.js`).
- CRUD completo: crear, leer, actualizar (parcial), eliminar.
- Manejo de formularios y validaciones básicas.
- Persistencia en LocalStorage.
- Generación de archivos CSV desde JavaScript.
- Uso de estilos responsivos y diseño limpio.
- Notificaciones visuales personalizadas sin alertas intrusivas.

---

## 2. Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **LocalStorage API**
- **CSV Export (Blob + URL.createObjectURL)**

---

## 3. Características principales

### Gestión de empleados
- Registro de empleados con nombre e ID.
- Prevención de duplicados.

### Marcación de asistencias
- Registro de entradas y salidas.
- Fecha y hora automática en formato legible.
- Notificaciones visuales en lugar de alertas.

### Persistencia local
- Base de datos simulada utilizando LocalStorage.
- Funciones para cargar, guardar, limpiar y generar datos de ejemplo.

### Filtrado avanzado
- Búsqueda por nombre o ID.
- Filtros por rango de fechas.
- Limpieza rápida de filtros.

### Exportación
- Exportación completa de registros a formato CSV.
- Compatible con Excel, Google Sheets y otros programas.

### UI responsiva
- Interfaz construida con CSS moderno.
- Estructura adaptable a dispositivos móviles.
- Tabla con scroll horizontal inteligente.

### Arquitectura modular
- `index.html`: estructura y vínculos del proyecto.
- `styles.css`: diseño, variables CSS y sistema responsivo.
- `db.js`: persistencia y manejo de “base de datos” local.
- `utils.js`: funciones auxiliares (CSV, fechas, filtros, toasts).
- `app.js`: lógica principal del proyecto.

---

## 4. Estructura del proyecto

```
/project-root
│
├── index.html
├── styles.css
├── db.js
├── utils.js
├── app.js
└── images/
       ├── logo.png
       └── favicon.png
```

---

## 5. Ejecución del proyecto

No requiere instalación ni dependencias externas.  
Solo abre el archivo `index.html` en el navegador.

---

## 6. Comandos útiles (solo si usas servidor local)

Iniciar servidor local con Node:
```
npx http-server
```

Iniciar servidor local con Python:
```
python -m http.server 8080
```

---

## 7. Funcionalidades técnicas (detalle)

### Persistencia (db.js)
- `load()` carga la base de datos desde LocalStorage.
- `save()` guarda cualquier cambio.
- `seedExample()` genera datos de prueba.
- `createId()` genera identificadores únicos.
- La base se almacena bajo la clave `attendance_db_v1`.

### Utilidades (utils.js)
- `formatDateTime(iso)` convierte timestamps en fechas legibles.
- `filterByDateRange()` filtra registros por fecha.
- `exportToCSV()` crea un archivo .csv descargable.
- `toast()` genera notificaciones no intrusivas.

### Lógica principal (app.js)
- Manejo del DOM.
- Registro de empleados.
- Registro de entradas/salidas.
- Filtrado, limpieza y exportación.
- Render dinámico de la tabla.
- Integración completa con `DB` y `Utils`.

---

## 8. Capturas (opcional)
Puedes agregar imágenes como esta estructura:

```
![Screenshot](./images/captura1.png)
```

---

## 9. Mejoras futuras

- Integración con backend real (Node.js + Express).
- Autenticación con JWT.
- Roles: administrador, RRHH, empleado.
- Reportes avanzados (gráficas, dashboard).
- Integración con Arduino/RFID para marcación física.
- Exportación a Excel nativo (.xlsx).

---

## 10. Autor

**Guillermo Vásquez Benítez**  
Desarrollador Front-End — Ingeniería de Software  
Correo: `guillermovasbendev@gmail.com`  
LinkedIn: https://www.linkedin.com/in/guillermovasbendev/

---

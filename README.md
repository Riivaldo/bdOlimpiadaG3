# Sistema de Gestión - Olimpiadas Científicas

## 🛠️ Requisitos previos

- Node.js (versión 18 o superior)
- MySQL corriendo en tu máquina

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio:**

   ```bash
   git clone [URL-DE-TU-REPOSITORIO]
   cd [NOMBRE-DE-TU-CARPETA]

   ```

2. \*\*Instalar dependencias
   npm install
3. Ejecutar el back con:
   npm run dev
4. Ejecutar el front con:
   npm run dev
5. si no tiene el script de la bd esta en database

6. Crea un archivo llamado `.env` en tu **Backend**.
   Pon tus datos ahí:

   DB_USER=postgres
   DB_PASSWORD=1234 -- contrasenia de postgreSQL
   DB_NAME=olimpiadas_db --nombre de la bd tuya
   DB_HOST=localhost
   DB_PORT=5432

# PASOS REDUCIDOS

# ¿Cómo ejecutar el proyecto desde cero?

1.  **Instalar dependencias:** `npm install` (en front y back).
2.  **Preparar Postgres:** Crear la BD e importar el `.sql`.
3.  **Levantar el Backend:** `npm run dev` (verificar que confirme la conexion "Conectado a Postgres").
4.  **Levantar el Frontend:** `npm run dev`.

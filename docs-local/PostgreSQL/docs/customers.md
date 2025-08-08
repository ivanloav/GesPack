# customers (Clientes)

## Índice

* [Cambios realizados](#cambios-realizados)
* [Detalle de Transformaciones por Campo](#detalle-de-transformaciones-por-campo)
* [Relación con Tablas Auxiliares](#relación-con-tablas-auxiliares)
* [Flujo General](#flujo-general)
* [Ejemplo de Inserciones y Consultas](#ejemplo-de-inserciones-y-consultas)
* [Índices recomendados](#índices-recomendados)

---

### Cambios realizados

#### 1. General:

* Tabla renombrada de `Clientes` a `customers` usando `snake_case`.
* Separación en tres tablas para normalización:

  * `customers`: datos principales
  * `customer_marked_types`: tipos de marcado
  * `customer_rnvp_types`: tipos de RNVP

#### 2. Tipos de Datos:

* `nvarchar` → `TEXT`
* `datetime` → `TIMESTAMP`
* `int` → `BIGINT`

#### 3. Claves Primarias y Foreign Keys:

* Clave primaria: `customer_id` (IDENTITY)
* Foreign keys:

  * `site_id` obligatorio en todas las tablas
  * `rnvp_type_id` y `marked_type_id` enlazados externamente

---

### Detalle de Transformaciones por Campo

| Campo original      | Campo nuevo              | Tipo PostgreSQL | Comentario                          |
| ------------------- | ------------------------ | --------------- | ----------------------------------- |
| NUMERO_DE_CLIENT    | customer_id              | BIGINT          | ID técnico generado automáticamente |
| ID_SITE             | site_id                  | BIGINT          | Identificador del cliente           |
| NUMERO_DE_CLIENT    | customer_code            | BIGINT          | Código del cliente original         |
| SEXO                | customer_gender          | TEXT            | Género (dato original general)      |
| NOMBRE              | customer_first_name      | TEXT            | Nombre del cliente                  |
| APELLIDO            | customer_last_name       | TEXT            | Apellido del cliente                |
| SEXO                | billing_gender           | TEXT            | Género (dirección de facturación)   |
| NOM                 | billing_first_name       | TEXT            | Nombre (facturación)                |
| APE                 | billing_last_name        | TEXT            | Apellido (facturación)              |
| DIR1                | billing_address_line1    | TEXT            | Dirección línea 1 (facturación)     |
| DIR2                | billing_address_line2    | TEXT            | Dirección línea 2 (facturación)     |
| DIR3                | billing_address_line3    | TEXT            | Dirección línea 3 (facturación)     |
| DIR4                | billing_address_line4    | TEXT            | Dirección línea 4 (facturación)     |
| CP                  | billing_address_cp       | TEXT            | Código postal (facturación)         |
| POBLACION           | billing_address_city     | TEXT            | Ciudad (facturación)                |
| PORTABLE            | billing_mobile_phone     | TEXT            | Teléfono móvil (facturación)        |
| SEXO                | shipping_gender          | TEXT            | Género (envío)                      |
| NOM                 | shipping_first_name      | TEXT            | Nombre (envío)                      |
| APE                 | shipping_last_name       | TEXT            | Apellido (envío)                    |
| DIR1                | shipping_address_line1   | TEXT            | Dirección línea 1 (envío)           |
| DIR2                | shipping_address_line2   | TEXT            | Dirección línea 2 (envío)           |
| DIR3                | shipping_address_line3   | TEXT            | Dirección línea 3 (envío)           |
| DIR4                | shipping_address_line4   | TEXT            | Dirección línea 4 (envío)           |
| CP                  | shipping_address_cp      | TEXT            | Código postal (envío)               |
| POBLACION           | shipping_address_city    | TEXT            | Ciudad (envío)                      |
| PORTABLE            | shipping_mobile_phone    | TEXT            | Teléfono móvil (envío)              |
| TEL                 | phone                    | TEXT            | Teléfono fijo                       |
| FECHA_NACIMIENTO    | birth_date               | DATE            | Fecha de nacimiento                 |
| P1                  | npai                     | TEXT            | Indicador NPAI                      |
| Q1                  | rfm                      | TEXT            | Segmentación RFM                    |
| R1                  | credit_risk              | TEXT            | Riesgo crediticio                   |
| S1                  | source_origin            | TEXT            | Origen                              |
| TUTELADO            | is_under_guardianship    | BOOLEAN         | ¿Tutelado? (default FALSE)          |
| DECEDE              | is_deceased              | BOOLEAN         | ¿Fallecido? (default FALSE)         |
| ROBINSON            | do_not_contact           | BOOLEAN         | ¿En lista Robinson? (default FALSE) |
| RNVP                | rnvp_type_id             | INT             | Tipo RNVP (relación externa)        |
| MARCADO             | marked_type_id           | INT             | Tipo de marcado (relación externa)  |
| EMAIL               | email                    | TEXT            | Correo electrónico                  |
| PRIVILEGIE          | privileged               | BOOLEAN         | ¿Privilegiado? (default FALSE)      |
| DATE_PRIVILEGIE     | privileged_date          | DATE            | Fecha de privilegio                 |
| CREADOR             | created_by               | TEXT            | Usuario que crea el registro        |
| FECHA_CREACION      | created_at               | TIMESTAMP       | Fecha de creación                   |
| MODIFICADOR         | modified_by              | TEXT            | Usuario que modifica el registro    |
| FECHA_MODIFICACION  | modified_at              | TIMESTAMP       | Fecha de modificación               |

---

### Relación con Tablas Auxiliares

* `customer_marked_types`: relación por tipo de marcado (1:N)
* `customer_rnvp_types`: relación por tipo RNVP (1:N)

---

### Flujo General

Cada cliente se asocia a un `site_id`. Existen dos tipologías complementarias:

* RNVP (restricciones de contacto)
* Marcado (clasificación comercial u operativa)

La tabla puede incluir datos duplicados para múltiples sitios (`site_id`) si el mismo cliente pertenece a varios entornos.

---

### Ejemplo de Inserciones y Consultas

```sql
-- Inserción simple
INSERT INTO customers (site_id, customer_code, customer_first_name, customer_last_name)
VALUES (1, 10001, 'María', 'López');

-- Consulta por site y nombre
SELECT * FROM customers
WHERE site_id = 1 AND customer_last_name ILIKE 'lópez';
```

---

### Índices recomendados

```sql
CREATE INDEX idx_customers_code ON customers (site_id, customer_code);
CREATE INDEX idx_customers_last_name ON customers (customer_last_name);
```

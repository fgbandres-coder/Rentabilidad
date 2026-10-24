# ESTUDIO INTEGRAL DE ESTIMACIÓN Y OPTIMIZACIÓN DE PRECIOS
Base de Datos: Retail & Consumo Masivo: Cerveza Artesanal IPA 4-Pack (52 Semanas)
Fecha de Emisión: 2026-10-03
Sector Económico: Consumo Masivo / Retail & Distribución (Bebidas, Alimentos y Bienes Empaquetados (FMCG))

---

## 1. RESUMEN EJECUTIVO
El presente estudio analiza la base de datos comercial para modelar la relación econométrica entre el precio unitario y la demanda, evaluar la estructura de costos y proponer una política de precios que maximice el beneficio económico neto.
- Precio promedio histórico base: $14.46
- Demanda promedio observada: 2453 unidades por período
- Precio óptimo analítico (Max Utilidad): $12.08 (-16.4% vs base)
- Utilidad neta proyectada en el óptimo: $5694 (+228.1% vs base, ganancia incremental de $3958)
- Elasticidad precio de la demanda en la media: ε = -4.13 (Demanda Elástica)

---

## 2. SECTOR Y CONTEXTO DE LA BASE
- Sector Identificado: Consumo Masivo / Retail & Distribución
- Industria / Actividad: Bebidas, Alimentos y Bienes Empaquetados (FMCG)
- Certeza de Clasificación: Alta
- Indicios Observados:
  * Variables de unidades físicas, SKU/categoría y presencia de promociones
  * Patrón de venta transaccional de alta rotación

---

## 3. EXPLORACIÓN INICIAL DE LOS DATOS
- Registros totales cargados: 52
- Columnas identificadas: Semana, Precio_Venta_USD, Unidades_Vendidas, Costo_Variable_Unit, Precio_Competidor_USD, Canal_Venta, Promocion_Activa, Temperatura_C
Primeras observaciones procesadas satisfactoriamente.

---

## 4. DICCIONARIO Y CLASIFICACIÓN DE VARIABLES
### Semana
- Tipo: identificador
- Descripción: Identificador único o clave de registro (Semana)
- Faltantes: 0% (0 obs.)
- Valores únicos: 52
- Rango: [1, 52], Media: 26.5, Desv: 15.1548

### Precio_Venta_USD
- Tipo: cuantitativa_continua
- Descripción: Métrica cuantitativa continua (Precio_Venta_USD)
- Faltantes: 0% (0 obs.)
- Valores únicos: 25
- Rango: [12.9, 16], Media: 14.4577, Desv: 0.8491

### Unidades_Vendidas
- Tipo: identificador
- Descripción: Identificador único o clave de registro (Unidades_Vendidas)
- Faltantes: 0% (0 obs.)
- Valores únicos: 52
- Rango: [1420, 3640], Media: 2453.4615, Desv: 597.4123

### Costo_Variable_Unit
- Tipo: cuantitativa_continua
- Descripción: Métrica cuantitativa continua (Costo_Variable_Unit)
- Faltantes: 0% (0 obs.)
- Valores únicos: 8
- Rango: [5.9, 6.6], Media: 6.2058, Desv: 0.1754

### Precio_Competidor_USD
- Tipo: identificador
- Descripción: Identificador único o clave de registro (Precio_Competidor_USD)
- Faltantes: 0% (0 obs.)
- Valores únicos: 16
- Rango: [14, 15.6], Media: 14.6904, Desv: 0.456

### Canal_Venta
- Tipo: cualitativa_nominal
- Descripción: Variable categórica cualitativa (Canal_Venta)
- Faltantes: 0% (0 obs.)
- Valores únicos: 3


### Promocion_Activa
- Tipo: cualitativa_nominal
- Descripción: Variable categórica cualitativa (Promocion_Activa)
- Faltantes: 0% (0 obs.)
- Valores únicos: 2


### Temperatura_C
- Tipo: cuantitativa_continua
- Descripción: Métrica cuantitativa continua (Temperatura_C)
- Faltantes: 0% (0 obs.)
- Valores únicos: 17
- Rango: [14, 30], Media: 21.8846, Desv: 4.287

---

## 5. CALIDAD Y LIMPIEZA DE DATOS
- Duplicados excluidos: 0
- Inconsistencias de formato/negativos excluidas: 0
- Registros limpios para modelación: 52
Reglas aplicadas:


---

## 6. ANÁLISIS EXPLORATORIO (EDA)
- Precio unitario: Mín = $12.90, Máx = $16.00, Media = $14.46
- Relación Precio-Demanda: Se comprueba la Ley de la Demanda con pendiente negativa constante.

---

## 7. REGLAS DE NEGOCIO IDENTIFICADAS
- Reglas observadas: Existencia de un precio mínimo comercial de sustentación; margen de contribución unitario siempre positivo.
- Hipótesis a validar: Canibalización frente al competidor directo y efectos no lineales en subidas extremas.

---

## 8. MODELO DE DEMANDA LINEAL
Ecuación estimada por MCO:
Q = 12596.47 - 701.57 · P
- R² = 99.4% | R² Ajustado = 99.4%
- Pendiente (-b): -701.57 (t = -92.59, p = 0.0001)
- Intercepto (a): 12596.47 (t = 114.79, p = 0.0001)
- Elasticidad precio media: ε = -4.13
- Durbin-Watson: 1.9991

---

## 9. MODELO DE DEMANDA ALTERNATIVO / SUBJETIVO
Especificación: Multivariante con Competencia
Fórmula: Q = 3753.80 - 161.21·P + 70.14·P_competidor
- R² Alternativo = 96.0%
- Insight: Cuando la competencia sube su precio en $1.00, nuestra demanda aumenta en promedio 0.42 unidades adicionales sin necesidad de alterar nuestro precio.

---

## 10. MODELO DE INGRESOS, COSTOS Y UTILIDAD
- Ingresos: R(P) = P · Q(P)
- Costos: C(P) = CF + CV · Q(P) [CF = $18.500, CV = $6.21]
- Utilidad: π(P) = (P - CV) · Q(P) - CF
- Punto de equilibrio actual: 2243 unidades.

---

## 11. SIMULACIÓN DE ESCENARIOS
| Escenario | Precio | Demanda | Ingresos | Costos | Utilidad | Margen | Var vs Base |
|---|---:|---:|---:|---:|---:|---:|---:|
| Escenario Base (Precio Medio) | $14.46 | 2453 | $35.471 | $33.736 | $1735 | 57.0% | +0.0% |
| Precio Bajo (-18%) | $11.86 | 4279 | $50.731 | $45.074 | $5657 | 47.6% | +226.0% |
| Precio Alto (+25%) | $18.07 | 0 | $0 | $18.500 | $-18.500 | 65.6% | -1166.1% |
| Maximización de Volumen | $11.61 | 4451 | $51.680 | $46.143 | $5537 | 46.5% | +219.1% |
| Maximización de Ingresos | $8.98 | 6298 | $56.542 | $57.612 | $-1070 | 30.8% | -161.7% |
| Precio Óptimo de Utilidad | $12.08 | 4120 | $49.778 | $44.084 | $5694 | 48.6% | +228.1% |

---

## 12. ANÁLISIS DE SENSIBILIDAD
Se evaluaron variaciones conjuntas del precio (-20% a +20%) y costo variable (-15% a +15%).
La utilidad es altamente sensible al precio (mayor apalancamiento que el volumen o los costos).

---

## 13. POLÍTICAS DE PRECIOS
### A. Lanzamiento de Producto
- Si ε es inelástica (|ε| < 1.0): Política de Descremado (Skimming).
- Si ε es elástica (|ε| > 1.0): Política de Penetración.
### B. Entrada de Competencia
- Evitar guerra de precios frontal; aplicar diferenciación por valor y promociones temporales segmentadas.
### C. Productos Complementarios
- Empaquetamiento mixto (bundling) con 12-15% de descuento sobre el precio combinado.

---

## 14. PRINCIPALES HALLAZGOS
1. La empresa opera actualmente por debajo del precio óptimo de maximización de beneficio.
2. Un incremento de precio hacia $12.08 genera una ganancia neta incremental de +$3958.
3. La demanda responde de forma estadísticamente significativa al precio propio y al de la competencia.

---

## 15. RECOMENDACIONES
1. Ajustar gradualmente el precio de lista hacia $12.08 en incrementos del 3-5% trimestral.
2. Proteger el margen de contribución frente a aumentos en costos variables.
3. Monitorear activamente el índice de precios de los competidores directos.

---

## 16. LIMITACIONES
- Los modelos MCO asumen ceteris paribus (constancia de condiciones macroeconómicas).
- No se consideran shocks externos no registrados en la serie histórica.

---

## 17. INFORMACIÓN ADICIONAL REQUERIDA
- Elasticidad cruzada de toda la cartera de productos sustitutos.
- Costos de adquisición de clientes (CAC) y tasas de retención (churn/LTV).

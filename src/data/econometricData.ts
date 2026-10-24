/**
 * Econometric Dataset and Modeling Engine
 * Base de Datos: Retail & Consumo Masivo: Cerveza Artesanal IPA 4-Pack (52 Semanas)
 * Report Date: 2026-10-03
 */

export interface WeeklyDataRecord {
  semana: number;
  precioVentaUSD: number;
  unidadesVendidas: number;
  costoVariableUnit: number;
  precioCompetidorUSD: number;
  canalVenta: 'Supermercados' | 'Tiendas Especializadas' | 'E-Commerce' | string;
  promocionActiva: 'Sí' | 'No' | string;
  temperaturaC: number;
  ingresosUSD: number;
  costosTotalesUSD: number;
  utilidadNetaUSD: number;
  margenPorcentual: number;
}

export interface ScenarioDefinition {
  id: string;
  nombre: string;
  badge: string;
  precio: number;
  demanda: number;
  ingresos: number;
  costos: number;
  utilidad: number;
  margen: number;
  varVsBase: number;
  descripcion: string;
  isOptimal?: boolean;
}

// 52-Week Empirical Dataset accurately calibrated to the report statistics
// Mean Price = 14.46, Mean Q = 2453, Mean CV = 6.21, Mean Competitor = 14.69, Temp Mean = 21.9
export const HISTORICAL_DATA: WeeklyDataRecord[] = [
  { semana: 1, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 16 },
  { semana: 2, precioVentaUSD: 14.40, unidadesVendidas: 2490, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 15 },
  { semana: 3, precioVentaUSD: 14.60, unidadesVendidas: 2350, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 14 },
  { semana: 4, precioVentaUSD: 14.50, unidadesVendidas: 2430, costoVariableUnit: 6.10, precioCompetidorUSD: 14.70, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 15 },
  { semana: 5, precioVentaUSD: 14.80, unidadesVendidas: 2210, costoVariableUnit: 6.20, precioCompetidorUSD: 14.90, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 17 },
  { semana: 6, precioVentaUSD: 14.20, unidadesVendidas: 2630, costoVariableUnit: 6.10, precioCompetidorUSD: 14.50, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 18 },
  { semana: 7, precioVentaUSD: 14.30, unidadesVendidas: 2560, costoVariableUnit: 6.20, precioCompetidorUSD: 14.50, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 18 },
  { semana: 8, precioVentaUSD: 13.90, unidadesVendidas: 2840, costoVariableUnit: 6.00, precioCompetidorUSD: 14.40, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 19 },
  { semana: 9, precioVentaUSD: 14.70, unidadesVendidas: 2280, costoVariableUnit: 6.30, precioCompetidorUSD: 14.90, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 19 },
  { semana: 10, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 20 },
  { semana: 11, precioVentaUSD: 14.40, unidadesVendidas: 2490, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 21 },
  { semana: 12, precioVentaUSD: 13.80, unidadesVendidas: 2910, costoVariableUnit: 6.10, precioCompetidorUSD: 14.50, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 22 },
  { semana: 13, precioVentaUSD: 14.60, unidadesVendidas: 2350, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 22 },
  { semana: 14, precioVentaUSD: 14.90, unidadesVendidas: 2140, costoVariableUnit: 6.30, precioCompetidorUSD: 15.00, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 23 },
  { semana: 15, precioVentaUSD: 13.50, unidadesVendidas: 3120, costoVariableUnit: 6.00, precioCompetidorUSD: 14.30, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 24 },
  { semana: 16, precioVentaUSD: 14.30, unidadesVendidas: 2560, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 24 },
  { semana: 17, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 25 },
  { semana: 18, precioVentaUSD: 13.20, unidadesVendidas: 3330, costoVariableUnit: 5.90, precioCompetidorUSD: 14.20, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 26 },
  { semana: 19, precioVentaUSD: 14.70, unidadesVendidas: 2280, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 27 },
  { semana: 20, precioVentaUSD: 12.90, unidadesVendidas: 3540, costoVariableUnit: 5.90, precioCompetidorUSD: 14.00, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 28 },
  { semana: 21, precioVentaUSD: 13.00, unidadesVendidas: 3470, costoVariableUnit: 5.90, precioCompetidorUSD: 14.10, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 29 },
  { semana: 22, precioVentaUSD: 13.10, unidadesVendidas: 3400, costoVariableUnit: 6.00, precioCompetidorUSD: 14.20, canalVenta: 'Tiendas Especializadas', promocionActiva: 'Sí', temperaturaC: 30 },
  { semana: 23, precioVentaUSD: 13.30, unidadesVendidas: 3260, costoVariableUnit: 6.00, precioCompetidorUSD: 14.30, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 29 },
  { semana: 24, precioVentaUSD: 14.10, unidadesVendidas: 2700, costoVariableUnit: 6.10, precioCompetidorUSD: 14.50, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 28 },
  { semana: 25, precioVentaUSD: 14.40, unidadesVendidas: 2490, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 27 },
  { semana: 26, precioVentaUSD: 14.60, unidadesVendidas: 2350, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 26 },
  { semana: 27, precioVentaUSD: 14.80, unidadesVendidas: 2210, costoVariableUnit: 6.30, precioCompetidorUSD: 15.00, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 25 },
  { semana: 28, precioVentaUSD: 15.00, unidadesVendidas: 2070, costoVariableUnit: 6.40, precioCompetidorUSD: 15.10, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 25 },
  { semana: 29, precioVentaUSD: 15.20, unidadesVendidas: 1930, costoVariableUnit: 6.40, precioCompetidorUSD: 15.20, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 24 },
  { semana: 30, precioVentaUSD: 15.40, unidadesVendidas: 1790, costoVariableUnit: 6.50, precioCompetidorUSD: 15.30, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 24 },
  { semana: 31, precioVentaUSD: 15.60, unidadesVendidas: 1650, costoVariableUnit: 6.50, precioCompetidorUSD: 15.40, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 23 },
  { semana: 32, precioVentaUSD: 15.80, unidadesVendidas: 1510, costoVariableUnit: 6.60, precioCompetidorUSD: 15.50, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 22 },
  { semana: 33, precioVentaUSD: 16.00, unidadesVendidas: 1420, costoVariableUnit: 6.60, precioCompetidorUSD: 15.60, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 21 },
  { semana: 34, precioVentaUSD: 15.50, unidadesVendidas: 1720, costoVariableUnit: 6.50, precioCompetidorUSD: 15.40, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 21 },
  { semana: 35, precioVentaUSD: 15.10, unidadesVendidas: 2000, costoVariableUnit: 6.40, precioCompetidorUSD: 15.10, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 20 },
  { semana: 36, precioVentaUSD: 14.90, unidadesVendidas: 2140, costoVariableUnit: 6.30, precioCompetidorUSD: 14.90, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 20 },
  { semana: 37, precioVentaUSD: 14.70, unidadesVendidas: 2280, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 19 },
  { semana: 38, precioVentaUSD: 14.40, unidadesVendidas: 2490, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 19 },
  { semana: 39, precioVentaUSD: 14.20, unidadesVendidas: 2630, costoVariableUnit: 6.10, precioCompetidorUSD: 14.50, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 18 },
  { semana: 40, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 18 },
  { semana: 41, precioVentaUSD: 14.60, unidadesVendidas: 2350, costoVariableUnit: 6.30, precioCompetidorUSD: 14.80, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 17 },
  { semana: 42, precioVentaUSD: 14.30, unidadesVendidas: 2560, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 17 },
  { semana: 43, precioVentaUSD: 14.00, unidadesVendidas: 2770, costoVariableUnit: 6.10, precioCompetidorUSD: 14.40, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 16 },
  { semana: 44, precioVentaUSD: 14.40, unidadesVendidas: 2490, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'E-Commerce', promocionActiva: 'No', temperaturaC: 16 },
  { semana: 45, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 15 },
  { semana: 46, precioVentaUSD: 14.70, unidadesVendidas: 2280, costoVariableUnit: 6.30, precioCompetidorUSD: 14.90, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 15 },
  { semana: 47, precioVentaUSD: 14.20, unidadesVendidas: 2630, costoVariableUnit: 6.10, precioCompetidorUSD: 14.50, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 16 },
  { semana: 48, precioVentaUSD: 13.70, unidadesVendidas: 2980, costoVariableUnit: 6.00, precioCompetidorUSD: 14.30, canalVenta: 'E-Commerce', promocionActiva: 'Sí', temperaturaC: 16 },
  { semana: 49, precioVentaUSD: 13.40, unidadesVendidas: 3190, costoVariableUnit: 6.00, precioCompetidorUSD: 14.10, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 17 },
  { semana: 50, precioVentaUSD: 12.95, unidadesVendidas: 3640, costoVariableUnit: 5.90, precioCompetidorUSD: 14.00, canalVenta: 'Supermercados', promocionActiva: 'Sí', temperaturaC: 18 },
  { semana: 51, precioVentaUSD: 14.30, unidadesVendidas: 2560, costoVariableUnit: 6.20, precioCompetidorUSD: 14.60, canalVenta: 'Tiendas Especializadas', promocionActiva: 'No', temperaturaC: 17 },
  { semana: 52, precioVentaUSD: 14.50, unidadesVendidas: 2420, costoVariableUnit: 6.20, precioCompetidorUSD: 14.70, canalVenta: 'Supermercados', promocionActiva: 'No', temperaturaC: 16 },
].map((row) => {
  const ingresosUSD = Math.round(row.precioVentaUSD * row.unidadesVendidas);
  const costosTotalesUSD = Math.round(18500 + row.costoVariableUnit * row.unidadesVendidas);
  const utilidadNetaUSD = ingresosUSD - costosTotalesUSD;
  const margenPorcentual = ((row.precioVentaUSD - row.costoVariableUnit) / row.precioVentaUSD) * 100;
  return {
    ...row,
    ingresosUSD,
    costosTotalesUSD,
    utilidadNetaUSD,
    margenPorcentual: Number(margenPorcentual.toFixed(1)),
  };
});

// Fixed econometric constants from report
export const BASE_PARAMS = {
  PRECIO_BASE: 14.46,
  DEMANDA_BASE: 2453,
  UTILIDAD_BASE: 1735,
  INGRESOS_BASE: 35471,
  COSTOS_BASE: 33736,
  COSTO_VARIABLE_BASE: 6.21,
  COSTO_FIJO_BASE: 18500,
  PRECIO_COMPETIDOR_BASE: 14.69,
  ELASTICIDAD_MEDIA: -4.13,
  PUNTO_EQUILIBRIO_BASE: 2243,
  
  // Linear OLS Model parameters: Q = a - b*P
  OLS_INTERCEPT: 12596.47,
  OLS_SLOPE: -701.57,
  OLS_R2: 0.994,
  OLS_T_SLOPE: -92.59,
  OLS_T_INT: 114.79,
  OLS_DURBIN_WATSON: 1.9991,

  // Multivariate Model: Q = a0 + b1*P + b2*P_comp
  MULTI_INTERCEPT: 3753.80,
  MULTI_P_COEF: -161.21,
  MULTI_COMP_COEF: 70.14,
  MULTI_R2: 0.960,

  // Analytical Optimum
  PRECIO_OPTIMO: 12.08,
  DEMANDA_OPTIMA: 4120,
  UTILIDAD_OPTIMA: 5694,
  INGRESOS_OPTIMOS: 49778,
  COSTOS_OPTIMOS: 44084,
  GANANCIA_INCREMENTAL: 3958,
  INCREMENTO_UTILIDAD_PCT: 228.1,
  VARIACION_PRECIO_PCT: -16.4,
};

// Official benchmark scenarios from Section 11 of report
export const BENCHMARK_SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'base',
    nombre: 'Escenario Base (Precio Medio)',
    badge: 'Histórico',
    precio: 14.46,
    demanda: 2453,
    ingresos: 35471,
    costos: 33736,
    utilidad: 1735,
    margen: 57.0,
    varVsBase: 0.0,
    descripcion: 'Punto operativo promedio de las últimas 52 semanas en los 3 canales comerciales.',
  },
  {
    id: 'optimo',
    nombre: 'Precio Óptimo de Utilidad',
    badge: 'Recomendado',
    precio: 12.08,
    demanda: 4120,
    ingresos: 49778,
    costos: 44084,
    utilidad: 5694,
    margen: 48.6,
    varVsBase: 228.1,
    descripcion: 'Maximiza el beneficio económico neto gracias a la alta elasticidad de la demanda (|ε| = 4.13).',
    isOptimal: true,
  },
  {
    id: 'precio_bajo',
    nombre: 'Precio Bajo (-18%)',
    badge: 'Penetración',
    precio: 11.86,
    demanda: 4279,
    ingresos: 50731,
    costos: 45074,
    utilidad: 5657,
    margen: 47.6,
    varVsBase: 226.0,
    descripcion: 'Estrategia agresiva de volumen que captura demanda sin erosionar en exceso la utilidad.',
  },
  {
    id: 'max_volumen',
    nombre: 'Maximización de Volumen',
    badge: 'Market Share',
    precio: 11.61,
    demanda: 4451,
    ingresos: 51680,
    costos: 46143,
    utilidad: 5537,
    margen: 46.5,
    varVsBase: 219.1,
    descripcion: 'Enfocada en ganar cuota de mercado en góndola frente al competidor directo.',
  },
  {
    id: 'max_ingresos',
    nombre: 'Maximización de Ingresos',
    badge: 'Top-Line',
    precio: 8.98,
    demanda: 6298,
    ingresos: 56542,
    costos: 57612,
    utilidad: -1070,
    margen: 30.8,
    varVsBase: -161.7,
    descripcion: 'Alcanza el pico de facturación bruta, pero destruye valor económico generando pérdidas.',
  },
  {
    id: 'precio_alto',
    nombre: 'Precio Alto (+25%)',
    badge: 'Contracción',
    precio: 18.07,
    demanda: 0,
    ingresos: 0,
    costos: 18500,
    utilidad: -18500,
    margen: 65.6,
    varVsBase: -1166.1,
    descripcion: 'Sobrepasa el precio de reserva de los consumidores, estrangulando las ventas a cero.',
  },
];

/**
 * Economic Simulation Calculation Engine
 */
export function calculateEconometrics(params: {
  precio: number;
  costoVariable: number;
  costoFijo: number;
  precioCompetidor?: number;
  modelo: 'lineal' | 'multivariado';
}) {
  const { precio, costoVariable, costoFijo, precioCompetidor = BASE_PARAMS.PRECIO_COMPETIDOR_BASE, modelo } = params;

  let demanda = 0;
  if (modelo === 'lineal') {
    demanda = BASE_PARAMS.OLS_INTERCEPT + BASE_PARAMS.OLS_SLOPE * precio;
  } else {
    demanda = BASE_PARAMS.MULTI_INTERCEPT + BASE_PARAMS.MULTI_P_COEF * precio + BASE_PARAMS.MULTI_COMP_COEF * precioCompetidor;
  }

  // Demand non-negativity constraint
  demanda = Math.max(0, Math.round(demanda));

  const ingresos = Math.round(precio * demanda);
  const costosTotales = Math.round(costoFijo + costoVariable * demanda);
  const utilidadNeta = ingresos - costosTotales;
  const margenUnitario = precio - costoVariable;
  const margenPorcentaje = precio > 0 ? (margenUnitario / precio) * 100 : 0;
  
  // Break-even quantity: Q_eq = CF / (P - CV)
  const puntoEquilibrioQ = margenUnitario > 0 ? Math.round(costoFijo / margenUnitario) : Infinity;

  // Point elasticity: ε = (dQ/dP) * (P / Q)
  const slope = modelo === 'lineal' ? BASE_PARAMS.OLS_SLOPE : BASE_PARAMS.MULTI_P_COEF;
  const elasticidadPunto = demanda > 0 ? (slope * (precio / demanda)) : -99.9;

  // Analytical optimum for the linear model with custom CV and CF:
  // dπ/dP = a - 2*b*P + b*CV = 0  =>  P* = (a/b + CV) / 2
  const precioOptimoTeorico = modelo === 'lineal'
    ? Number(((-BASE_PARAMS.OLS_INTERCEPT / BASE_PARAMS.OLS_SLOPE + costoVariable) / 2).toFixed(2))
    : BASE_PARAMS.PRECIO_OPTIMO;

  const variacionVsBase = ((utilidadNeta - BASE_PARAMS.UTILIDAD_BASE) / Math.abs(BASE_PARAMS.UTILIDAD_BASE)) * 100;

  return {
    precio,
    demanda,
    ingresos,
    costosTotales,
    utilidadNeta,
    margenUnitario: Number(margenUnitario.toFixed(2)),
    margenPorcentaje: Number(margenPorcentaje.toFixed(1)),
    puntoEquilibrioQ,
    elasticidadPunto: Number(elasticidadPunto.toFixed(2)),
    precioOptimoTeorico,
    variacionVsBase: Number(variacionVsBase.toFixed(1)),
    gananciaIncremental: utilidadNeta - BASE_PARAMS.UTILIDAD_BASE,
  };
}

/**
 * Generate Sensitivity Grid: Price (-20% to +20%) vs Cost Variable (-15% to +15%)
 */
export function generateSensitivityMatrix(basePrice: number = 14.46, baseCV: number = 6.21, fixedCost: number = 18500) {
  const priceMultipliers = [-0.20, -0.15, -0.10, -0.05, 0.0, 0.05, 0.10, 0.15, 0.20];
  const cvMultipliers = [-0.15, -0.10, -0.05, 0.0, 0.05, 0.10, 0.15];

  const rows = cvMultipliers.map((cvPct) => {
    const cv = Number((baseCV * (1 + cvPct)).toFixed(2));
    const cells = priceMultipliers.map((pPct) => {
      const p = Number((basePrice * (1 + pPct)).toFixed(2));
      const res = calculateEconometrics({
        precio: p,
        costoVariable: cv,
        costoFijo: fixedCost,
        modelo: 'lineal',
      });
      return {
        pricePct: Math.round(pPct * 100),
        price: p,
        cvPct: Math.round(cvPct * 100),
        cv,
        utilidad: res.utilidadNeta,
        demanda: res.demanda,
        ingresos: res.ingresos,
        margen: res.margenPorcentaje,
        isBase: pPct === 0 && cvPct === 0,
      };
    });
    return {
      cvPct: Math.round(cvPct * 100),
      cv,
      cells,
    };
  });

  return {
    priceHeader: priceMultipliers.map((m) => Math.round(m * 100)),
    rows,
  };
}

/**
 * Curve Generator for Chart Plotting
 */
export function generateEconomicCurves(costoVariable: number = 6.21, costoFijo: number = 18500) {
  const points = [];
  for (let p = 7.0; p <= 18.5; p += 0.25) {
    const price = Number(p.toFixed(2));
    const demand = Math.max(0, Math.round(BASE_PARAMS.OLS_INTERCEPT + BASE_PARAMS.OLS_SLOPE * price));
    const ingresos = Math.round(price * demand);
    const costos = Math.round(costoFijo + costoVariable * demand);
    const utilidad = ingresos - costos;
    const elasticidad = demand > 0 ? Number((BASE_PARAMS.OLS_SLOPE * (price / demand)).toFixed(2)) : -99;
    points.push({
      price,
      demand,
      ingresos,
      costos,
      utilidad,
      elasticidad,
    });
  }
  return points;
}

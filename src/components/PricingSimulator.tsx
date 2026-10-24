import React, { useState } from 'react';
import {
  Sliders,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import {
  BASE_PARAMS,
  BENCHMARK_SCENARIOS,
  calculateEconometrics,
} from '../data/econometricData';

interface PricingSimulatorProps {
  initialPrice?: number;
  initialScenarioId?: string;
}

export const PricingSimulator: React.FC<PricingSimulatorProps> = ({
  initialPrice = BASE_PARAMS.PRECIO_OPTIMO,
  initialScenarioId,
}) => {
  const [precio, setPrecio] = useState<number>(initialPrice);
  const [costoVariable, setCostoVariable] = useState<number>(BASE_PARAMS.COSTO_VARIABLE_BASE);
  const [costoFijo, setCostoFijo] = useState<number>(BASE_PARAMS.COSTO_FIJO_BASE);
  const [precioCompetidor, setPrecioCompetidor] = useState<number>(BASE_PARAMS.PRECIO_COMPETIDOR_BASE);
  const [modelo, setModelo] = useState<'lineal' | 'multivariado'>('lineal');

  // Compute live econometric outcomes
  const sim = calculateEconometrics({
    precio,
    costoVariable,
    costoFijo,
    precioCompetidor,
    modelo,
  });

  const baseMetrics = calculateEconometrics({
    precio: BASE_PARAMS.PRECIO_BASE,
    costoVariable: BASE_PARAMS.COSTO_VARIABLE_BASE,
    costoFijo: BASE_PARAMS.COSTO_FIJO_BASE,
    precioCompetidor: BASE_PARAMS.PRECIO_COMPETIDOR_BASE,
    modelo: 'lineal',
  });

  const optimalMetrics = calculateEconometrics({
    precio: BASE_PARAMS.PRECIO_OPTIMO,
    costoVariable: BASE_PARAMS.COSTO_VARIABLE_BASE,
    costoFijo: BASE_PARAMS.COSTO_FIJO_BASE,
    precioCompetidor: BASE_PARAMS.PRECIO_COMPETIDOR_BASE,
    modelo: 'lineal',
  });

  const handleApplyScenario = (scenarioId: string) => {
    const sc = BENCHMARK_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setPrecio(sc.precio);
      setCostoVariable(BASE_PARAMS.COSTO_VARIABLE_BASE);
      setCostoFijo(BASE_PARAMS.COSTO_FIJO_BASE);
      setModelo('lineal');
    }
  };

  const handleReset = () => {
    setPrecio(BASE_PARAMS.PRECIO_BASE);
    setCostoVariable(BASE_PARAMS.COSTO_VARIABLE_BASE);
    setCostoFijo(BASE_PARAMS.COSTO_FIJO_BASE);
    setPrecioCompetidor(BASE_PARAMS.PRECIO_COMPETIDOR_BASE);
    setModelo('lineal');
  };

  const isProfitable = sim.utilidadNeta > 0;
  const isLoss = sim.utilidadNeta < 0;
  const isAboveBase = sim.utilidadNeta > baseMetrics.utilidadNeta;

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Simulador Interactivo</span>
              <span aria-hidden="true">·</span>
              <span>Motor Econométrico MCO</span>
              <span aria-hidden="true">·</span>
              <span>Sensibilidad Ceteris Paribus</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Simulador de Precios y Escenarios Comerciales
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Modifica el precio de venta unitario, estructura de costos y precios de competencia para proyectar demanda, ingresos brutos y utilidad neta en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyScenario('optimo')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aplicar Óptimo ($12.08)</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* Preset Benchmark Scenario Buttons (Section 11) */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 mb-2.5">
            ESCENARIOS PREDETERMINADOS (INFORME SEC. 11):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {BENCHMARK_SCENARIOS.map((sc) => {
              const isSelected = Math.abs(precio - sc.precio) < 0.05 && modelo === 'lineal';
              return (
                <button
                  key={sc.id}
                  onClick={() => handleApplyScenario(sc.id)}
                  className={`flex flex-col text-left p-2.5 rounded-lg border transition-all text-xs ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500/30'
                      : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      ${sc.precio.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {sc.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium truncate mt-1">
                    {sc.nombre.split(' (')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-mono mt-0.5 ${
                      sc.utilidad > 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    Utilidad: ${sc.utilidad.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Simulation Layout: Controls vs Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Variables de Entrada</span>
            </h3>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-[11px]">
              <button
                onClick={() => setModelo('lineal')}
                className={`px-2.5 py-1 font-medium rounded transition-colors ${
                  modelo === 'lineal' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lineal OLS
              </button>
              <button
                onClick={() => setModelo('multivariado')}
                className={`px-2.5 py-1 font-medium rounded transition-colors ${
                  modelo === 'multivariado' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Multivariado
              </button>
            </div>
          </div>

          {/* Control 1: Precio de Venta Unitario */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Precio de Venta Propio (P):
              </label>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded font-mono font-bold text-amber-950 text-sm">
                <span>$</span>
                <input
                  type="number"
                  step="0.05"
                  min="7.00"
                  max="19.00"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-16 bg-transparent text-right outline-none font-bold"
                />
              </div>
            </div>
            <input
              type="range"
              min="8.00"
              max="18.50"
              step="0.05"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Min $8.00</span>
              <span className="text-amber-800 font-semibold">Óptimo: $12.08</span>
              <span>Base: $14.46</span>
              <span>Max $18.50</span>
            </div>
          </div>

          {/* Control 2: Costo Variable Unitario */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800">
                  Costo Variable Unitario (CV):
                </label>
                <div className="text-[11px] text-slate-500">Materia prima, empaque, embotellado</div>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold text-slate-900 text-xs">
                <span>$</span>
                <input
                  type="number"
                  step="0.05"
                  min="4.50"
                  max="8.50"
                  value={costoVariable}
                  onChange={(e) => setCostoVariable(Number(e.target.value))}
                  className="w-14 bg-transparent text-right outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="4.50"
              max="8.50"
              step="0.05"
              value={costoVariable}
              onChange={(e) => setCostoVariable(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>$4.50</span>
              <span className="text-slate-700 font-medium">Base Histórica: $6.21</span>
              <span>$8.50</span>
            </div>
          </div>

          {/* Control 3: Costos Fijos Semanales */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800">
                  Costos Fijos Semanales (CF):
                </label>
                <div className="text-[11px] text-slate-500">Nómina cervecera, alquiler, distribución base</div>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold text-slate-900 text-xs">
                <span>$</span>
                <input
                  type="number"
                  step="250"
                  min="10000"
                  max="28000"
                  value={costoFijo}
                  onChange={(e) => setCostoFijo(Number(e.target.value))}
                  className="w-20 bg-transparent text-right outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="28000"
              step="250"
              value={costoFijo}
              onChange={(e) => setCostoFijo(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>$10,000</span>
              <span className="text-slate-700 font-medium">Estudio: $18,500</span>
              <span>$28,000</span>
            </div>
          </div>

          {/* Control 4: Precio Competidor (if multivariable) */}
          {modelo === 'multivariado' && (
            <div className="space-y-2 pt-2 border-t border-slate-100 bg-indigo-50/40 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-indigo-950">
                    Precio Competidor Directo (P_comp):
                  </label>
                  <div className="text-[11px] text-indigo-700">Competidor directo de IPA artesanal</div>
                </div>
                <div className="flex items-center gap-1 bg-white border border-indigo-200 px-2 py-0.5 rounded font-mono font-bold text-indigo-900 text-xs">
                  <span>$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="12.00"
                    max="18.00"
                    value={precioCompetidor}
                    onChange={(e) => setPrecioCompetidor(Number(e.target.value))}
                    className="w-14 bg-transparent text-right outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="12.00"
                max="18.00"
                step="0.10"
                value={precioCompetidor}
                onChange={(e) => setPrecioCompetidor(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-indigo-200 rounded-lg"
              />
              <div className="text-[11px] text-indigo-800">
                Efecto cruzado: cada +$1.00 del competidor atrae +70.14 unidades.
              </div>
            </div>
          )}

          {/* Model active indicator equation */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
            <div className="font-semibold text-slate-700 mb-1">Ecuación de Demanda Activa:</div>
            <div className="font-mono text-slate-900 bg-white p-2 rounded border border-slate-200/70">
              {modelo === 'lineal'
                ? `Q = 12596.47 - 701.57 · (${precio.toFixed(2)}) = ${sim.demanda.toLocaleString()} u`
                : `Q = 3753.80 - 161.21·(${precio.toFixed(2)}) + 70.14·(${precioCompetidor.toFixed(2)}) = ${sim.demanda.toLocaleString()} u`}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Financial Outcomes (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Profit Card */}
          <div
            className={`border rounded-xl p-6 shadow-xs transition-colors ${
              isLoss
                ? 'bg-rose-50/60 border-rose-300'
                : isAboveBase
                ? 'bg-emerald-50/40 border-emerald-300/80'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Resultado Económico Proyectado
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-3">
                  <span
                    className={`font-mono tabular-nums ${
                      isLoss ? 'text-rose-700' : 'text-emerald-700'
                    }`}
                  >
                    ${sim.utilidadNeta.toLocaleString()}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    utilidad neta semanal
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {isLoss ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-md text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>Zona de Pérdidas</span>
                  </div>
                ) : sim.variacionVsBase > 0 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md text-xs font-semibold">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>+{sim.variacionVsBase.toFixed(1)}% vs Escenario Base</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-semibold">
                    <span>{sim.variacionVsBase.toFixed(1)}% vs Escenario Base</span>
                  </div>
                )}
              </div>
            </div>

            {/* Incremental Gain Commentary */}
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between text-xs gap-2">
              <div className="text-slate-600">
                Ganancia Incremental vs Base: {' '}
                <span
                  className={`font-mono font-bold ${
                    sim.gananciaIncremental >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {sim.gananciaIncremental >= 0
                    ? `+$${sim.gananciaIncremental.toLocaleString()}`
                    : `-$${Math.abs(sim.gananciaIncremental).toLocaleString()}`}
                </span>
                {' '}(Base histórica: ${BASE_PARAMS.UTILIDAD_BASE.toLocaleString()})
              </div>
              <div className="text-slate-600">
                Diferencia vs Máximo Óptimo: {' '}
                <span className="font-mono font-bold text-slate-800">
                  -${Math.max(0, BASE_PARAMS.UTILIDAD_OPTIMA - sim.utilidadNeta).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metric 4-Pack Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Demanda */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Demanda (Q)</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {sim.demanda.toLocaleString()} u
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {((sim.demanda - BASE_PARAMS.DEMANDA_BASE) / BASE_PARAMS.DEMANDA_BASE * 100).toFixed(1)}% vs Base
              </div>
            </div>

            {/* Ingresos Brutos */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Ingresos (R)</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                ${sim.ingresos.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                P × Q facturado
              </div>
            </div>

            {/* Costos Totales */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Costos (C)</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                ${sim.costosTotales.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                CF (${costoFijo.toLocaleString()}) + CV
              </div>
            </div>

            {/* Margen Unitario */}
            <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Margen Unitario</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                ${sim.margenUnitario.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {sim.margenPorcentaje.toFixed(1)}% sobre precio
              </div>
            </div>
          </div>

          {/* Deep Econometric Indicators */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Diagnóstico Econométrico & Punto de Equilibrio
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Break-even box */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>PUNTO DE EQUILIBRIO (Q_eq)</span>
                  <Scale className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {isFinite(sim.puntoEquilibrioQ) ? `${sim.puntoEquilibrioQ.toLocaleString()} u` : 'No viable (Margen <= 0)'}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {sim.demanda >= sim.puntoEquilibrioQ ? (
                    <span className="text-emerald-700 font-medium">
                      Supera el equilibrio por +{(sim.demanda - sim.puntoEquilibrioQ).toLocaleString()} u (+{((sim.demanda / sim.puntoEquilibrioQ - 1) * 100).toFixed(0)}%)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-medium">
                      Por debajo del equilibrio en {(sim.puntoEquilibrioQ - sim.demanda).toLocaleString()} u
                    </span>
                  )}
                </div>
              </div>

              {/* Point Elasticity box */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>ELASTICIDAD PUNTUAL (ε)</span>
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {sim.demanda > 0 ? sim.elasticidadPunto.toFixed(2) : 'Indeterminada (Q=0)'}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {Math.abs(sim.elasticidadPunto) > 1 ? (
                    <span className="text-purple-700 font-medium">
                      Zona Elástica (|ε| &gt; 1): Bajar precio aumenta ingresos
                    </span>
                  ) : Math.abs(sim.elasticidadPunto) < 1 ? (
                    <span className="text-amber-800 font-medium">
                      Zona Inelástica (|ε| &lt; 1): Subir precio aumentaría ingresos
                    </span>
                  ) : (
                    <span className="text-indigo-700 font-medium">
                      Elasticidad Unitaria (|ε| = 1): Maximiza ingresos brutos
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Benchmarking Comparison Bars */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="text-xs font-semibold text-slate-700">
                Comparativa de Utilidad Neta ($ USD):
              </div>

              {/* Bar 1: Simulado */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-800">
                    Simulación Actual (${precio.toFixed(2)}):
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    ${sim.utilidadNeta.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      sim.utilidadNeta > 0 ? 'bg-amber-600' : 'bg-rose-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(5, (Math.abs(sim.utilidadNeta) / 6000) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Bar 2: Base */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-500">
                    Escenario Base Histórico ($14.46):
                  </span>
                  <span className="font-mono text-slate-600 tabular-nums">
                    ${BASE_PARAMS.UTILIDAD_BASE.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400 rounded-full"
                    style={{ width: `${(BASE_PARAMS.UTILIDAD_BASE / 6000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Óptimo */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-emerald-800">
                    Máximo Óptimo Analítico ($12.08):
                  </span>
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    ${BASE_PARAMS.UTILIDAD_OPTIMA.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${(BASE_PARAMS.UTILIDAD_OPTIMA / 6000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

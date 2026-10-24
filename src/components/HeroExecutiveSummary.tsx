import React from 'react';
import { ArrowDownRight, ArrowUpRight, TrendingUp, DollarSign, Package, Percent, Scale, CheckCircle2 } from 'lucide-react';
import { BASE_PARAMS, BENCHMARK_SCENARIOS } from '../data/econometricData';

interface HeroExecutiveSummaryProps {
  onGoToSimulator: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const HeroExecutiveSummary: React.FC<HeroExecutiveSummaryProps> = ({
  onGoToSimulator,
  onSelectScenario,
}) => {
  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left: Product & Core Diagnosis */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              {/* Unboxed metadata without pills */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                <span>Consumo Masivo / FMCG</span>
                <span aria-hidden="true">·</span>
                <span>Retail & Distribución</span>
                <span aria-hidden="true">·</span>
                <span>Serie de 52 Semanas</span>
                <span aria-hidden="true">·</span>
                <span>Fecha: 2026-10-03</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Estudio de Estimación y Optimización de Precios: Cerveza Artesanal IPA 4-Pack
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Evaluación econométrica del comportamiento de la demanda frente al precio unitario, estructura de costos fijos y variables, y simulación de políticas para maximizar el beneficio económico neto.
              </p>
            </div>

            {/* Key takeaway callout */}
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-950">
                  <span className="font-bold">Diagnóstico Clave:</span> La empresa opera actualmente a un precio promedio de{' '}
                  <span className="font-semibold text-slate-900 font-mono">$14.46</span>, por encima del precio óptimo de{' '}
                  <span className="font-bold text-amber-900 font-mono">$12.08</span>. Dado que la elasticidad es altamente elástica (<span className="font-mono font-semibold">ε = -4.13</span>), una reducción de precio del{' '}
                  <span className="font-bold">-16.4%</span> dispara las unidades vendidas en <span className="font-bold">+68.0%</span> y genera una ganancia neta incremental de{' '}
                  <span className="font-bold text-emerald-800 font-mono">+$3,958 por semana (+228.1%)</span>.
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onGoToSimulator}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs"
              >
                Abrir Simulador de Precios
              </button>
              <button
                onClick={() => onSelectScenario('optimo')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Ver Escenario Óptimo ($12.08)
              </button>
            </div>
          </div>

          {/* Right: Product Photo Showcase with Zero-Broken-Image fallback */}
          <div className="w-full lg:w-96 shrink-0 flex flex-col">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-64 sm:h-72 lg:h-full min-h-[240px]">
              <img
                src="/src/assets/images/craft_beer_ipa_pack_1792857865083.jpg"
                alt="Cerveza Artesanal IPA 4-Pack en botella de vidrio ámbar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback container in case image is missing
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-4xl mb-2">🍺</span>
                <span className="font-bold text-lg">Cerveza Artesanal IPA 4-Pack</span>
                <span className="text-xs text-amber-200 mt-1">Retail & FMCG 52 Semanas</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 text-white">
                <div className="text-xs font-semibold text-amber-300">SKU Monitoreado: IPA 4-Pack 330ml</div>
                <div className="text-xs text-slate-200 mt-0.5">3 Canales: Supermercados, Licorerías & Directo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Comparison Grid (Base vs Óptimo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Precio */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>PRECIO UNITARIO</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ${BASE_PARAMS.PRECIO_OPTIMO.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono line-through">
              ${BASE_PARAMS.PRECIO_BASE.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-16.4% ajuste óptimo sugerido</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2">
            Rango histórico observado: $12.90 – $16.00
          </div>
        </div>

        {/* KPI 2: Demanda */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>DEMANDA PROYECTADA</span>
            <Package className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {BASE_PARAMS.DEMANDA_OPTIMA.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              vs {BASE_PARAMS.DEMANDA_BASE.toLocaleString()} u
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+68.0% incremento en volumen</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2">
            Punto de equilibrio actual: 2,243 u/semana
          </div>
        </div>

        {/* KPI 3: Utilidad Neta */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>UTILIDAD NETA SEMANAL</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              ${BASE_PARAMS.UTILIDAD_OPTIMA.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              vs ${BASE_PARAMS.UTILIDAD_BASE.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+228.1% (+$3,958 ganancia neta)</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2">
            Margen de contribución óptimo: 48.6% ($5.87/u)
          </div>
        </div>

        {/* KPI 4: Elasticidad */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>ELASTICIDAD PRECIO (ε)</span>
            <Scale className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {BASE_PARAMS.ELASTICIDAD_MEDIA.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-purple-700">
              Altamente Elástica
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-600">
            <span>|ε| &gt; 1.0 (Sensibilidad crítica)</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-2">
            Regresión OLS: R² = 99.4% (t = -92.59)
          </div>
        </div>
      </div>

      {/* Benchmark Scenarios Summary Table (Section 11) */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Simulación de Escenarios Comerciales (Tabla Sección 11)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Impacto proyectado en volumen, facturación bruta y utilidad neta con Costo Fijo = $18,500 y CV = $6.21.
            </p>
          </div>
          <button
            onClick={onGoToSimulator}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            Explorar en simulador interactivo →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-y border-slate-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Escenario</th>
                <th className="py-2.5 px-3 text-right">Precio</th>
                <th className="py-2.5 px-3 text-right">Demanda (u)</th>
                <th className="py-2.5 px-3 text-right">Ingresos</th>
                <th className="py-2.5 px-3 text-right">Costos</th>
                <th className="py-2.5 px-3 text-right">Utilidad Neta</th>
                <th className="py-2.5 px-3 text-right">Margen</th>
                <th className="py-2.5 px-3 text-right">Var vs Base</th>
                <th className="py-2.5 px-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {BENCHMARK_SCENARIOS.map((sc) => {
                const isOptimal = sc.isOptimal;
                const isLoss = sc.utilidad < 0;
                return (
                  <tr
                    key={sc.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isOptimal ? 'bg-amber-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isOptimal ? 'text-amber-900' : 'text-slate-900'}`}>
                          {sc.nombre}
                        </span>
                        {isOptimal && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                            Óptimo
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                        {sc.descripcion}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">
                      ${sc.precio.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">
                      {sc.demanda.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">
                      ${sc.ingresos.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">
                      ${sc.costos.toLocaleString()}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        isLoss ? 'text-rose-600' : isOptimal ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      ${sc.utilidad.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {sc.margen.toFixed(1)}%
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-semibold ${
                        sc.varVsBase > 0
                          ? 'text-emerald-700'
                          : sc.varVsBase < 0
                          ? 'text-rose-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {sc.varVsBase > 0 ? `+${sc.varVsBase.toFixed(1)}%` : `${sc.varVsBase.toFixed(1)}%`}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <button
                        onClick={() => onSelectScenario(sc.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-amber-900 bg-slate-100 hover:bg-amber-100/70 rounded transition-colors"
                      >
                        Simular
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Econometric Foundations Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-bold text-slate-900">
              Modelo 1: Regresión Lineal OLS (Principal)
            </h3>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 font-mono text-sm text-slate-800">
            Q = 12596.47 - 701.57 · P
          </div>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Coeficiente de Determinación (R²):</span>
              <span className="font-mono font-bold text-slate-900">99.4% (R² Aj = 99.4%)</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Pendiente (-b):</span>
              <span className="font-mono text-slate-900">-701.57 (t = -92.59, p = 0.0001)</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Intercepto (a):</span>
              <span className="font-mono text-slate-900">12596.47 (t = 114.79, p = 0.0001)</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Estadístico Durbin-Watson:</span>
              <span className="font-mono text-slate-900">1.9991 (Sin autocorrelación)</span>
            </li>
            <li className="flex justify-between pt-0.5">
              <span className="font-medium text-slate-700">Elasticidad Precio Media:</span>
              <span className="font-mono font-bold text-purple-700">ε = -4.13 (Elástica)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900">
              Modelo 2: Multivariante con Competencia
            </h3>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 font-mono text-sm text-slate-800">
            Q = 3753.80 - 161.21·P + 70.14·P_comp
          </div>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Bondad de Ajuste (R²):</span>
              <span className="font-mono font-bold text-slate-900">96.0%</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Sensibilidad Precio Propio:</span>
              <span className="font-mono text-slate-900">-161.21 u por cada $1.00</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Elasticidad Cruzada Competencia:</span>
              <span className="font-mono font-bold text-indigo-700">+70.14 u por cada $1.00 de subida rival</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-medium text-slate-700">Precio Medio Competidor:</span>
              <span className="font-mono text-slate-900">$14.69 (Rango: $14.00 – $15.60)</span>
            </li>
            <li className="flex justify-between pt-0.5">
              <span className="font-medium text-slate-700">Insight Estratégico:</span>
              <span className="text-slate-700 text-right">Efecto sustituto directo sin guerra de precios</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { LineChart, Info, HelpCircle } from 'lucide-react';
import {
  BASE_PARAMS,
  HISTORICAL_DATA,
  generateEconomicCurves,
} from '../data/econometricData';

export const EconometricCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demanda' | 'ingresos_costos' | 'utilidad' | 'elasticidad'>('demanda');
  const [showEmpiricalPoints, setShowEmpiricalPoints] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    price: number;
    demand: number;
    ingresos: number;
    costos: number;
    utilidad: number;
    elasticidad: number;
    x: number;
    y: number;
  } | null>(null);

  const curveData = generateEconomicCurves(BASE_PARAMS.COSTO_VARIABLE_BASE, BASE_PARAMS.COSTO_FIJO_BASE);

  // SVG Chart Dimensions
  const width = 800;
  const height = 400;
  const padding = { top: 30, right: 40, bottom: 50, left: 70 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scales helpers
  const minPrice = 8.0;
  const maxPrice = 18.0;

  const getX = (price: number) => {
    return padding.left + ((price - minPrice) / (maxPrice - minPrice)) * plotWidth;
  };

  // Render functions for different charts
  const renderDemandChart = () => {
    const minQ = 0;
    const maxQ = 7500;
    const getY = (q: number) => padding.top + plotHeight - (q / maxQ) * plotHeight;

    // Build path for demand line
    const pathD = curveData
      .filter((d) => d.price >= minPrice && d.price <= maxPrice)
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.price)} ${getY(d.demand)}`)
      .join(' ');

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Grid lines */}
        {[0, 1500, 3000, 4500, 6000, 7500].map((q) => (
          <g key={q}>
            <line
              x1={padding.left}
              y1={getY(q)}
              x2={width - padding.right}
              y2={getY(q)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={getY(q) + 4}
              textAnchor="end"
              className="text-[10px] fill-slate-400 font-mono"
            >
              {q}
            </text>
          </g>
        ))}

        {/* X Axis ticks */}
        {[8, 10, 12, 14, 16, 18].map((p) => (
          <g key={p}>
            <line
              x1={getX(p)}
              y1={padding.top}
              x2={getX(p)}
              y2={padding.top + plotHeight}
              stroke="#f1f5f9"
            />
            <text
              x={getX(p)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 font-mono"
            >
              ${p}
            </text>
          </g>
        ))}

        {/* Demand Line */}
        <path d={pathD} fill="none" stroke="#d97706" strokeWidth="2.5" />

        {/* Empirical Scatter Points */}
        {showEmpiricalPoints &&
          HISTORICAL_DATA.map((obs) => {
            const cx = getX(obs.precioVentaUSD);
            const cy = getY(obs.unidadesVendidas);
            return (
              <circle
                key={obs.semana}
                cx={cx}
                cy={cy}
                r="3.5"
                fill="#0f172a"
                fillOpacity="0.4"
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}

        {/* Benchmark Points */}
        {/* Base Point ($14.46, 2453) */}
        <g>
          <circle
            cx={getX(BASE_PARAMS.PRECIO_BASE)}
            cy={getY(BASE_PARAMS.DEMANDA_BASE)}
            r="6"
            fill="#64748b"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text
            x={getX(BASE_PARAMS.PRECIO_BASE) + 8}
            y={getY(BASE_PARAMS.DEMANDA_BASE) - 8}
            className="text-[10px] font-bold fill-slate-700 font-sans"
          >
            Base ($14.46, 2,453 u)
          </text>
        </g>

        {/* Optimal Point ($12.08, 4120) */}
        <g>
          <circle
            cx={getX(BASE_PARAMS.PRECIO_OPTIMO)}
            cy={getY(BASE_PARAMS.DEMANDA_OPTIMA)}
            r="7"
            fill="#059669"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text
            x={getX(BASE_PARAMS.PRECIO_OPTIMO) + 10}
            y={getY(BASE_PARAMS.DEMANDA_OPTIMA) - 10}
            className="text-[10px] font-bold fill-emerald-800 font-sans"
          >
            Óptimo ($12.08, 4,120 u)
          </text>
        </g>

        {/* Interactive Overlay Points */}
        {curveData
          .filter((d) => d.price >= minPrice && d.price <= maxPrice)
          .map((d) => (
            <circle
              key={d.price}
              cx={getX(d.price)}
              cy={getY(d.demand)}
              r="8"
              fill="transparent"
              className="cursor-pointer hover:stroke-amber-500 hover:stroke-2"
              onMouseEnter={() =>
                setHoveredPoint({
                  ...d,
                  x: getX(d.price),
                  y: getY(d.demand),
                })
              }
            />
          ))}

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 12}
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Precio Unitario ($ USD por 4-Pack)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Demanda Semanal (Unidades Físicas)
        </text>
      </svg>
    );
  };

  const renderRevenueCostChart = () => {
    const maxVal = 65000;
    const getY = (val: number) => padding.top + plotHeight - (val / maxVal) * plotHeight;

    const validData = curveData.filter((d) => d.price >= minPrice && d.price <= maxPrice);
    const revenuePath = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.price)} ${getY(d.ingresos)}`).join(' ');
    const costPath = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.price)} ${getY(d.costos)}`).join(' ');

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Grid lines */}
        {[0, 15000, 30000, 45000, 60000].map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={getY(v)}
              x2={width - padding.right}
              y2={getY(v)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={getY(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-slate-400 font-mono"
            >
              ${v / 1000}k
            </text>
          </g>
        ))}

        {/* X Ticks */}
        {[8, 10, 12, 14, 16, 18].map((p) => (
          <g key={p}>
            <line
              x1={getX(p)}
              y1={padding.top}
              x2={getX(p)}
              y2={padding.top + plotHeight}
              stroke="#f1f5f9"
            />
            <text
              x={getX(p)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 font-mono"
            >
              ${p}
            </text>
          </g>
        ))}

        {/* Revenue Line (Blue/Indigo) */}
        <path d={revenuePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" />

        {/* Cost Line (Rose/Red) */}
        <path d={costPath} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />

        {/* Optimal Price Marker */}
        <line
          x1={getX(BASE_PARAMS.PRECIO_OPTIMO)}
          y1={padding.top}
          x2={getX(BASE_PARAMS.PRECIO_OPTIMO)}
          y2={padding.top + plotHeight}
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* Interactive Hover Nodes */}
        {validData.map((d) => (
          <circle
            key={d.price}
            cx={getX(d.price)}
            cy={getY(d.ingresos)}
            r="8"
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() =>
              setHoveredPoint({
                ...d,
                x: getX(d.price),
                y: getY(d.ingresos),
              })
            }
          />
        ))}

        {/* Legend in Chart */}
        <g transform={`translate(${width - 240}, ${padding.top + 10})`}>
          <rect width="190" height="60" fill="#ffffff" stroke="#e2e8f0" rx="4" opacity="0.9" />
          <line x1="12" y1="20" x2="35" y2="20" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="42" y="24" className="text-[11px] font-semibold fill-slate-800">
            Ingresos R(P) = P · Q
          </text>
          <line x1="12" y1="42" x2="35" y2="42" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <text x="42" y="46" className="text-[11px] font-semibold fill-slate-800">
            Costos C(P) = CF + CV·Q
          </text>
        </g>

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 12}
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Precio Unitario ($ USD)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Flujo Monetario Semanal ($ USD)
        </text>
      </svg>
    );
  };

  const renderProfitChart = () => {
    const minUtil = -12000;
    const maxUtil = 7000;
    const getY = (val: number) => padding.top + plotHeight - ((val - minUtil) / (maxUtil - minUtil)) * plotHeight;
    const zeroY = getY(0);

    const validData = curveData.filter((d) => d.price >= minPrice && d.price <= maxPrice);
    const profitPath = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.price)} ${getY(d.utilidad)}`).join(' ');

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Zero baseline (Breakeven threshold) */}
        <line
          x1={padding.left}
          y1={zeroY}
          x2={width - padding.right}
          y2={zeroY}
          stroke="#64748b"
          strokeWidth="1.5"
        />
        <text
          x={width - padding.right + 8}
          y={zeroY + 4}
          className="text-[10px] font-bold fill-slate-500 font-mono"
        >
          $0
        </text>

        {/* Grid lines */}
        {[-10000, -5000, 0, 3000, 6000].map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={getY(v)}
              x2={width - padding.right}
              y2={getY(v)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={getY(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-slate-400 font-mono"
            >
              ${v}
            </text>
          </g>
        ))}

        {/* X Ticks */}
        {[8, 10, 12, 14, 16, 18].map((p) => (
          <g key={p}>
            <line
              x1={getX(p)}
              y1={padding.top}
              x2={getX(p)}
              y2={padding.top + plotHeight}
              stroke="#f1f5f9"
            />
            <text
              x={getX(p)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 font-mono"
            >
              ${p}
            </text>
          </g>
        ))}

        {/* Shaded Profit Area */}
        <path
          d={`${profitPath} L ${getX(validData[validData.length - 1].price)} ${zeroY} L ${getX(validData[0].price)} ${zeroY} Z`}
          fill="#10b981"
          fillOpacity="0.12"
        />

        {/* Profit Curve */}
        <path d={profitPath} fill="none" stroke="#059669" strokeWidth="3" />

        {/* Optimal Point Marker */}
        <circle
          cx={getX(BASE_PARAMS.PRECIO_OPTIMO)}
          cy={getY(BASE_PARAMS.UTILIDAD_OPTIMA)}
          r="7"
          fill="#059669"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <text
          x={getX(BASE_PARAMS.PRECIO_OPTIMO)}
          y={getY(BASE_PARAMS.UTILIDAD_OPTIMA) - 14}
          textAnchor="middle"
          className="text-[11px] font-extrabold fill-emerald-800 font-sans"
        >
          Pico Óptimo: $12.08 (π = $5,694)
        </text>

        {/* Base Point Marker */}
        <circle
          cx={getX(BASE_PARAMS.PRECIO_BASE)}
          cy={getY(BASE_PARAMS.UTILIDAD_BASE)}
          r="5.5"
          fill="#64748b"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text
          x={getX(BASE_PARAMS.PRECIO_BASE) + 8}
          y={getY(BASE_PARAMS.UTILIDAD_BASE) + 15}
          className="text-[10px] font-bold fill-slate-700 font-sans"
        >
          Base ($14.46, $1,735)
        </text>

        {/* Interactive nodes */}
        {validData.map((d) => (
          <circle
            key={d.price}
            cx={getX(d.price)}
            cy={getY(d.utilidad)}
            r="8"
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() =>
              setHoveredPoint({
                ...d,
                x: getX(d.price),
                y: getY(d.utilidad),
              })
            }
          />
        ))}

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 12}
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Precio Unitario ($ USD)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Utilidad Neta π(P) ($ USD)
        </text>
      </svg>
    );
  };

  const renderElasticityChart = () => {
    const minE = -8.0;
    const maxE = 0;
    const getY = (val: number) => padding.top + plotHeight - ((val - minE) / (maxE - minE)) * plotHeight;
    const unitE = getY(-1.0);

    const validData = curveData.filter((d) => d.price >= minPrice && d.price <= 16.5);
    const ePath = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.price)} ${getY(d.elasticidad)}`).join(' ');

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Unit Elasticity Threshold Line (|ε| = 1.0) */}
        <line
          x1={padding.left}
          y1={unitE}
          x2={width - padding.right}
          y2={unitE}
          stroke="#7c3aed"
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <text
          x={width - padding.right + 6}
          y={unitE + 4}
          className="text-[10px] font-bold fill-purple-700 font-mono"
        >
          ε = -1.0 (Unitario)
        </text>

        {/* Grid lines */}
        {[-8, -6, -4, -2, 0].map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={getY(v)}
              x2={width - padding.right}
              y2={getY(v)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={getY(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-slate-400 font-mono"
            >
              {v}
            </text>
          </g>
        ))}

        {/* X Ticks */}
        {[8, 10, 12, 14, 16].map((p) => (
          <g key={p}>
            <line
              x1={getX(p)}
              y1={padding.top}
              x2={getX(p)}
              y2={padding.top + plotHeight}
              stroke="#f1f5f9"
            />
            <text
              x={getX(p)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 font-mono"
            >
              ${p}
            </text>
          </g>
        ))}

        {/* Curve */}
        <path d={ePath} fill="none" stroke="#9333ea" strokeWidth="2.5" />

        {/* Mean Elasticity Point ($14.46, -4.13) */}
        <circle
          cx={getX(BASE_PARAMS.PRECIO_BASE)}
          cy={getY(BASE_PARAMS.ELASTICIDAD_MEDIA)}
          r="6"
          fill="#9333ea"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text
          x={getX(BASE_PARAMS.PRECIO_BASE) + 10}
          y={getY(BASE_PARAMS.ELASTICIDAD_MEDIA) - 10}
          className="text-[10px] font-bold fill-purple-900 font-sans"
        >
          Media: $14.46 (ε = -4.13)
        </text>

        {/* Interactive nodes */}
        {validData.map((d) => (
          <circle
            key={d.price}
            cx={getX(d.price)}
            cy={getY(d.elasticidad)}
            r="8"
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() =>
              setHoveredPoint({
                ...d,
                x: getX(d.price),
                y: getY(d.elasticidad),
              })
            }
          />
        ))}

        {/* Annotations */}
        <text
          x={padding.left + 20}
          y={unitE - 15}
          className="text-[11px] font-bold fill-purple-900"
        >
          ZONA INELÁSTICA (|ε| &lt; 1)
        </text>
        <text
          x={padding.left + 20}
          y={unitE + 25}
          className="text-[11px] font-bold fill-purple-700"
        >
          ZONA ELÁSTICA (|ε| &gt; 1) — Mercado Actual de Cerveza IPA
        </text>

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 12}
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Precio Unitario ($ USD)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-xs font-semibold fill-slate-700 font-sans"
        >
          Elasticidad Precio (ε)
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & View Switcher */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Modelado Econométrico</span>
              <span aria-hidden="true">·</span>
              <span>Análisis de Regresión MCO</span>
              <span aria-hidden="true">·</span>
              <span>Curvas Analíticas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Curvas Econométricas de Demanda, Costos y Utilidad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visualización interactiva de la ley de la demanda, la estructura de costos e ingresos y la parábola de optimización del beneficio neto.
            </p>
          </div>

          {/* Interactive Chart Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('demanda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'demanda'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demanda Q(P)
            </button>
            <button
              onClick={() => setActiveTab('ingresos_costos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'ingresos_costos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ingresos vs Costos
            </button>
            <button
              onClick={() => setActiveTab('utilidad')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'utilidad'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parábola π(P)
            </button>
            <button
              onClick={() => setActiveTab('elasticidad')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'elasticidad'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Elasticidad ε(P)
            </button>
          </div>
        </div>

        {/* Options Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-4">
            {activeTab === 'demanda' && (
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={showEmpiricalPoints}
                  onChange={(e) => setShowEmpiricalPoints(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                />
                <span>Mostrar 52 puntos empíricos observados</span>
              </label>
            )}
            <div className="text-slate-500">
              Pasa el cursor sobre la curva para inspeccionar coordenadas exactas.
            </div>
          </div>

          {hoveredPoint && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded text-xs font-mono">
              <span className="font-bold text-amber-950">P: ${hoveredPoint.price.toFixed(2)}</span>
              <span>Q: {hoveredPoint.demand.toLocaleString()} u</span>
              <span>Ing: ${hoveredPoint.ingresos.toLocaleString()}</span>
              <span className={hoveredPoint.utilidad > 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                Util: ${hoveredPoint.utilidad.toLocaleString()}
              </span>
              <span>ε: {hoveredPoint.elasticidad.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="relative">
          {activeTab === 'demanda' && renderDemandChart()}
          {activeTab === 'ingresos_costos' && renderRevenueCostChart()}
          {activeTab === 'utilidad' && renderProfitChart()}
          {activeTab === 'elasticidad' && renderElasticityChart()}
        </div>

        {/* Explanatory Footnotes */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-bold text-slate-900 block mb-1">Ecuación OLS Lineal:</span>
            <span>Q = 12,596.47 - 701.57·P con R² = 99.4%. Cada centavo de descuento moviliza aproximadamente 7 unidades semanales.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-bold text-slate-900 block mb-1">Máximo de Utilidad vs Ingresos:</span>
            <span>El ingreso máximo ocurre a $8.98 ($56,542), pero a ese precio los costos totales superan la facturación, generando pérdida de -$1,070. El óptimo real está en $12.08.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-bold text-slate-900 block mb-1">Rango Seguro de Operación:</span>
            <span>Cualquier precio por encima de $16.50 reduce el volumen por debajo del umbral de rentabilidad de la cervecería artesanal ($18,500 fijos).</span>
          </div>
        </div>
      </div>
    </div>
  );
};

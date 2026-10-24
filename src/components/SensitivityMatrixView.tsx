import React, { useState } from 'react';
import { Grid3X3, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  BASE_PARAMS,
  generateSensitivityMatrix,
} from '../data/econometricData';

export const SensitivityMatrixView: React.FC = () => {
  const [metricMode, setMetricMode] = useState<'utilidad' | 'demanda' | 'margen'>('utilidad');
  const [selectedCell, setSelectedCell] = useState<{
    price: number;
    pricePct: number;
    cv: number;
    cvPct: number;
    utilidad: number;
    demanda: number;
    ingresos: number;
    margen: number;
    isBase: boolean;
  } | null>(null);

  const matrix = generateSensitivityMatrix(
    BASE_PARAMS.PRECIO_BASE,
    BASE_PARAMS.COSTO_VARIABLE_BASE,
    BASE_PARAMS.COSTO_FIJO_BASE
  );

  // Helper for background color grading
  const getCellBg = (utilidad: number, isBase: boolean) => {
    if (isBase) return 'ring-2 ring-indigo-600 bg-amber-50 font-bold';
    if (utilidad < 0) return 'bg-rose-100 text-rose-900';
    if (utilidad < 1500) return 'bg-slate-100 text-slate-800';
    if (utilidad < 3000) return 'bg-emerald-50 text-emerald-900';
    if (utilidad < 4500) return 'bg-emerald-100 text-emerald-950';
    if (utilidad < 5500) return 'bg-emerald-200 text-emerald-950 font-semibold';
    return 'bg-emerald-300 text-emerald-950 font-bold'; // Maximum profit sweet spots
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Informe Sección 12</span>
              <span aria-hidden="true">·</span>
              <span>Análisis de Escenarios Cruzados</span>
              <span aria-hidden="true">·</span>
              <span>Matriz Bidimensional</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Análisis de Sensibilidad: Precio vs Costo Variable
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Evaluación del apalancamiento operativo ante fluctuaciones conjuntas en el precio de venta (-20% a +20%) y en el costo variable unitario (-15% a +15%).
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMetricMode('utilidad')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                metricMode === 'utilidad'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Utilidad Neta ($)
            </button>
            <button
              onClick={() => setMetricMode('demanda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                metricMode === 'demanda'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demanda (u)
            </button>
            <button
              onClick={() => setMetricMode('margen')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                metricMode === 'margen'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Margen (%)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Escala de Utilidad:</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Pérdida (&lt; $0)</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">$0 - $1.5k</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">$1.5k - $4.5k</span>
              <span className="px-2 py-0.5 rounded bg-emerald-300 text-emerald-950 font-bold">$4.5k - $6k+</span>
              <span className="px-2 py-0.5 rounded border-2 border-indigo-600 bg-amber-50 font-bold">Escenario Base</span>
            </div>
          </div>
          <span className="text-slate-500">
            Haz clic en cualquier celda para desglosar la cuenta de resultados completa.
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-center text-xs font-mono tabular-nums border-collapse">
          <thead>
            {/* Top Superheader: Price Variations */}
            <tr>
              <th
                rowSpan={2}
                className="p-3 bg-slate-100 border border-slate-200 text-left font-sans font-bold text-slate-800 w-36"
              >
                Costo Var. (CV) \ Precio (P)
              </th>
              {matrix.priceHeader.map((pPct) => {
                const priceVal = Number((BASE_PARAMS.PRECIO_BASE * (1 + pPct / 100)).toFixed(2));
                return (
                  <th
                    key={pPct}
                    className={`p-2 border border-slate-200 font-sans ${
                      pPct === 0 ? 'bg-amber-100 font-extrabold text-amber-950' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-bold">
                      {pPct > 0 ? `+${pPct}%` : `${pPct}%`}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      ${priceVal.toFixed(2)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row) => (
              <tr key={row.cvPct}>
                {/* Row Header: CV Variations */}
                <th
                  className={`p-2.5 border border-slate-200 text-left font-sans ${
                    row.cvPct === 0 ? 'bg-amber-100 font-bold text-amber-950' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">
                    {row.cvPct > 0 ? `+${row.cvPct}%` : `${row.cvPct}%`}
                    <span className="font-normal text-slate-500 font-mono ml-1">(${row.cv.toFixed(2)})</span>
                  </div>
                </th>

                {/* Data Cells */}
                {row.cells.map((cell) => {
                  const isSelected =
                    selectedCell?.price === cell.price && selectedCell?.cv === cell.cv;
                  const bgClass = getCellBg(cell.utilidad, cell.isBase);

                  return (
                    <td
                      key={cell.price}
                      onClick={() => setSelectedCell(cell)}
                      className={`p-2 border border-slate-200 cursor-pointer transition-all hover:ring-2 hover:ring-amber-500 ${bgClass} ${
                        isSelected ? 'ring-2 ring-amber-600 scale-105 z-10 shadow-sm' : ''
                      }`}
                    >
                      {metricMode === 'utilidad' && (
                        <span>${cell.utilidad.toLocaleString()}</span>
                      )}
                      {metricMode === 'demanda' && (
                        <span>{cell.demanda.toLocaleString()} u</span>
                      )}
                      {metricMode === 'margen' && (
                        <span>{cell.margen.toFixed(1)}%</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Detail Modal / Card */}
      {selectedCell && (
        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Desglose Económico de la Celda Seleccionada:{' '}
                <span className="font-mono text-amber-950">
                  P = ${selectedCell.price.toFixed(2)} ({selectedCell.pricePct > 0 ? `+${selectedCell.pricePct}%` : `${selectedCell.pricePct}%`}) | CV = ${selectedCell.cv.toFixed(2)} ({selectedCell.cvPct > 0 ? `+${selectedCell.cvPct}%` : `${selectedCell.cvPct}%`})
                </span>
              </h3>
            </div>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono tabular-nums">
            <div className="p-3 bg-white rounded-lg border border-amber-200/60">
              <span className="text-[11px] font-sans text-slate-500 block">Demanda Estimada</span>
              <span className="text-base font-bold text-slate-900">
                {selectedCell.demanda.toLocaleString()} unidades
              </span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-amber-200/60">
              <span className="text-[11px] font-sans text-slate-500 block">Ingresos Brutos</span>
              <span className="text-base font-bold text-slate-900">
                ${selectedCell.ingresos.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-amber-200/60">
              <span className="text-[11px] font-sans text-slate-500 block">Margen Unitario</span>
              <span className="text-base font-bold text-slate-900">
                ${(selectedCell.price - selectedCell.cv).toFixed(2)} ({selectedCell.margen.toFixed(1)}%)
              </span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-amber-200/60">
              <span className="text-[11px] font-sans text-slate-500 block">Utilidad Neta</span>
              <span
                className={`text-base font-bold ${
                  selectedCell.utilidad > 0 ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                ${selectedCell.utilidad.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Core Sensitivity Insight Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600" />
          <span>Hallazgos del Análisis de Sensibilidad (Sección 12)</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          1. <strong>Apalancamiento Asimétrico:</strong> La utilidad es mucho más sensible a variaciones de precio que a reducciones de costos variables. Una reducción de precio del 15% (hacia $12.29) duplica con creces la utilidad, mientras que reducir el costo variable en 15% sólo añade unos cientos de dólares a precio base.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mt-2">
          2. <strong>Zona de Riesgo Extremo:</strong> Si el precio supera los $16.00 (+10% sobre la base), la demanda cae por debajo del umbral de amortización de los $18,500 fijos, empujando la empresa a números rojos con independencia del control de costos variables.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Printer, CheckCircle2, TrendingUp, DollarSign, Package } from 'lucide-react';
import { BASE_PARAMS, BENCHMARK_SCENARIOS } from '../data/econometricData';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 print:hidden">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Vista de Impresión / Exportación Ejecutiva
            </h3>
            <p className="text-xs text-slate-500">
              Resumen formal del Estudio Integral de Estimación y Optimización de Precios.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800 text-xs print:p-0 print:text-black">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              INFORME TÉCNICO Y COMERCIAL · FMCG RETAIL
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              ESTUDIO INTEGRAL DE ESTIMACIÓN Y OPTIMIZACIÓN DE PRECIOS
            </h1>
            <div className="text-xs text-slate-600 mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono">
              <span><strong>Producto:</strong> Cerveza Artesanal IPA 4-Pack (330ml)</span>
              <span><strong>Período:</strong> 52 Semanas Auditadas</span>
              <span><strong>Fecha Emisión:</strong> 2026-10-03</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              1. RESUMEN EJECUTIVO Y HALLAZGOS PRINCIPALES
            </h2>
            <p className="leading-relaxed text-slate-700">
              El análisis econométrico revela que la demanda de la Cerveza Artesanal IPA es altamente elástica (<strong className="font-mono">ε = -4.13</strong>). Operar en el precio promedio histórico de <strong className="font-mono">$14.46</strong> subutiliza la capacidad de rentabilización. Una reducción calculada hacia el precio óptimo analítico de <strong className="font-mono">$12.08 (-16.4%)</strong> incrementa las unidades semanales de 2,453 a 4,120 (+68.0%) e incrementa la utilidad neta semanal de <strong className="font-mono">$1,735 a $5,694 (+228.1%)</strong>, generando una ganancia incremental de <strong className="font-mono">+$3,958 por semana</strong>.
            </p>
          </div>

          {/* Key Econometric Constants Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50 print:bg-white">
              <span className="text-[10px] text-slate-500 font-sans block">Precio Óptimo</span>
              <span className="text-base font-bold text-slate-900">$12.08 USD</span>
            </div>
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50 print:bg-white">
              <span className="text-[10px] text-slate-500 font-sans block">Demanda Óptima</span>
              <span className="text-base font-bold text-slate-900">4,120 u/semana</span>
            </div>
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50 print:bg-white">
              <span className="text-[10px] text-slate-500 font-sans block">Utilidad Óptima</span>
              <span className="text-base font-bold text-emerald-800">$5,694 USD</span>
            </div>
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50 print:bg-white">
              <span className="text-[10px] text-slate-500 font-sans block">Ganancia Incremental</span>
              <span className="text-base font-bold text-emerald-800">+$3,958 (+228.1%)</span>
            </div>
          </div>

          {/* Econometric Regression Specification */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              2. ESPECIFICACIÓN DEL MODELO DE DEMANDA
            </h2>
            <div className="bg-slate-50 print:bg-white border border-slate-200 p-3 rounded font-mono text-xs mb-2">
              <strong>Ecuación OLS Estimada:</strong> Q = 12596.47 - 701.57 · P
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
              <div>R²: 99.4% (R² Aj = 99.4%)</div>
              <div>t(Pendiente): -92.59 (p &lt; 0.0001)</div>
              <div>t(Intercepto): 114.79 (p &lt; 0.0001)</div>
              <div>Durbin-Watson: 1.9991</div>
            </div>
          </div>

          {/* Benchmark Scenarios */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              3. TABLA COMPARATIVA DE ESCENARIOS (SECCIÓN 11)
            </h2>
            <table className="w-full text-left font-mono text-[11px] border-collapse border border-slate-200">
              <thead className="bg-slate-100 print:bg-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200">Escenario</th>
                  <th className="p-2 border border-slate-200 text-right">Precio</th>
                  <th className="p-2 border border-slate-200 text-right">Demanda</th>
                  <th className="p-2 border border-slate-200 text-right">Ingresos</th>
                  <th className="p-2 border border-slate-200 text-right">Costos</th>
                  <th className="p-2 border border-slate-200 text-right">Utilidad</th>
                  <th className="p-2 border border-slate-200 text-right">Var %</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_SCENARIOS.map((sc) => (
                  <tr key={sc.id} className={sc.isOptimal ? 'font-bold bg-amber-50 print:bg-slate-100' : ''}>
                    <td className="p-2 border border-slate-200 font-sans">{sc.nombre}</td>
                    <td className="p-2 border border-slate-200 text-right">${sc.precio.toFixed(2)}</td>
                    <td className="p-2 border border-slate-200 text-right">{sc.demanda.toLocaleString()}</td>
                    <td className="p-2 border border-slate-200 text-right">${sc.ingresos.toLocaleString()}</td>
                    <td className="p-2 border border-slate-200 text-right">${sc.costos.toLocaleString()}</td>
                    <td className="p-2 border border-slate-200 text-right">${sc.utilidad.toLocaleString()}</td>
                    <td className="p-2 border border-slate-200 text-right">{sc.varVsBase > 0 ? `+${sc.varVsBase.toFixed(1)}%` : `${sc.varVsBase.toFixed(1)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Recommendations */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              4. RECOMENDACIONES ESTRATÉGICAS
            </h2>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed">
              <li>
                <strong>Ajuste Gradual de Precio:</strong> Reducir el precio de lista de forma escalonada (3-5% trimestral) hacia el objetivo de $12.08 para no tensionar márgenes de distribuidores.
              </li>
              <li>
                <strong>Defensa del Margen de Contribución:</strong> Con un costo variable medio de $6.21, mantener negociaciones anuales cerradas con proveedores de malta y vidrio.
              </li>
              <li>
                <strong>Empaquetamiento Mixto:</strong> Diseñar packs promocionales con cristalería institucional con descuentos de 12-15% sobre el precio combinado.
              </li>
            </ol>
          </div>

          {/* Signature / Legal footer */}
          <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
            <span>OptiPrice Econometrics Platform · AI Studio</span>
            <span>Documento generado para revisión del Comité Comercial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

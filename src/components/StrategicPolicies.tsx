import React from 'react';
import { BookOpen, ShieldCheck, Scale, Zap, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { BASE_PARAMS } from '../data/econometricData';

export const StrategicPolicies: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <span>Informe Secciones 13, 14 y 15</span>
          <span aria-hidden="true">·</span>
          <span>Guía Ejecutiva de Decisión</span>
          <span aria-hidden="true">·</span>
          <span>Estrategia de Pricing FMCG</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Políticas Estratégicas de Precios y Hoja de Ruta Comercial
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Directrices formales derivadas del análisis econométrico para fijación de precios, respuesta ante competidores y empaquetamiento promocional.
        </p>
      </div>

      {/* 3 Core Strategic Pillars (Section 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar A */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                POLÍTICA 13.A
              </span>
              <Scale className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Lanzamiento y Ajuste: Penetración
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dado que la elasticidad observada es altamente elástica (<strong className="font-mono">|ε| = 4.13 &gt; 1.0</strong>), la teoría microeconómica desaconseja el descremado (skimming).
            </p>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200/60 text-xs text-amber-950">
              <strong>Decisión Óptima:</strong> Fijar el precio objetivo en <span className="font-mono font-bold">$12.08</span> para desbloquear la masa crítica de consumidores en supermercados y capturar 4,120 unidades semanales.
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Regla: Inelástica → Descremado | Elástica → Penetración
          </div>
        </div>

        {/* Pillar B */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-800 tracking-wider uppercase">
                POLÍTICA 13.B
              </span>
              <ShieldCheck className="w-5 h-5 text-indigo-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Respuesta ante Competencia
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              El modelo multivariado confirma que el competidor directo opera con un precio medio de <strong className="font-mono">$14.69</strong>. Se desaconsejan guerras de precios directas a la baja indiscriminada.
            </p>
            <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200/60 text-xs text-indigo-950">
              <strong>Táctica:</strong> Defender la prima de valor artesanal (lúpulo citra, amargor balanceado IBU 55) y aplicar descuentos tácticos transitorios en lugar de rebajas agresivas permanentes.
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Sensibilidad cruzada: +70.14 u por cada $1.00 de aumento rival
          </div>
        </div>

        {/* Pillar C */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                POLÍTICA 13.C
              </span>
              <Zap className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Empaquetamiento Mixto (Bundling)
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Implementación de paquetes mixtos combinando el 4-Pack IPA con cristalería institucional o variedades complementarias de baja rotación.
            </p>
            <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200/60 text-xs text-emerald-950">
              <strong>Descuento Estructurado:</strong> Aplicar entre un <strong>12% y 15%</strong> de descuento sobre el precio combinado de los artículos para aumentar el ticket promedio sin devaluar el SKU estandarte.
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Aumenta margen absoluto por transacción
          </div>
        </div>
      </div>

      {/* Implementation Roadmap (Section 15) */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Hoja de Ruta de Implementación Gradual (Sección 15)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Plan secuencial por trimestres para converger al precio óptimo de $12.08 protegiendo relaciones comerciales con distribuidores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
            <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Fase 1 · Q1</div>
            <div className="font-bold text-slate-900 text-sm">Ajuste Piloto (-4%)</div>
            <div className="text-slate-600 mt-2">
              Bajar precio de lista a <strong>$13.88</strong> en canal Supermercados mediante promociones co-financiadas.
            </div>
            <div className="mt-3 font-mono text-[11px] text-emerald-700 font-semibold">
              +650 u/semana esperadas
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
            <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Fase 2 · Q2</div>
            <div className="font-bold text-slate-900 text-sm">Convergencia (-5%)</div>
            <div className="text-slate-600 mt-2">
              Ajustar a <strong>$13.19</strong> extendiendo la medida a tiendas especializadas y e-commerce directo.
            </div>
            <div className="mt-3 font-mono text-[11px] text-emerald-700 font-semibold">
              +500 u/semana adicionales
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
            <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Fase 3 · Q3</div>
            <div className="font-bold text-slate-900 text-sm">Alineación Final (-8%)</div>
            <div className="text-slate-600 mt-2">
              Estabilización en el precio óptimo definitivo de <strong>$12.08</strong> en toda la red comercial.
            </div>
            <div className="mt-3 font-mono text-[11px] text-emerald-700 font-semibold">
              Total proyectado: 4,120 u
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 relative">
            <div className="text-[10px] font-bold text-emerald-800 uppercase mb-1">Fase 4 · Q4</div>
            <div className="font-bold text-emerald-950 text-sm">Cosecha de Utilidad</div>
            <div className="text-emerald-800 mt-2">
              Consolidación del beneficio económico semanal de <strong>$5,694</strong> (+$3,958 ganancia neta incremental).
            </div>
            <div className="mt-3 font-mono text-[11px] text-emerald-900 font-bold">
              +228.1% vs base
            </div>
          </div>
        </div>
      </div>

      {/* Limitations and Future Requirements (Sections 16 & 17) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Supuestos y Limitaciones Metodológicas (Sección 16)
            </h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong>Supuesto Ceteris Paribus:</strong> Los modelos MCO asumen invariantes las condiciones macroeconómicas (inflación, tipo de cambio e ingresos de los hogares).
            </li>
            <li>
              <strong>Capacidad Instalada de Producción:</strong> Pasar de 2,453 a 4,120 unidades (+68%) exige validar que la planta de elaboración cuente con tanques de fermentación disponibles sin incurrir en horas extra desmedidas.
            </li>
            <li>
              <strong>Estacionalidad Térmica:</strong> Los datos históricos demuestran correlación con la temperatura ambiental (14°C a 30°C). El consumo se expande en verano.
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Información Adicional Requerida (Sección 17)
            </h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong>Matriz de Elasticidad Cruzada de Cartera:</strong> Evaluar si abaratar la IPA 4-Pack canibaliza las ventas de la variedad Amber Ale o Golden Ale.
            </li>
            <li>
              <strong>Costo de Adquisición de Clientes (CAC):</strong> Medir la eficiencia de pauta digital y acuerdos de cabecera de góndola en supermercados.
            </li>
            <li>
              <strong>Tasa de Retención y Valor de Vida (LTV):</strong> Monitorear la recurrencia de compra mensual de los nuevos consumidores incorporados.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

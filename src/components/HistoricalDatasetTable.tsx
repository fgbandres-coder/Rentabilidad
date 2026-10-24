import React, { useState, useMemo } from 'react';
import { Database, Download, Search, ArrowUpDown, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { HISTORICAL_DATA, WeeklyDataRecord } from '../data/econometricData';

export const HistoricalDatasetTable: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [promoFilter, setPromoFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof WeeklyDataRecord>('semana');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Filter and sort data
  const filteredData = useMemo(() => {
    return HISTORICAL_DATA.filter((row) => {
      // Channel filter
      if (channelFilter !== 'all' && row.canalVenta !== channelFilter) return false;
      // Promo filter
      if (promoFilter !== 'all' && row.promocionActiva !== promoFilter) return false;
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesWeek = row.semana.toString().includes(query);
        const matchesPrice = row.precioVentaUSD.toString().includes(query);
        const matchesUnits = row.unidadesVendidas.toString().includes(query);
        const matchesChannel = row.canalVenta.toLowerCase().includes(query);
        if (!matchesWeek && !matchesPrice && !matchesUnits && !matchesChannel) return false;
      }
      return true;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [channelFilter, promoFilter, search, sortField, sortAsc]);

  const handleSort = (field: keyof WeeklyDataRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Semana',
      'Precio_Venta_USD',
      'Unidades_Vendidas',
      'Costo_Variable_Unit',
      'Precio_Competidor_USD',
      'Canal_Venta',
      'Promocion_Activa',
      'Temperatura_C',
      'Ingresos_USD',
      'Costos_Totales_USD',
      'Utilidad_Neta_USD',
      'Margen_Porcentaje',
    ];

    const rows = filteredData.map((r) => [
      r.semana,
      r.precioVentaUSD.toFixed(2),
      r.unidadesVendidas,
      r.costoVariableUnit.toFixed(2),
      r.precioCompetidorUSD.toFixed(2),
      r.canalVenta,
      r.promocionActiva,
      r.temperaturaC,
      r.ingresosUSD,
      r.costosTotalesUSD,
      r.utilidadNetaUSD,
      r.margenPorcentual.toFixed(1),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Cerveza_IPA_4Pack_52_Semanas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header and Summary Cards */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Informe Secciones 3, 4 y 5</span>
              <span aria-hidden="true">·</span>
              <span>52 Semanas Observadas</span>
              <span aria-hidden="true">·</span>
              <span>0% Datos Faltantes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Base de Datos Transaccional Histórica
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Registro completo de las 52 semanas auditadas para el 4-Pack de Cerveza Artesanal IPA en Retail y FMCG.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shadow-xs whitespace-nowrap self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Descargar CSV Completo</span>
          </button>
        </div>

        {/* Statistical Summary Cards (From Section 4 of report) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Precio Promedio
            </span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              $14.46 USD
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              Rango: [$12.90 – $16.00] · σ = 0.85
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Demanda Promedio
            </span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              2,453 unidades
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              Rango: [1,420 – 3,640] · σ = 597
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Costo Variable Medio
            </span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              $6.21 USD
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              Rango: [$5.90 – $6.60] · σ = 0.18
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Precio Competidor
            </span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              $14.69 USD
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              Rango: [$14.00 – $15.60] · σ = 0.46
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por semana, precio, unidades o canal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Canal filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Canal:</span>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-none"
              >
                <option value="all">Todos los Canales (3)</option>
                <option value="Supermercados">Supermercados</option>
                <option value="Tiendas Especializadas">Tiendas Especializadas</option>
                <option value="E-Commerce">E-Commerce</option>
              </select>
            </div>

            {/* Promo filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Promoción:</span>
              <select
                value={promoFilter}
                onChange={(e) => setPromoFilter(e.target.value)}
                className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="Sí">Con Promoción (Sí)</option>
                <option value="No">Sin Promoción (No)</option>
              </select>
            </div>

            <span className="text-xs text-slate-400 font-mono ml-1">
              Mostrando {filteredData.length} de 52 semanas
            </span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold select-none">
              <tr>
                <th
                  onClick={() => handleSort('semana')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Semana</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('precioVentaUSD')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Precio Venta</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('unidadesVendidas')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Unidades</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('costoVariableUnit')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Costo Var.</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('precioCompetidorUSD')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Competidor</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Canal</th>
                <th className="py-3 px-3 text-center">Promo</th>
                <th
                  onClick={() => handleSort('temperaturaC')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Temp °C</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ingresosUSD')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Ingresos</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('utilidadNetaUSD')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Utilidad Neta</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {filteredData.map((row) => {
                const isLoss = row.utilidadNetaUSD < 0;
                return (
                  <tr key={row.semana} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">
                      Semana {row.semana}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">
                      ${row.precioVentaUSD.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">
                      {row.unidadesVendidas.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      ${row.costoVariableUnit.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      ${row.precioCompetidorUSD.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-700">
                      {row.canalVenta}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          row.promocionActiva === 'Sí'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {row.promocionActiva}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {row.temperaturaC}°C
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-800">
                      ${row.ingresosUSD.toLocaleString()}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        isLoss ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      ${row.utilidadNetaUSD.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

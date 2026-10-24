import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroExecutiveSummary } from './components/HeroExecutiveSummary';
import { PricingSimulator } from './components/PricingSimulator';
import { EconometricCharts } from './components/EconometricCharts';
import { SensitivityMatrixView } from './components/SensitivityMatrixView';
import { HistoricalDatasetTable } from './components/HistoricalDatasetTable';
import { StrategicPolicies } from './components/StrategicPolicies';
import { PrintReportModal } from './components/PrintReportModal';
import { BASE_PARAMS, BENCHMARK_SCENARIOS } from './data/econometricData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [simulatorPrice, setSimulatorPrice] = useState<number>(BASE_PARAMS.PRECIO_OPTIMO);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const handleSelectScenarioFromSummary = (scenarioId: string) => {
    const sc = BENCHMARK_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setSimulatorPrice(sc.precio);
    }
    setActiveTab('simulador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToSimulator = () => {
    setActiveTab('simulador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
      {/* Top Bar Navigation (Strict 3-zone Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'resumen' && (
          <HeroExecutiveSummary
            onGoToSimulator={handleGoToSimulator}
            onSelectScenario={handleSelectScenarioFromSummary}
          />
        )}

        {activeTab === 'simulador' && (
          <PricingSimulator
            initialPrice={simulatorPrice}
          />
        )}

        {activeTab === 'curvas' && <EconometricCharts />}

        {activeTab === 'sensibilidad' && <SensitivityMatrixView />}

        {activeTab === 'datos' && <HistoricalDatasetTable />}

        {activeTab === 'politicas' && <StrategicPolicies />}
      </main>

      {/* Clean Footer (No fake engines, no status tickers, strictly unboxed text) */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">OptiPrice Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Cerveza Artesanal IPA 4-Pack (52 Semanas)</span>
            <span aria-hidden="true">·</span>
            <span>FMCG & Retail</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Modelo OLS MCO (R² = 99.4%)</span>
            <span aria-hidden="true">·</span>
            <span>Fecha de Emisión: 2026-10-03</span>
          </div>
        </div>
      </footer>

      {/* Printable Executive Report Modal */}
      <PrintReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}

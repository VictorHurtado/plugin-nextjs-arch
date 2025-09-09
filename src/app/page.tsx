'use client';

import { useEffect, useState } from 'react';
import { PluginRenderer } from '@/components/PluginRenderer';
import { pluginRegistry } from '@/lib/plugin-registry';
import { budgetPlugin } from '@/plugins/budget-plugin';
import { BudgetDetailModal } from '@/components/BudgetDetailModal';

export default function Home() {
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    // Registrar el plugin de presupuestos
    pluginRegistry.register(budgetPlugin);
  }, []);

  // Datos de ejemplo del presupuesto
  const sampleBudget = {
    id: 'BUD-001',
    amount: 5000,
    description: 'Presupuesto de ejemplo para demostración',
    date: new Date().toLocaleDateString()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con plugins */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Mi App con Plugins</h1>
            <PluginRenderer injectionPoint="header" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con plugins */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Herramientas</h2>
              <PluginRenderer injectionPoint="sidebar" />
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Dashboard Principal</h2>
              <p className="text-gray-600 mb-6">
                Esta es la aplicación principal. Los plugins se inyectan en diferentes puntos.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Plugin de Presupuestos</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Haz clic en el botón "Ver Detalle del Presupuesto" para abrir el modal del core.
                  </p>
                  <button
                    onClick={() => setShowDetailModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Ver Detalle del Presupuesto
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Modal de detalle del core */}
      {showDetailModal && (
        <BudgetDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          budget={sampleBudget}
        />
      )}


    </div>
  );
}
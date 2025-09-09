'use client';

import { useState } from 'react';
import { Plugin, PluginContext } from '@/types/plugin';

// Componente del plugin que se inyecta en el modal de detalle
const BudgetModal = ({ context }: { context?: PluginContext }) => {
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [pluginData, setPluginData] = useState('');

  // Obtener datos genéricos desde el contexto
  const data = context?.data;
  const metadata = context?.metadata;

  // Verificar si es un presupuesto basado en los metadatos
  const isBudget = metadata?.type === 'budget';
  const budget = isBudget ? data : null;

  const handlePluginAction = () => {
    setShowPluginModal(true);
  };

  const handlePluginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usar la información genérica en la acción del plugin
    const entityId = metadata?.entityId || 'unknown';
    const entityType = metadata?.type || 'unknown';
    const message = `Acción del plugin ejecutada para ${entityType} ${entityId}: ${pluginData}`;
    alert(message);
    
    // Notificar usando el contexto
    if (context?.notify) {
      context.notify(`Plugin ejecutado para ${entityType} ${entityId}`);
    }
    
    setShowPluginModal(false);
    setPluginData('');
  };

  const handleGenerateReport = () => {
    if (budget) {
      alert(`Generando reporte para presupuesto ${budget.id} - Monto: $${budget.amount} - Descripción: ${budget.description}`);
    } else if (data) {
      alert(`Generando reporte para ${metadata?.type || 'entidad'}: ${JSON.stringify(data)}`);
    } else {
      alert('No hay datos disponibles para generar reporte');
    }
  };

  return (
    <>
      <div className="space-y-3">
        {/* Mostrar información genérica en el plugin */}
        {data && (
          <div className="p-3 bg-gray-50 rounded text-sm">
            <p><strong>Tipo:</strong> {metadata?.type || 'unknown'}</p>
            <p><strong>ID:</strong> {metadata?.entityId || 'unknown'}</p>
            {budget && (
              <>
                <p><strong>Monto:</strong> ${budget.amount}</p>
              </>
            )}
          </div>
        )}
        
        <button
          onClick={handlePluginAction}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Acción del Plugin
        </button>
        
        <button
          onClick={handleGenerateReport}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          📊 Generar Reporte
        </button>
      </div>

      {/* Modal del plugin que se abre sobre el modal de detalle */}
      {showPluginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4">Plugin de Acciones</h3>
            
            {/* Mostrar información genérica en el modal del plugin */}
            {data && (
              <div className="mb-4 p-3 bg-blue-50 rounded">
                <p className="text-sm"><strong>Tipo:</strong> {metadata?.type || 'unknown'}</p>
                <p className="text-sm"><strong>ID:</strong> {metadata?.entityId || 'unknown'}</p>
                {budget && (
                  <>
                    <p className="text-sm"><strong>Monto:</strong> ${budget.amount}</p>
                    <p className="text-sm"><strong>Descripción:</strong> {budget.description}</p>
                  </>
                )}
              </div>
            )}
            
            <form onSubmit={handlePluginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Datos del Plugin:
                </label>
                <input
                  type="text"
                  value={pluginData}
                  onChange={(e) => setPluginData(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ingresa datos del plugin"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Ejecutar
                </button>
                <button
                  type="button"
                  onClick={() => setShowPluginModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// Definición del plugin
export const budgetPlugin: Plugin = {
  id: 'budget-plugin',
  name: 'Gestión de Presupuestos',
  component: BudgetModal,
  injectionPoint: 'budget-detail'
};
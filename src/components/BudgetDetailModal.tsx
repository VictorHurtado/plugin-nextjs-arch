'use client';

import { useState } from 'react';
import { PluginRenderer } from './PluginRenderer';
import { PluginContext } from '@/plugins/shared/types';

interface BudgetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: {
    id: string;
    amount: number;
    description: string;
    date: string;
  };
}

export const BudgetDetailModal = ({ isOpen, onClose, budget }: BudgetDetailModalProps) => {
  if (!isOpen) return null;

  // Crear el contexto genérico para los plugins
  const pluginContext: PluginContext = {
    appData: {},
    notify: (message: string) => alert(message),
    data: budget, // Pasar los datos del presupuesto como 'data' genérico
    metadata: {
      type: 'budget',
      source: 'budget-detail-modal',
      entityId: budget.id
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalle del Presupuesto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Contenido del core */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID:</label>
            <p className="text-gray-900">{budget.id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto:</label>
            <p className="text-gray-900 font-semibold">${budget.amount}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción:</label>
            <p className="text-gray-900">{budget.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha:</label>
            <p className="text-gray-900">{budget.date}</p>
          </div>
        </div>

        {/* Punto de inyección para plugins con contexto genérico */}
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Extensiones:</h3>
          <PluginRenderer injectionPoint="budget-detail" context={pluginContext} />
        </div>
      </div>
    </div>
  );
};
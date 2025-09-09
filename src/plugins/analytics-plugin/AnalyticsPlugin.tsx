'use client';

import { useState } from 'react';
import { PluginContext } from '../shared/types';

// Plugin de Analytics completamente independiente
export const AnalyticsPlugin = ({ context }: { context?: PluginContext }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState('');

  const data = context?.data;
  const metadata = context?.metadata;

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const handleExportAnalytics = () => {
    if (data) {
      const exportData = {
        entity: metadata?.type || 'unknown',
        id: metadata?.entityId || 'unknown',
        data: data,
        timestamp: new Date().toISOString(),
        analytics: analyticsData
      };
      
      alert(`Analytics exportados: ${JSON.stringify(exportData, null, 2)}`);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {/* Información del plugin */}
        {data && (
          <div className="p-3 bg-yellow-50 rounded text-sm">
            <p><strong>�� Analytics Plugin</strong></p>
            <p><strong>Entidad:</strong> {metadata?.type || 'unknown'}</p>
            <p><strong>ID:</strong> {metadata?.entityId || 'unknown'}</p>
          </div>
        )}
        
        <button
          onClick={handleViewAnalytics}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          📈 Ver Analytics
        </button>
        
        <button
          onClick={handleExportAnalytics}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          📤 Exportar Datos
        </button>
      </div>

      {/* Modal de Analytics */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">📊 Analytics Dashboard</h3>
            
            {data && (
              <div className="mb-4 p-3 bg-yellow-50 rounded">
                <p className="text-sm"><strong>Entidad:</strong> {metadata?.type}</p>
                <p className="text-sm"><strong>ID:</strong> {metadata?.entityId}</p>
                <p className="text-sm"><strong>Datos:</strong> {JSON.stringify(data).substring(0, 100)}...</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Datos de Analytics:
              </label>
              <textarea
                value={analyticsData}
                onChange={(e) => setAnalyticsData(e.target.value)}
                className="w-full p-2 border rounded h-20"
                placeholder="Ingresa datos de analytics..."
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleExportAnalytics}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Exportar
              </button>
              <button
                onClick={() => setShowAnalytics(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
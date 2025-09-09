import { ReactNode } from 'react';

// Tipos básicos para plugins
export interface Plugin {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  injectionPoint: 'header' | 'sidebar' | 'main' | 'modal' | 'budget-detail';
}

// Contexto genérico que puede contener cualquier tipo de datos
export interface PluginContext {
  appData: any;
  notify: (message: string) => void;
  // Datos genéricos que pueden ser cualquier cosa
  data?: any;
  // Metadatos adicionales
  metadata?: {
    type?: string;
    source?: string;
    [key: string]: any;
  };
}
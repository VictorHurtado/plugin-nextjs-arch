import { BudgetPlugin } from './BudgetPlugin';
import { Plugin, PluginManifest } from '../shared/types';

// Manifest del plugin
export const manifest: PluginManifest = {
  id: 'budget-plugin',
  name: 'Gestión de Presupuestos',
  version: '1.0.0',
  description: 'Plugin para gestión de presupuestos',
  author: 'Tu Nombre',
  injectionPoints: ['budget-detail'],
  dependencies: [],
  entryPoint: 'BudgetPlugin'
};

// Definición del plugin
export const plugin: Plugin = {
  id: manifest.id,
  name: manifest.name,
  component: BudgetPlugin,
  injectionPoint: 'budget-detail',
  version: manifest.version,
  dependencies: manifest.dependencies
};

// Exportar el componente directamente
export { BudgetPlugin };
export default BudgetPlugin;
import { AnalyticsPlugin } from './AnalyticsPlugin';
import { Plugin, PluginManifest } from '../shared/types';

// Manifest del plugin
export const manifest: PluginManifest = {
  id: 'analytics-plugin',
  name: 'Analytics Dashboard',
  version: '1.0.0',
  description: 'Plugin para análisis y exportación de datos',
  author: 'Tu Nombre',
  injectionPoints: ['budget-detail', 'main'],
  dependencies: [],
  entryPoint: 'AnalyticsPlugin'
};

// Definición del plugin
export const plugin: Plugin = {
  id: manifest.id,
  name: manifest.name,
  component: AnalyticsPlugin,
  injectionPoint: 'budget-detail',
  version: manifest.version,
  dependencies: manifest.dependencies
};

// Exportar el componente
export { AnalyticsPlugin };
export default AnalyticsPlugin;
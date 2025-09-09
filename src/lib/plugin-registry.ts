import { Plugin } from '@/plugins/shared/types';
import { pluginLoader } from './plugin-loader';

class PluginRegistry {
  private plugins: Map<string, Plugin> = new Map();
  private injectionPoints: Map<string, Plugin[]> = new Map();

  // Registrar un plugin usando el loader
  async registerPlugin(manifest: any, component: React.ComponentType<any>) {
    try {
      const plugin = await pluginLoader.loadPlugin(manifest, component);
      this.register(plugin);
      return plugin;
    } catch (error) {
      console.error('Error cargando plugin:', error);
      throw error;
    }
  }

  // Registrar un plugin directamente (método legacy)
  register(plugin: Plugin) {
    this.plugins.set(plugin.id, plugin);
    
    // Agregar a los puntos de inyección
    if (!this.injectionPoints.has(plugin.injectionPoint)) {
      this.injectionPoints.set(plugin.injectionPoint, []);
    }
    this.injectionPoints.get(plugin.injectionPoint)!.push(plugin);
    
    console.log(`Plugin ${plugin.name} registrado en ${plugin.injectionPoint}`);
  }

  // Obtener plugins por punto de inyección
  getPluginsByInjectionPoint(point: string): Plugin[] {
    return this.injectionPoints.get(point) || [];
  }

  // Obtener todos los plugins
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  // Remover un plugin
  unregister(pluginId: string) {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      this.plugins.delete(pluginId);
      const pointPlugins = this.injectionPoints.get(plugin.injectionPoint);
      if (pointPlugins) {
        const index = pointPlugins.findIndex(p => p.id === pluginId);
        if (index > -1) {
          pointPlugins.splice(index, 1);
        }
      }
    }
  }
}

// Instancia singleton
export const pluginRegistry = new PluginRegistry();
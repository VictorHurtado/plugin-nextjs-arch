import { Plugin, PluginManifest } from '@/plugins/shared/types';

// Sistema de carga dinámica de plugins
export class PluginLoader {
  private loadedPlugins: Map<string, Plugin> = new Map();
  private pluginManifests: Map<string, PluginManifest> = new Map();

  // Cargar un plugin desde su manifest
  async loadPlugin(manifest: PluginManifest, pluginComponent: React.ComponentType<any>): Promise<Plugin> {
    // Verificar dependencias
    await this.checkDependencies(manifest.dependencies);

    // Crear el plugin
    const plugin: Plugin = {
      id: manifest.id,
      name: manifest.name,
      component: pluginComponent,
      injectionPoint: manifest.injectionPoints[0], // Por simplicidad, tomamos el primero
      version: manifest.version,
      dependencies: manifest.dependencies
    };

    // Guardar el plugin y su manifest
    this.loadedPlugins.set(manifest.id, plugin);
    this.pluginManifests.set(manifest.id, manifest);

    console.log(`Plugin ${manifest.name} v${manifest.version} cargado exitosamente`);
    return plugin;
  }

  // Verificar dependencias
  private async checkDependencies(dependencies: string[]): Promise<void> {
    for (const dep of dependencies) {
      if (!this.loadedPlugins.has(dep)) {
        throw new Error(`Dependencia requerida no encontrada: ${dep}`);
      }
    }
  }

  // Obtener plugin por ID
  getPlugin(id: string): Plugin | undefined {
    return this.loadedPlugins.get(id);
  }

  // Obtener todos los plugins
  getAllPlugins(): Plugin[] {
    return Array.from(this.loadedPlugins.values());
  }

  // Obtener plugins por punto de inyección
  getPluginsByInjectionPoint(injectionPoint: string): Plugin[] {
    return this.getAllPlugins().filter(plugin => plugin.injectionPoint === injectionPoint);
  }

  // Obtener manifest de un plugin
  getPluginManifest(id: string): PluginManifest | undefined {
    return this.pluginManifests.get(id);
  }

  // Desactivar un plugin
  unloadPlugin(id: string): boolean {
    return this.loadedPlugins.delete(id) && this.pluginManifests.delete(id);
  }

  // Listar todos los manifests
  getAllManifests(): PluginManifest[] {
    return Array.from(this.pluginManifests.values());
  }
}

// Instancia singleton
export const pluginLoader = new PluginLoader();
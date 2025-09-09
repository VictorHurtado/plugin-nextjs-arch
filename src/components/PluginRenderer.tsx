'use client';

import { pluginRegistry } from '@/lib/plugin-registry';
import { Plugin, PluginContext } from '@/types/plugin';

interface PluginRendererProps {
  injectionPoint: 'header' | 'sidebar' | 'main' | 'modal' | 'budget-detail';
  context?: PluginContext;
}

export const PluginRenderer = ({ injectionPoint, context }: PluginRendererProps) => {
  const plugins = pluginRegistry.getPluginsByInjectionPoint(injectionPoint);
  
  // Debug log
  console.log(`PluginRenderer - injectionPoint: ${injectionPoint}, plugins found:`, plugins);

  if (plugins.length === 0) {
    return null;
  }

  return (
    <div className={`plugin-container plugin-${injectionPoint}`}>
      {plugins.map((plugin: Plugin) => {
        const PluginComponent = plugin.component;
        return (
          <div key={plugin.id} className="plugin-item">
            <PluginComponent context={context} />
          </div>
        );
      })}
    </div>
  );
};
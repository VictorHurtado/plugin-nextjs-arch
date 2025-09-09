// Tipos compartidos que los plugins pueden usar
export interface Plugin {
    id: string;
    name: string;
    component: React.ComponentType<any>;
    injectionPoint: string;
    version?: string;
    dependencies?: string[];
  }
  
  export interface PluginContext {
    appData: any;
    notify: (message: string) => void;
    data?: any;
    metadata?: {
      type?: string;
      source?: string;
      [key: string]: any;
    };
  }
  
  export interface PluginManifest {
    id: string;
    name: string;
    version: string;
    description: string;
    author: string;
    injectionPoints: string[];
    dependencies: string[];
    entryPoint: string;
  }
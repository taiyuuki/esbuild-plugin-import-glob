import fastGlob from 'fast-glob';
import { Plugin } from 'esbuild';

interface EsbuildPluginImportGlobOptions {
  prefix: string
}

function resolvePath(path: string, prefix: string | undefined){
  return prefix ? path.replace(`${prefix}:`, '') : path
}

const EsbuildPluginImportGlob = (options?: EsbuildPluginImportGlobOptions): Plugin => ({
  name: 'require-context',
  setup: (build) => {
    const prefix = options?.prefix
    build.onResolve({ filter: /\*/ }, async (args) => {
      if (args.resolveDir === '') {
        return; // Ignore unresolvable paths
      }

      return {
        path: resolvePath(args.path, prefix),
        namespace: 'import-glob',
        pluginData: {
          resolveDir: resolvePath(args.resolveDir, prefix),
        },
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'import-glob' }, async (args) => {
      const files = (
        await fastGlob(args.path, {
          cwd: args.pluginData.resolveDir,
        })
      ).sort();

      let importerCode = `
        ${files
          .map((module, index) => `import * as module${index} from '${module}'`)
          .join(';')}

        const modules = [${files
          .map((module, index) => `module${index}`)
          .join(',')}];

        export default modules;
        export const filenames = [${files
          .map((module, index) => `'${module}'`)
          .join(',')}]
      `;

      return { contents: importerCode, resolveDir: args.pluginData.resolveDir };
    });
  },
});

export = EsbuildPluginImportGlob;

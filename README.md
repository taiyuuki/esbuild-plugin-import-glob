# esbuild-plugin-import-glob

A esbuild plugin which allows to import multiple files using the glob syntax.

Forked from [`esbuild-plugin-import-glob`](https://github.com/thomaschaaf/esbuild-plugin-import-glob)

Changes in this fork: Prefix the path of the import module to declare types.

## Usage

1. Install this plugin in your project:

   ```sh
   npm install --save-dev @taiyuuki/esbuild-plugin-import-glob
   ```

2. Add this plugin to your esbuild build script:

   ```diff
   +import importGlobPlugin from 'esbuild-plugin-import-glob'
    ...
    esbuild.build({
      ...
      plugins: [
   +    ImportGlobPlugin.default(),
      ],
    })
   ```

3. Import

   ```ts
   import migrationsArray from 'glob:./migrations/**/*';
   
   migrationsArray[0].default;
   ```

   ```ts
   import * as migrations from 'glob:./migrations/**/*';

   const { default: migrationsArray, filenames } = migrations;
   ```


4.  Example of declaration type

   ```ts
   // types.d.ts
   declare module 'glob:./migrations/*' {
       interface Example { /*  */ }
       const examples: { default: Example }[]
       export default examples
   }
   ```

   
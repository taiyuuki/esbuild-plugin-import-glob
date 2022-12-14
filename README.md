# esbuild-plugin-import-glob

A esbuild plugin which allows to import multiple files using the glob syntax.

Forked from [`esbuild-plugin-import-glob`](https://github.com/thomaschaaf/esbuild-plugin-import-glob)

Change in this fork: Prefix the path of the import to declare types.

## Usage

Install this plugin in your project:

```sh
npm install --save-dev @taiyuuki/esbuild-plugin-import-glob
```

Add this plugin to your esbuild build script:

```diff
+import importGlobPlugin from '@taiyuuki/esbuild-plugin-import-glob'
 ...
 esbuild.build({
   ...
   plugins: [
+    importGlobPlugin(),
   ],
 })
```

Import

```ts
// @ts-ignore
import migrationsArray from './migrations/**/*'

migrationsArray[0].default
```

```ts
// @ts-ignore
import * as migrations from './migrations/**/*'

const { default: migrationsArray, filenames } = migrations;
```

### Prefix

If you don't want to use `@ts-ignore`, you can type declare the module, but ambient module declaration cannot specify relative module name.

```ts
// Error: Ambient module declaration cannot specify relative module name. ts(2436)
declare module './migrations/*' {
    
}
```

 You can add a prefix to avoid it.

```ts
import importGlobPlugin from '@taiyuuki/esbuild-plugin-import-glob'
import esbuild from 'esbuild'

esbuild.build({
    plugins: [
        importGlobPlugin({
            prefix: 'glob'
        })
    ]
})
```

Import with the prefix.

```ts
// Note the colon after prefix
import migrationsArray from 'glob:./migrations/**/*'

migrationsArray[0].default
```

Example of module declaration.

```ts
// types.d.ts
declare module 'glob:./migrations/*' {
    interface Example { /*  */ }
    const examples: { default: Example }[]
    export default examples
}
```


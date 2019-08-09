import { Application } from 'typedoc';

const app = new Application({
  categoryOrder: '*',
  experimentalDecorators: true,
  ignoreCompilerErrors: true,
  logger: 'none',
  theme: 'markdown',
  readme: './tools/README.md',
  excludePrivate: true,
  excludeProtected: true,
  excludeNotExported: true,
  target: 'ES6',
  tsconfig: './tsconfig.js',
});

const input = app.expandInputFiles(['src']);
const project = app.convert(input);

if (project) {
  app.generateDocs(project, 'docs');
}

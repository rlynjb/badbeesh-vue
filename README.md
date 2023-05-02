# NOTES
## Front end architectures
### Classic approach
- https://javascript.plainenglish.io/frontend-architectures-classic-approach-no-architecture-d3c839e46403
### Simple Modular
- https://javascript.plainenglish.io/frontend-architectures-simple-modular-approach-7f3b3efe0ecd
### Featured Slice
- https://blog.bitsrc.io/understand-the-most-reliable-frontend-architecture-c8578e3166b
### How to build a Component Design System
- https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833
### 7 Best Practices for Implementing a Micro Frontend Architecture
- https://blog.bitsrc.io/7-best-practices-for-implementing-a-micro-frontend-architecture-36cd39a9046
### Integrate Tailwind CSS and Storybook
- ref: https://storybook.js.org/recipes/tailwindcss


# badbeesh

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

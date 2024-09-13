## sample-ui-react

## Preface

Project web resource ( HTML / CSS / JS ) based on [React](https://github.com/facebook/react) / [TypeScript](https://www.typescriptlang.org/) / [shadcn/ui](https://ui.shadcn.com/). It assumes the SPA ( Single Page Application ) model.

This is a simple implementation sample using the above libraries, not the library.

We expect one of the following as an API server for sample confirmation.

- [sample-boot-jpa](https://github.com/jkazama/sample-boot-jpa)

#### Getting Started

Frontend Start (VSCode DevContainer)
It is necessary to do the following step.

- Check Instablled Docker.
- Check Instablled VSCode with DevContainer Extension.
- API Server Started.

Do the preparations for this sample in the next step.

- You move to the cloned `sample-ui-react` directory.
- Run command `code .`
- Choose Open Container

Do the dev server start in the next step.

- Open VSCode Terminal.
- `npm run dev`
- Open Browser with `http://localhost:3000`
  - User Login ID/Pass. `sample` / `sample`

#### Use policy of React

- BtoB management sites in mind.
- [Vite](https://github.com/vitejs/vite) is used as it is based on SPA
- Layout in shadcn/ui and [Tailwind CSS](https://tailwindcss.com/)
- State management is used by React Hooks, [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod), [Jotai](https://jotai.org/) and [TanStackQuery](https://tanstack.com/query/latest).
- Page transitions use [React Router](https://reactrouter.com/en/main).

#### Resource

Refer to the following for the package / resource constitution.

```
+ .devcontainer      … DevContainer Related definitions
+ .vscode            … VS Code Related Definitions
+ public             … Vite Public Resources (Web Root)
+ src                … Vite Development Resources
- .editorconfig      … Format Auto-Formatting Rules (EditorConfig)
- .env               … Environment Variable (Production)
- .env.development   … Environment Variable (Development)
- .eslintrc.js       … ES Lint Rule
- components.json    … shadcn/ui Related Definitions
- index.html         … Vite SPA Entry file
- package.json       … NPM Package
- postcss.config.cjs … CSS-Related Definitions
- tailwind.confg.js  … TailwindCSS Related Definitions
- tsconfig.json      … TypeScript Related Definitions
- vite.config.ts     … Vite Related Definitions
```

```
/src

+ assets         … Static Resources where references via code.
+ components     … UI Component Implementation (global domain)
  + auth         … UI Components for Authentication
  + layout       … UI Components for Site Layouts
  + ui           … UI components using shadcn/ui
+ features       … Feature (Domain) Specific Implementation
  + *domain*     … Specific Domain Implementation
    + components … UI Component Implementation
    + hooks      … Hooks Implementation for Business Processes
      + api      … API Integration Implementation with Backend
    + types      … Type Definitions
+ hooks          … Hooks Implementation for Business Processes (global domain)
+ lib            … Simple Libraries that are not Dependent on a Framework
+ providers      … Infrastructure Provider
  - app.ts       … React Common Processes
  - query.tsx    … TanStack Query Common Processes
+ routes         … Routing Definition using ReactRouter.
+ types          … Type Definitions (global domain)
- App.tsx        … Root Component
- index.css      … Standard CSS Definition
- main.tsx       … SPA Entry Implementation
- vite-env.d.ts  … TypeScript Extension Definition for Vite
```

### License

The license of this sample includes a code and is all _MIT License_.
Use it as a base implementation at the time of the project start using Spring Boot.

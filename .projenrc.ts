import { vscode, web } from "projen";
import {
  EndOfLine,
  TypeScriptJsxMode,
  TypeScriptModuleResolution,
  UpgradeDependenciesSchedule,
} from "projen/lib/javascript";
const project = new web.ReactTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "projen-vite-react-ts",
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
  projenrcTs: true,
  prettier: true,
  prettierOptions: {
    settings: {
      endOfLine: EndOfLine.AUTO,
    },
  },

  deps: ["@vitejs/plugin-react@^3.1.0", "vite@^4.4.0"],
  devDeps: [],

  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },

  tsconfigDev: {
    compilerOptions: {
      module: "CommonJS",
      jsx: TypeScriptJsxMode.REACT,
    },
    include: ["vite*.ts", "src/**/*.tsx"],
  },
  tsconfig: {
    compilerOptions: {
      module: "es2020",
      moduleResolution: TypeScriptModuleResolution.NODE,
      lib: ["dom", "dom.iterable", "esnext"],
      jsx: TypeScriptJsxMode.REACT_JSX,
    },
    include: ["src/**/*.tsx"],
  },
});

const code = new vscode.VsCode(project);
code.extensions.addRecommendations(
  "dbaeumer.vscode-eslint",
  "esbenp.prettier-vscode",
);
code.settings.addSettings({
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.automationProfile.windows": "PowerShell",
});
code.launchConfiguration.addConfiguration({
  type: "chrome",
  request: "launch",
  name: "Launch Program",
  url: "http://localhost:8600",
  webRoot: "${workspaceFolder}/src",
});

new vscode.DevContainer(project, {
  dockerImage: {
    image: "mcr.microsoft.com/devcontainers/typescript-node:20",
  },
  vscodeExtensions: [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "mutantdino.resourcemonitor",
  ],
});

project.removeTask("dev");
project.addTask("dev", {
  description: "Starts the react application",
  exec: `npx vite`,
});

project.removeTask("build");
project.addTask("build", {
  description: "Starts the react application",
  exec: `npx vite build`,
});

project.synth();

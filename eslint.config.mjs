import globals from "globals";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: ["commonjs", "es2021", "node"]}},
  {languageOptions: { globals: globals.node }},
];
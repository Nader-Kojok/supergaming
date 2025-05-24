import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable non-critical rules
      "@typescript-eslint/no-unused-vars": "warn", // Downgrade to warning
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade to warning
      "react-hooks/exhaustive-deps": "warn", // Downgrade to warning
      
      // Keep critical rules enabled
      "react/no-unescaped-entities": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-key": "error",
      "react/prop-types": "error",
      "no-console": "warn",
      "no-debugger": "error"
    }
  }
];

export default eslintConfig;

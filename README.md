# Pace Calculator

This project is a simple and interactive pace calculator built with React, TypeScript, and Vite. It allows users to calculate their running pace based on distance and time, with support for both metric (kilometers) and imperial (miles) units.

![alt text](<Screenshot 2025-05-10 at 00.08.12@2x.png>)

## Features

- Three calculation modes:
  - Calculate Pace: Determine your pace based on distance and time
  - Calculate Time: Estimate your finish time based on distance and target pace
  - Riegel's Formula: Predict race times for new distances based on previous race results
- Support for both metric (kilometers) and imperial (miles) units with automatic conversion
- Pre-defined common race distances (1km, 5km, 10km, Half Marathon, Marathon, etc.)
- Custom distance input with decimal support
- User-friendly time picker with dropdowns for hours, minutes, and seconds
- Dark mode support with system preference detection and manual toggle
- Real-time calculations with automatic unit conversion
- Responsive design with modern UI components

## Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling the application with utility-first CSS.

## Getting Started

To run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd pace-calculator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## License

This project is open-source and available under the [MIT License](LICENSE).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

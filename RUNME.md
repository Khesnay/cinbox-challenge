# Movie Browser

A React-based movie browsing application built with TypeScript, Redux Toolkit, and Vite.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Redux Toolkit
- **Styling**: Sass
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Testing**: Vitest
- **Backend**: Express.js
- **HTTP Client**: Axios

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd movie-browser
```

2. Install dependencies:

```bash
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

This will run the Express server (likely on `http://localhost:3000`)

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🧪 Testing

### Run Tests

Execute the test suite with Vitest:

```bash
npm run test
```

### Run Tests with Coverage

Generate test coverage report:

```bash
npm run coverage
```

### Test Options

- **Watch mode**: Tests run automatically when files change (default with `npm run test`)
- **Run once**: Use `npx vitest run` for a single test run
- **Specific test file**: `npx vitest run src/path/to/test.test.ts`

## 🔍 Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Fix Linting Issues

Auto-fix linting issues where possible:

```bash
npm run lint -- --fix
```

## 📁 Project Structure

```
movie-browser/
├── src/
│   ├── components/        # React components
│   ├── store/            # Redux store and slices
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   └── ...
├── server.ts             # Express server
├── package.json
└── ...
```

## Available Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start development server       |
| `npm run build`    | Build for production           |
| `npm run lint`     | Run ESLint                     |
| `npm run test`     | Run tests with Vitest          |
| `npm run coverage` | Run tests with coverage report |

### Hot Reloading

The development server supports hot module replacement (HMR) for instant updates.

### TypeScript

This project uses TypeScript with strict mode enabled. Make sure to:

- Define proper types for props and state
- Use the `useAppDispatch` and `useAppSelector` hooks for Redux

### Testing

- Tests are written using Vitest
- Place test files next to components with `.test.ts` or `.test.tsx` extension
- Use the `describe`, `it`, `expect` pattern for test structure

### Styling

- Uses Sass for styling
- Component styles should be in `.scss` files
- Follow BEM methodology for CSS class naming

## Key Dependencies

### Runtime Dependencies

- `react` & `react-dom` - React framework
- `@reduxjs/toolkit` - State management
- `react-redux` - React Redux bindings
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `express` - Backend server
- `sass` - CSS preprocessor

### Development Dependencies

- `vitest` - Testing framework
- `typescript` - Type checking
- `eslint` - Code linting
- `vite` - Build tool
- `@vitejs/plugin-react` - Vite React plugin

## Common Issues

Not every modules are tested.
Do not adapt properly to mobile and small tablets.

### Port Already in Use

If the development server fails to start, make sure port 3000 (or your configured port) is available.

### TypeScript Errors

Run `npx tsc --noEmit` to check for TypeScript errors without building.

### Test Failures

Ensure all dependencies are installed and try clearing the cache:

```bash
npm run test -- --reporter=verbose
```

## Env Setup

Create a `.env` file in the root directory if needed for API keys or configuration:

```env
VITE_API_BASE_URL=your_api_url
VITE_API_KEY=your_api_key
```

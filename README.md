# Shanti Niketan Public School

School website built with React and Vite, with an Express API and MongoDB Atlas for published student results.

## Project layout

```text
backend/          Express API and MongoDB models
frontend/         React application, Vite config, and public images
  public/img/     Site images served at /img/*
  src/            React components and styles
.env              Local Atlas credentials (ignored by Git)
```

## Requirements

- Node.js 22.12 or newer
- npm
- MongoDB Atlas database access for the results lookup

## Development

```sh
npm install
npm run dev
```

Vite runs at `http://127.0.0.1:5174` and proxies `/api` requests to the Express API on port 3001. Use `API_PORT` to change the API port and update the Vite proxy target if needed.

## Production

```sh
npm run build
NODE_ENV=production npm start
```

The production server serves the built frontend and API on `PORT` (default 5173). Configure `MONGODB_URI`, `MONGODB_USERNAME`, `MONGODB_PASSWORD`, and `MONGODB_DATABASE` as private environment variables in the hosting platform.

## Code style

```sh
npm run format
npm run format:check
```

Prettier settings are in `.prettierrc.json`. See [RESULTS_SETUP.md](./RESULTS_SETUP.md) for the Atlas collection schema and lookup details.

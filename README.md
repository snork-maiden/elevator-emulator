# Elevator Emulator

An SPA built with Vue 3 (Composition API) and Pinia that emulates an elevator system.

## Features:

- **Basic Operation**: Moves to called floor, waits for 3 seconds, and returns to idle.
- **Queue System**: Processes multiple calls sequentially.
- **State Persistence**: Resumes state after page reload.
- **Scalability**: Easily adjustable number of floors and elevators.
- **Elevator Display**: Shows direction and target floor.

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

import { App } from './app';

async function main () {
    const app = new App(3100);
    await app.listen()
}

main();
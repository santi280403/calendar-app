import dontenv from 'dotenv';
dontenv.config();


import { App } from './app';

import './database';

async function main () {
    const app = new App(3100);
    await app.listen()
}

main();
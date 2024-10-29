import { ROOT_PATH } from './config.js';
import Koa from 'koa';
import Static from 'koa-static';
export function createServe(port) {
    const serve = new Koa();
    serve.use(Static(ROOT_PATH));
    serve.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

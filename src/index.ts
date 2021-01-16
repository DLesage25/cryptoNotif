// @ts-nocheck

import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.map = function (a: any, route: any) {
    route = route || '';
    for (var key in a) {
        switch (typeof a[key]) {
            case 'object':
                app.map(a[key], route + key);
                break;
            case 'function':
                app[key](route, a[key]);
                break;
        }
    }
};

app.map(routes);

app.listen(3000, () => console.log('listening - 3000'));

export default app;

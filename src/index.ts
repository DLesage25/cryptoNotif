// @ts-nocheck

import express from 'express';
import routes from './routes';

const server = express();

server.use(express.json());

server.map = function (a: any, route: any) {
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

server.map(routes);

// server.listen(3000, () => console.log('listening - 3000'));

export default server;

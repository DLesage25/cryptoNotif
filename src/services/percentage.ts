import { Request, Response } from 'express';
import { pushRequest } from '../utils';

const post = (req: Request, res: Response) => {
    const { body } = req;
    const { currency, percent, currentPrice, exchange, direction } = body;

    const message = `${currency} is now at ${currentPrice} on ${exchange}`;

    pushRequest.post('', {
        title: `${currency} ${
            direction === 'above' ? 'increased' : 'decreased'
        } by ${percent}%`,
        body: message,
    });
    res.send(true);
};

const get = (req: Request, res: Response) => res.send('yep');

export default {
    post,
    get,
};

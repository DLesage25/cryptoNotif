import axios from 'axios';

export const pushRequest = axios.create({
    baseURL: 'https://push.techulus.com/api/v1/notify',
    headers: { 'x-api-key': process.env.PUSH_NOTIFICATION_TOKEN },
});

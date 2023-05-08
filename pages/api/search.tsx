import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const { ES_HOST, ES_USER, ES_PASSWORD, ES_INDEX } = process.env;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', `Basic ${Buffer.from(`${ES_USER}:${ES_PASSWORD}`).toString('base64')}`);
    try {
        const data = await fetch(`${ES_HOST}/${ES_INDEX}/_search`, {
            method: req.method,
            headers,
            body: req.body,
        });
        const response = await data.json();
        res.status(200).json({ ...response });
    } catch (error) {
        res.status(500).json({ error });
    }
}

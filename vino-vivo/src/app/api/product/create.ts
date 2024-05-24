import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { data } = await axios.post('http://localhost:8082/product/create', {
                id: 0,
                ...req.body,
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
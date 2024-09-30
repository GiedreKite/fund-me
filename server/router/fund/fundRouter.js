import express from 'express';
import { connection } from '../../db.js';

export const fundRouter = express.Router();

fundRouter.post('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(401).json({
            status: 'error',
            msg: 'Aukoti galima tik prisijungusiems vartotojams',
        });
    }

    const { fundId } = req.body;

    if (typeof fundId !== 'number'
        || !Number.isInteger(fundId)
        || fundId < 1
    ) {
        return res.status(400).json({
            status: 'error',
            msg: 'Aukos ID turi buti teigiamas sveikasis skaicius',
        });
    }

    try {
        const sql = 'SELECT * FROM funders WHERE user_id = ? AND fund_id = ?;';
        const [result] = await connection.execute(sql, [req.user.id, fundId]);

        if (result.length !== 0) {
            return res.status(400).json({
                status: 'error',
                msg: 'Patiktukas jau buvo uzfiksuotas',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Nepavyko uzfiksuoti patiktuko',
        });
    }

    try {
        const sql = 'INSERT INTO funders (user_id, fund_id) VALUES (?, ?);';
        const [result] = await connection.execute(sql, [req.user.id, fundId]);

        if (result.affectedRows !== 1) {
            return res.status(500).json({
                status: 'error',
                msg: 'Nepavyko uzfiksuoti patiktuko',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Nepavyko uzfiksuoti patiktuko',
        });
    }

    return res.status(201).json({
        status: 'success',
    });
});
import express from 'express';
import { connection } from '../../db.js';

export const fundsListDeleteRouter = express.Router();


fundsListDeleteRouter.delete('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.json({
            status: 'error',
            msg: 'Patiktu lokaciju sarasas galimas tik regitruotiems ir prisijungusiems vartotojams',
        });
    }
    const funderId = req.body.id; 

    if (!funderId) {
        return res.status(400).json({ 
            status: 'error',
            msg: 'Id parametras privalomas',
        });
    }

    try {
        const sql = 'DELETE FROM funders WHERE id = ?;';
        const result = await connection.execute(sql, [req.funderId]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko panaikinimo proceso, pabandykite veliau',
        });
    }


    return res

        .json({
            status: 'success',
            msg: 'Buvo sekmingai panaikinta',
        });
});



import express from 'express';
import { connection } from '../../db.js';
import { isNonEmptyString } from '../../lib/isValid.js';

export const fundsAPIrouter = express.Router();

fundsAPIrouter.get('/', getFunds);
fundsAPIrouter.post('/', postFunds);

async function getFunds(req, res) {
    const sql = `
        SELECT funds.id as id, name, img, sumtotal, sum, about
        FROM funds;`;
    let dataFromServer = null;

    try {
        dataFromServer = await connection.execute(sql);
    } catch (error) {
        dataFromServer = [[]];
    }

    return res.json({
        status: 'success',
        data: dataFromServer[0],
    });
}

async function postFunds(req, res) {
    const { name, img, sumtotal, sum, about } = req.body;
   

    const validName = isNonEmptyString(name);
    const validImg = isNonEmptyString(img);
    const validSumtotal = isNonEmptyString(sumtotal);
    const validSum = isNonEmptyString(sum);
    const validAbout = isNonEmptyString(about);


    if (!validName || !validImg || !validSumtotal || !validSum || !validAbout) {
        return res.json({
            status: 'error',
            msg: 'Truksta privalomos informacijos',
        });
    }


    
        try {
            const sql = 'INSERT INTO funds ( name, img, sumtotal, sum, about) VALUE (?, ?, ?, ?, ?);';
            const [insertResult] = await connection.execute(sql, [name, img, sumtotal, sum, about]);

            if (insertResult.affectedRows !== 1) {
                return res.json({
                    status: 'error',
                    msg: 'Nepavyko sukurti aukos iraso',
                });
            }

        } catch (error) {
            console.log(error);

            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti aukos iraso, pabandykite vėliau',
            });
        }


    return res.json({
        status: 'success',
        msg: 'Nauja auka uzregistruota',
    });
}
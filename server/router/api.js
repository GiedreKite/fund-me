import express from 'express';
import { fundsAPIrouter } from './funds/funds.js';
import { registerAPIrouter } from './register/register.js';
import { loginAPIrouter } from './login/login.js';
import { logoutAPIrouter } from './logout/logout.js';
import { fundsListRouter } from './funds-list/fundsList.js';
import { fundRouter } from './fund/fundRouter.js';
import { fundsListDeleteRouter } from './funds-list/fundsListDelete.js';

export const apiRouter = express.Router();

apiRouter.use('/register', registerAPIrouter);
apiRouter.use('/login', loginAPIrouter);
apiRouter.use('/logout', logoutAPIrouter);
apiRouter.use('/funds', fundsAPIrouter);
apiRouter.use('/funds-list', fundsListRouter);
apiRouter.use('/funds-list', fundsListDeleteRouter);
apiRouter.use('/fund', fundRouter);

apiRouter.all('/', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Issirink konkretu API endpointa',
    });
});
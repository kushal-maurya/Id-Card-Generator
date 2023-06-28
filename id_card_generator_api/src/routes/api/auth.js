import {Router} from 'express';

import {detail, login, logout, register} from '../../controllers';

// eslint-disable-next-line new-cap
const auth = Router();

auth.route('/register').post(register);
auth.route('/login').post(login);
auth.route('/detail').get(detail);
auth.route('/logout').delete(logout);

export default auth;

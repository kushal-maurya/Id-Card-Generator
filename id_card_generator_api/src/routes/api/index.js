import {Router} from 'express';
import auth from './auth';

const urlpatterns = new Map([['/auth', auth]]);

// eslint-disable-next-line new-cap
const api = Router();

urlpatterns.forEach((router, pattern) => {
  api.use(pattern, router);
});

export default api;

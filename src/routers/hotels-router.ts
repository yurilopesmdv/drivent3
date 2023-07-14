import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { getHotels } from '../controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter.use(authenticateToken);
hotelsRouter.get('/', getHotels);

export { hotelsRouter };

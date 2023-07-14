import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { getHotels, getHotelsWithRooms } from '../controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter.use(authenticateToken);
hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };

import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';
import hotelService from '../services/hotels-service/index';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.getHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'PaymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

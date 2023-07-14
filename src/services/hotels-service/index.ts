import { notFoundError } from '../../errors/not-found-error';
import { paymentRequired } from '../../errors/paymente-required-error';
import enrollmentRepository from '../../repositories/enrollment-repository/index';
import hotelRepository from '../../repositories/hotel-repository/index';
import ticketsRepository from '../../repositories/tickets-repository/index';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired();
  }
  const hotels = await hotelRepository.getHotels();
  if (hotels.length === 0) throw notFoundError();
  return hotels;
}

const hotelService = {
  getHotels,
};

export default hotelService;

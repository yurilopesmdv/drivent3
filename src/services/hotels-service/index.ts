import { notFoundError } from '../../errors/not-found-error';
import { paymentRequired } from '../../errors/paymente-required-error';
import enrollmentRepository from '../../repositories/enrollment-repository/index';
import hotelRepository from '../../repositories/hotel-repository/index';
import ticketsRepository from '../../repositories/tickets-repository/index';

async function validateRules(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired();
  }
}

async function getHotels(userId: number) {
  await validateRules(userId);
  const hotels = await hotelRepository.getHotels();
  if (hotels.length === 0) throw notFoundError();
  return hotels;
}

async function getHotelWithRooms(userId: number, hotelId: number) {
  await validateRules(userId);
  const hotel = await hotelRepository.getRoomByHotelId(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelService = {
  getHotels,
  getHotelWithRooms,
};

export default hotelService;

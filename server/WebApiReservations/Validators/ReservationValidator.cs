using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using WebApiReservations.Models;
using System.Linq;
namespace WebApiReservations.Validators
{
    public class ReservationValidator
    {
        private ReservationContext _db;

        public ReservationValidator(ReservationContext db)
        {
            this._db = db;
        }

        public async Task<ValidationResult> Validate(Reservation reservation)
        {
            //check if room exist
            var room = await _db.Rooms
                .Include(x => x.Reservations)
                .FirstOrDefaultAsync(x => x.RoomId == reservation.RoomId);
            if(room == null)
                return new ValidationResult($"Room with roomId: {reservation.RoomId} does not exist.");
            else
            {
                var overlap = CheckIfReservationOverlapWithExisting(reservation, room.Reservations);
                if (overlap)
                {
                    return new ValidationResult(
                        $"Room with roomId: {reservation.RoomId} between {reservation.From} and {reservation.To} is not fully available.");
                }
            }
            var person = await _db.Persons
                .Include(x => x.Reservations)
                .FirstOrDefaultAsync(x => x.PersonId == reservation.PersonId);
            
            if(person == null)
                return new ValidationResult($"Person with id: {reservation.PersonId} does not exist.");
            else{
                //person is not available when person has other reservation in the same time
                var overlap = CheckIfReservationOverlapWithExisting(reservation, person.Reservations);
                if(overlap){
                    return new ValidationResult(
                        $"Person with id: {person.PersonId} is not fully available."
                    );
                }
            }

            return new ValidationResult("");
        }

        private static bool CheckIfReservationOverlapWithExisting(Reservation reservation, IEnumerable<Reservation> reservationsToScreen)
        {            
            return reservationsToScreen.Any(x =>
                                reservation.From >= x.From && reservation.From < x.To ||// start is between existsing reservation
                                reservation.To > x.From && reservation.To <= x.To ||// end is between existing reservation
                                reservation.From <= x.From && reservation.To >= x.To //inside there is another reservation
                            );
        }
    }
}
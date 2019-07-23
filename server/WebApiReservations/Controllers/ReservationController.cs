using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiReservations.Models;

namespace WebApiReservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationContext _db;
        
        public ReservationController(ReservationContext db)
        {
            this._db = db;
        }

        // [HttpGet]
        // public ActionResult<int> Get()
        // {
        //     using(var context = new ReservationContext()){
        //         //context.
        //     }
        //     //this._db
        //     return 10;
        // }

        [HttpPost]
        public async Task<ActionResult<Reservation>> CreateReservation([FromBody] Reservation reservation){
            _db.Reservations.Add(reservation);
            await _db.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetReservation),
                new { id = reservation.ReservationId },
                reservation );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _db.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }
    }
}
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
    public class RoomController : ControllerBase
    {
        private readonly ReservationContext _db;
        
        public RoomController(ReservationContext db)
        {
            this._db = db;
        }

        [HttpPost]
        public async Task<ActionResult<Room>> CreateReservation([FromBody] Room room){
            _db.Rooms.Add(room);
            await _db.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetRoom),
                new { id = room.RoomId },
                room );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _db.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }
    }
}
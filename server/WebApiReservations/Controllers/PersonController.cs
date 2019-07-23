using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiReservations.Models;

namespace WebApiReservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly ReservationContext _db;
        
        public PersonController(ReservationContext db)
        {
            this._db = db;
        }

        [HttpPost]
        public async Task<ActionResult<Person>> CreatePerson([FromBody] Person person){
            _db.Persons.Add(person);
            await _db.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetPerson),
                new { id = person.PersonId },
                person );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _db.Persons.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }
    }
}
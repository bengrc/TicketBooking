using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketOrder.Models;

namespace TicketOrder.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly TicketContext ticketContext;

        public TicketsController(TicketContext context)
        {
            ticketContext = context;
        }

        // GET: Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetOrders()
        {
            return await ticketContext.Tickets.ToListAsync();
        }

        // GET: Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(long id)
        {
            var ticket = await ticketContext.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: Tickets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(long id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            ticketContext.Entry(ticket).State = EntityState.Modified;

            try
            {
                await ticketContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Tickets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            ticketContext.Tickets.Add(ticket);
            await ticketContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }

        // DELETE: Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(long id)
        {
            var ticket = await ticketContext.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticketContext.Tickets.Remove(ticket);
            await ticketContext.SaveChangesAsync();

            return ticket;
        }


        private bool TicketExists(long id)
        {
            return ticketContext.Tickets.Any(e => e.Id == id);
        }
    }
}

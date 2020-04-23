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
        private readonly TicketOrderContext ticketOrderContext;

        public TicketsController(TicketOrderContext context)
        {
            ticketOrderContext = context;
        }

        // GET: Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await ticketOrderContext.Tickets.ToListAsync();
        }

        // GET: Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(long id)
        {
            var ticket = await ticketOrderContext.Tickets.FindAsync(id);

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

            ticketOrderContext.Entry(ticket).State = EntityState.Modified;

            try
            {
                await ticketOrderContext.SaveChangesAsync();
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
            ticketOrderContext.Tickets.Add(ticket);
            await ticketOrderContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }

        // DELETE: Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(long id)
        {
            var ticket = await ticketOrderContext.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticketOrderContext.Tickets.Remove(ticket);
            await ticketOrderContext.SaveChangesAsync();

            return ticket;
        }

        // POST: Tickets/book/5,1
        [Route("book")]
        [HttpPost("{id}")]
        public async Task<ActionResult<Ticket>> PostOrder(long id, long userId)
        {
            Ticket ticket = null;
            if (TicketExists(id)) {
                ticket = await ticketOrderContext.Tickets.FindAsync(id);
                ticket.Available = false;
            }

            Order order = new Order();
            if (ticketOrderContext.Orders != null && ticketOrderContext.Orders.Any(e => e.UserId == userId))
            {
                order = ticketOrderContext.Orders.ToList().Find(e => e.UserId == userId);
            }
            else
            {
                order.UserId = userId;
                order.TicketsBooked = new List<Ticket>();
                ticketOrderContext.Orders.Add(order);
            }
            order.TicketsBooked.Add(ticket);
            await ticketOrderContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTickets), order);
        }

        private bool TicketExists(long id)
        {
            return ticketOrderContext.Tickets.Any(e => e.Id == id);
        }
    }
}

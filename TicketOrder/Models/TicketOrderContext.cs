using Microsoft.EntityFrameworkCore;

namespace TicketOrder.Models
{
    public class TicketOrderContext : DbContext
    {
        public TicketOrderContext(DbContextOptions<TicketOrderContext> options) : base(options) {
            LoadDefaultTickets();
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Order> Orders { get; set; }

        private void LoadDefaultTickets()
        {
            Tickets.Add(new Ticket { Id = 100L, Name = "Eminem", Available = true, Price = 32});
            Tickets.Add(new Ticket { Id = 200L, Name = "Rihanna", Available = true, Price = 54});
        }
    }
}

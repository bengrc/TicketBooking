using System;

namespace TicketOrder.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public Ticket[] TicketsBooked { get; set; }
        public bool Payment { get; set; }
    }
}
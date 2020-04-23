using System;
using System.Collections.Generic;

namespace TicketOrder.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public List<Ticket> TicketsBooked { get; set; }
        public bool Payment { get; set; }
    }
}
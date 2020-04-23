using System;

namespace TicketOrder.Models
{
    public class Ticket
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Boolean Available { get; set; }
        public float Price { get; set; }
    }
}
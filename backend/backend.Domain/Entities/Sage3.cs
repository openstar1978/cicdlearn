using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Sage3
    {
        public string Custref { get; set; }
        public string Amountpaid { get; set; }
        public string Datepaid { get; set; }
        public string Details { get; set; }
        public string Net { get; set; }
        public string Tax { get; set; }
        public string Invoicenumber { get; set; }
        public string Invoicefoundinsystem { get; set; }
        public long? Transactionnumber { get; set; }
        public string Description { get; set; }
    }
}

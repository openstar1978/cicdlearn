using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class PaymentFrequency
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}

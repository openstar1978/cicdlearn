using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class LeaseHistory
    {
        public int Id { get; set; }
        public int LeaseId { get; set; }
        public int? PaymentPointId { get; set; }
        public string Description { get; set; }
        public int? DocumentId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Note { get; set; }

        public virtual Document Document { get; set; }
        public virtual Lease Lease { get; set; }
        public virtual LeasePaymentPoint PaymentPoint { get; set; }
    }
}

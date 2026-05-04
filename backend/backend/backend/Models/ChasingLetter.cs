using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class ChasingLetter
    {
        public int Id { get; set; }
        public int LeasePaymentPointId { get; set; }
        public DateTime GenerationDate { get; set; }
        public int TemplateId { get; set; }
        public int DocumentId { get; set; }
        public int? LatePaymentInvoiceNumber { get; set; }
        public int? LatePaymentInvoiceDocumentId { get; set; }

        public virtual LeasePaymentPoint LeasePaymentPoint { get; set; }
        public virtual StandardLetter Template { get; set; }
    }
}

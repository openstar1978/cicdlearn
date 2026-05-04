using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class LeasePaymentPoint
    {
        public LeasePaymentPoint()
        {
            ChasingLetters = new HashSet<ChasingLetter>();
            LeaseHistories = new HashSet<LeaseHistory>();
        }

        public int Id { get; set; }
        public int LeaseId { get; set; }
        public byte Type { get; set; }
        public string AccountRef { get; set; }
        public DateTime PaymentDate { get; set; }
        public string InvoiceDescription { get; set; }
        public decimal? RentalAmount { get; set; }
        public bool FacilityFee { get; set; }
        public decimal? FacilityFeeAmount { get; set; }
        public bool AnnualServiceFee { get; set; }
        public decimal? AnnualServiceFeeAmount { get; set; }
        public bool Pepfee { get; set; }
        public decimal? PepfeeAmount { get; set; }
        public decimal? LatePaymentAdministrationChargesAmount { get; set; }
        public decimal? LatePaymentInterestChargesAmount { get; set; }
        public decimal? SettlementAmount { get; set; }
        public int? InvoiceNumber { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? InvoiceDocumentId { get; set; }
        public decimal? InvoiceTotal { get; set; }
        public bool InvoicePrinted { get; set; }
        public bool InvoiceEmailed { get; set; }
        public bool PaymentReceived { get; set; }
        public int? LatePaymentInvoiceNumber { get; set; }
        public int? LatePaymentInvoiceDocumentId { get; set; }
        public bool Reminded { get; set; }
        public byte ChasingStatus { get; set; }
        public bool LatePaymentExcused { get; set; }
        public bool Disabled { get; set; }
        public bool Deleted { get; set; }
        public bool Terminated { get; set; }
        public string AmountPaid { get; set; }
        public DateTime? DatePaid { get; set; }
        public bool? ManualPaidCorrection { get; set; }
        public DateTime? RemAdvReceivedDate { get; set; }

        public virtual Lease Lease { get; set; }
        public virtual ICollection<ChasingLetter> ChasingLetters { get; set; }
        public virtual ICollection<LeaseHistory> LeaseHistories { get; set; }
    }
}

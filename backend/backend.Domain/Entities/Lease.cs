using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Lease
    {
        public Lease()
        {
            Documents = new HashSet<Document>();
            LeaseCheckListItems = new HashSet<LeaseCheckListItem>();
            LeaseHistories = new HashSet<LeaseHistory>();
            LeaseItems = new HashSet<LeaseItem>();
            LeasePaymentPoints = new HashSet<LeasePaymentPoint>();
        }

        public int Id { get; set; }
        public string AccountRef { get; set; }
        public int CustomerId { get; set; }
        public int SectorId { get; set; }
        public int LegalStatusId { get; set; }
        public int BusinessSourceId { get; set; }
        public int? BusinessSourceItemId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? PaymentStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Period { get; set; }
        public int LeasePeriod { get; set; }
        public int PaymentFrequency { get; set; }
        public double YeildPercentage { get; set; }
        public double LeaseRate { get; set; }
        public decimal SupplierInvoiceValue { get; set; }
        public string Description { get; set; }
        public string InvoiceDescription { get; set; }
        public decimal? PaymentAmount { get; set; }
        public byte PaymentMethod { get; set; }
        public decimal? FacilityFeeAmount { get; set; }
        public int? InsuranceDocumentId { get; set; }
        public bool Pepfee { get; set; }
        public decimal? PepfeeAmount { get; set; }
        public decimal? AnnualServiceFeeAmount { get; set; }
        public double SecondaryTermPaymentAmount { get; set; }
        public int SecondaryTermPaymentFrequency { get; set; }
        public bool SecondaryTermSplitEnabled { get; set; }
        public double SecondaryTermSplit { get; set; }
        public int SecondaryTermPeriod { get; set; }
        public bool TerminationNotified { get; set; }
        public DateTime? TerminationNotifiedDate { get; set; }
        public byte? Status { get; set; }
        public int ContactWelcomeLetter { get; set; }
        public int ContactChasingLetter1 { get; set; }
        public int ContactChasingLetter2 { get; set; }
        public int ContactChasingLetter3 { get; set; }
        public int ContactChasingLetter4 { get; set; }
        public int ContactLatePaymentChasingLetter1 { get; set; }
        public int ContactLatePaymentChasingLetter2 { get; set; }
        public int ContactLatePaymentChasingLetter3 { get; set; }
        public int ContactEpcchasingLetter1 { get; set; }
        public int ContactEpcchasingLetter2 { get; set; }
        public int ContactEpcchasingLetter3 { get; set; }
        public int Leasetype { get; set; }
        public int? Putletterid { get; set; }
        public int? Rrrs { get; set; }
        public DateTime? Rrrstartdate { get; set; }
        public int? Rrrfrequency { get; set; }
        public int? Terminationnoticeid { get; set; }
        public int? RrrsagreementDocId { get; set; }

        public virtual BusinessSource BusinessSource { get; set; }
        public virtual BusinessSource BusinessSourceItem { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Sector LegalStatus { get; set; }
        public virtual Sector Sector { get; set; }
        public virtual ICollection<Document> Documents { get; set; }
        public virtual ICollection<LeaseCheckListItem> LeaseCheckListItems { get; set; }
        public virtual ICollection<LeaseHistory> LeaseHistories { get; set; }
        public virtual ICollection<LeaseItem> LeaseItems { get; set; }
        public virtual ICollection<LeasePaymentPoint> LeasePaymentPoints { get; set; }
    }
}

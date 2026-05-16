using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            CustomerHistories = new HashSet<CustomerHistory>();
            Leases = new HashSet<Lease>();
        }

        public int Id { get; set; }
        public string AccountRef { get; set; }
        public int? SectorId { get; set; }
        public int? LegalStatusId { get; set; }
        public int? PrimaryContactId { get; set; }
        public int? SecondaryContactId { get; set; }
        public bool? PaperInvoices { get; set; }
        public bool? EmailInvoices { get; set; }
        public string Notes { get; set; }
        public string SageAddress1 { get; set; }
        public string SageAddress2 { get; set; }
        public string SageAddress3 { get; set; }
        public string SageAddress4 { get; set; }
        public string SageAddress5 { get; set; }
        public string SageDelAddress1 { get; set; }
        public string SageDelAddress2 { get; set; }
        public string SageDelAddress3 { get; set; }
        public string SageDelAddress4 { get; set; }
        public string SageDelAddress5 { get; set; }
        public string SageEMail { get; set; }
        public string SageName { get; set; }
        public string SageWww { get; set; }
        public decimal? SageBalance { get; set; }
        public DateTime? SageLastpaid { get; set; }
        public string InvName { get; set; }
        public string InvAddress1 { get; set; }
        public string InvAddress2 { get; set; }
        public string InvAddress3 { get; set; }
        public string InvAddress4 { get; set; }
        public string InvAddress5 { get; set; }
        public bool? Paperless { get; set; }

        public virtual Sector LegalStatus { get; set; }
        public virtual Sector Sector { get; set; }
        public virtual ICollection<CustomerHistory> CustomerHistories { get; set; }
        public virtual ICollection<Lease> Leases { get; set; }
    }
}

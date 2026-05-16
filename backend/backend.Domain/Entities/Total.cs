using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Total
    {
        public int Id { get; set; }
        public int? Ppid { get; set; }
        public string AccountRef { get; set; }
        public int? Leaseid { get; set; }
        public byte? Invoicetype { get; set; }
        public int? Invoicenumber { get; set; }
        public decimal? Invoicetotal { get; set; }
        public DateTime? Paymentdate { get; set; }
        public decimal? Amountpaid { get; set; }
        public decimal? Latepaymentinvoicenumber { get; set; }
        public decimal? Settlementamount { get; set; }
        public string Username { get; set; }
    }
}

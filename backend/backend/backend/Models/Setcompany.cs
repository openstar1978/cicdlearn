using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class Setcompany
    {
        public int Id { get; set; }
        public string Companycode { get; set; }
        public string CompanyName { get; set; }
        public string ContactTelephone1 { get; set; }
        public string ContactTelephone2 { get; set; }
        public string Email { get; set; }
        public string BankAccountDetails1 { get; set; }
        public string BankAccountDetails2 { get; set; }
        public bool Active { get; set; }
        public string VatNumber { get; set; }
        public string RegNumber { get; set; }
        public string Website { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Address5 { get; set; }
    }
}

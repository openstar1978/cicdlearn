using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class BulkChasingEmailbuffer
    {
        public int? Ppid { get; set; }
        public string ChasingdocFile { get; set; }
        public string Invoicefile { get; set; }
        public string Username { get; set; }
        public bool? Sendemail { get; set; }
        public string Emailheader { get; set; }
        public string Bodytext { get; set; }
        public int? Templateid { get; set; }
    }
}

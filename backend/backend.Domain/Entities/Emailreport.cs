using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Emailreport
    {
        public int Id { get; set; }
        public string Contactname { get; set; }
        public string Custref { get; set; }
        public string Emailaddress { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Username { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Attachment1 { get; set; }
        public string Attachment2 { get; set; }
        public string Attachment3 { get; set; }
    }
}

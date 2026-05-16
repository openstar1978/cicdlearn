using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class ContactNote
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public string NotesType { get; set; }
        public string Custref { get; set; }
        public int? Contactid { get; set; }
        public int? Leaseid { get; set; }
        public string Username { get; set; }
        public DateTime? Timestamp { get; set; }
        public DateTime? Nextcall { get; set; }
        public int? Ppid { get; set; }
    }
}

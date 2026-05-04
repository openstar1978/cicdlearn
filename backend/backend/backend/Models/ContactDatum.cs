using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class ContactDatum
    {
        public string AccountRef { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string OtherNames { get; set; }
        public string Position { get; set; }
        public string EmailAddress { get; set; }
        public int? NotesId { get; set; }
        public string Telephone { get; set; }
        public int Id { get; set; }
        public DateTime? Lastemail { get; set; }
        public bool? Dontautoasign { get; set; }
        public string Notes { get; set; }
    }
}

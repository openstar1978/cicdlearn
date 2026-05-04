using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class PrintDoc
    {
        public string Username { get; set; }
        public string Docname { get; set; }
        public int? TemplateId { get; set; }
    }
}

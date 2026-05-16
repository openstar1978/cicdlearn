using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Reportfilter
    {
        public string Reportname { get; set; }
        public string Filtername { get; set; }
        public string Username { get; set; }
        public string Filterquery { get; set; }
    }
}
